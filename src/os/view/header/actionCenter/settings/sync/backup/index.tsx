import { Button, Card, Col, Image, Input, Modal, Row, Typography } from 'antd'
import { RootState } from 'os/store'
import { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import IonIcon from 'shared/ionicon'
import PDB from 'shared/pdb'
import PolicyConfirm from './policyConfirm'
import SuccessImg from 'os/static/images/success.png'

type Props = {
  isOpen: boolean
  onClose: () => void
}

type Step = 'policy' | 'confirmed' | 'success'

export default function Backup({ isOpen, onClose }: Props) {
  const { address: walletAddress } = useSelector(
    (state: RootState) => state.wallet,
  )
  const pdb = new PDB(walletAddress)
  const [step, setStep] = useState<Step>('policy')
  const [link, setLink] = useState('')

  const onBackup = async () => {
    const cid = await pdb.backup()
    await setLink(`${window.location.origin}/sync?cid=${cid}`)
    setStep('success')
    return window.notify({
      type: 'success',
      description:
        'A backup link has been generated. You need to copy and save it to a safe place.',
    })
  }

  useEffect(() => {
    if (isOpen) setStep('policy')
  }, [isOpen])

  return (
    <Modal
      centered
      visible={isOpen}
      onCancel={onClose}
      closeIcon={<IonIcon name="close" />}
      footer={
        ['policy', 'confirmed'].includes(step) && (
          <Button
            disabled={step !== 'confirmed'}
            type="primary"
            block
            icon={<IonIcon name="cloud-upload-outline" />}
            onClick={onBackup}
          >
            Gen a backup link
          </Button>
        )
      }
    >
      {['policy', 'confirmed'].includes(step) ? (
        <PolicyConfirm
          isConfirm={step === 'confirmed'}
          onConfirm={() => setStep(step === 'policy' ? 'confirmed' : 'policy')}
        />
      ) : (
        <Row
          gutter={[20, 20]}
          align="middle"
          justify="center"
          style={{ textAlign: 'center' }}
        >
          <Col span={24}>
            <Image src={SuccessImg} preview={false} />
          </Col>
          <Col span={24}>
            <Typography.Title level={3}>Backup successfully</Typography.Title>
          </Col>
          <Col span={24}>
            <Input value={link} />
          </Col>
          <Col span={24}>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Col>
        </Row>
      )}
    </Modal>
  )
}
