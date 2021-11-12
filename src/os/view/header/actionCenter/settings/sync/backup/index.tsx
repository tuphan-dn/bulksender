import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import Review from './review'
import BackupSuccess from './backupSuccess'

import { RootState } from 'os/store'
import PDB from 'shared/pdb'

const Backup = ({ onClose = () => {} }: { onClose?: () => void }) => {
  const { address: walletAddress } = useSelector(
    (state: RootState) => state.wallet,
  )
  const [link, setLink] = useState('')

  const onBackup = useCallback(async () => {
    const pdb = new PDB(walletAddress)
    const cid = await pdb.backup()
    await setLink(`${window.location.origin}/sync?cid=${cid}`)
  }, [walletAddress])

  if (!link) return <Review onClose={onClose} onOk={onBackup} />
  return <BackupSuccess onClose={onClose} link={link} />
}

export default Backup
