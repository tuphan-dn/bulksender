import { Document } from 'flexsearch'
import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry'

import { net } from 'shared/runtime'
import configs from 'os/configs'
import supplementary, { sen, sol } from './supplementary'

const {
  sol: { chainId },
} = configs
const DELIMITER = /[\W_]+/g
const PRESET = {
  tokenize: 'full',
  context: true,
  minlength: 3,
}
const DOCUMENT = {
  document: {
    id: 'address',
    index: [
      { field: 'symbol', ...PRESET },
      { field: 'name', ...PRESET },
    ],
  },
}

class TokenProvider {
  private tokenMap: Map<string, TokenInfo>
  private engine: typeof Document | undefined
  readonly chainId: typeof chainId
  readonly cluster: typeof net

  constructor() {
    this.tokenMap = new Map<string, TokenInfo>()
    this.engine = undefined
    this.chainId = chainId
    this.cluster = net
    // Init
    this._init()
  }

  private _init = async (): Promise<Map<string, TokenInfo>> => {
    if (this.tokenMap.size) return this.tokenMap
    // Build token list
    let tokenList = await (await new TokenListProvider().resolve())
      .filterByChainId(this.chainId)
      .getList()
    if (this.cluster === 'devnet') tokenList = tokenList.concat(supplementary)
    if (this.cluster === 'testnet')
      tokenList = tokenList.concat([sen(102), sol(102)])
    else tokenList = tokenList.concat([sol(101)])
    // Build token map
    tokenList.forEach((token) => this.tokenMap.set(token.address, token))
    return this.tokenMap
  }

  private _engine = async () => {
    if (this.engine) return this.engine
    const tm = await this._init()
    this.engine = new Document(DOCUMENT)
    tm.forEach(({ address, ...doc }) => this.engine.add(address, doc))
    return this.engine
  }

  all = async (): Promise<TokenInfo[]> => {
    const tm = await this._init()
    return Array.from(tm.values())
  }

  findByAddress = async (addr: string): Promise<TokenInfo | undefined> => {
    const tm = await this._init()
    return tm.get(addr)
  }

  find = async (keyword: string, limit?: 10): Promise<TokenInfo[]> => {
    const tm = await this._init()
    const engine = await this._engine()
    let tokens: TokenInfo[] = []
    keyword.split(DELIMITER).forEach((key) => {
      const raw: Array<{ result: string[] }> = engine.search(key, limit)
      return raw.forEach(({ result }) => {
        return result.forEach((id: string) => {
          if (tokens.findIndex(({ address }) => address === id) < 0) {
            const token = tm.get(id)
            if (token) tokens.push(token)
          }
        })
      })
    })
    return tokens
  }
}

export default TokenProvider
