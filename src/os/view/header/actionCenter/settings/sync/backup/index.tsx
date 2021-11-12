import { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'os/store'
import PDB from 'shared/pdb'

import Review from './review'
import BackupSuccess from './backupSuccess'

type Props = {
  onClose: () => void
}

export default function Backup({ onClose }: Props) {
  const { address: walletAddress } = useSelector(
    (state: RootState) => state.wallet,
  )
  const pdb = new PDB(walletAddress)
  const [link, setLink] = useState('')

  const onBackup = async () => {
    const cid = await pdb.backup()
    await setLink(`${window.location.origin}/sync?cid=${cid}`)

    return window.notify({
      type: 'success',
      description:
        'A backup link has been generated. You need to copy and save it to a safe place.',
    })
  }

  if (!link) return <Review onClose={onClose} onOk={onBackup} />
  return <BackupSuccess onClose={onClose} link={link} />
}
