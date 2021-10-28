import localForage from 'localforage'
import { account } from '@senswap/sen-js'
import IPFS from './ipfs'

/**
 * Persistent Database
 */
class PDB {
  readonly dbName: string
  private driver: any
  private ipfs: IPFS

  constructor(walletAddress: string) {
    if (!account.isAddress(walletAddress)) throw new Error('Invalid address')
    this.dbName = walletAddress
    this.driver = [localForage.WEBSQL, localForage.LOCALSTORAGE]
    this.ipfs = new IPFS()
  }

  createInstance = (appId: string): any => {
    return localForage.createInstance({
      driver: this.driver,
      name: this.dbName,
      storeName: appId,
    })
  }

  dropInstance = async (appId: string): Promise<void> => {
    const instance = this.createInstance(appId)
    await instance.clear()
    return await localForage.dropInstance({
      name: this.dbName,
      storeName: appId,
    })
  }

  all = async (): Promise<any> => {
    let data: any = {}
    const apps = ((await this.createInstance('senhub').getItem('apps')) || [])
      .flat()
      .concat(['senhub'])
    for (const app of apps) {
      data[app] = {}
      const instance = this.createInstance(app)
      await instance.iterate((value: string, key: string) => {
        data[app][key] = value
      })
    }
    return data
  }

  backup = async () => {
    const data = await this.all()
    return await this.ipfs.set(data)
  }

  restore = async (cid: string) => {
    // Download data
    const data = await this.ipfs.get(cid)
    // Apply to storage
    for (const app in data) {
      const instance = await this.createInstance(app)
      for (const key in data[app]) {
        const value = data[app][key]
        await instance.setItem(key, value)
      }
    }
    return data
  }
}

export default PDB
