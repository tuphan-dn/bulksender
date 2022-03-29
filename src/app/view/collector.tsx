import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Papa from 'papaparse'

import { Row, Col, Upload, Space, Button, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import {
  TransferData,
  setData,
  setDecimalized,
} from 'app/model/main.controller'

const parse = (file: any): Promise<TransferData> => {
  return new Promise((resolve, reject) => {
    return Papa.parse(file, {
      skipEmptyLines: true,
      complete: ({ data }) => resolve(data as TransferData),
    })
  })
}

const Collector = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const upload = async (file: any) => {
    setLoading(true)
    dispatch(setDecimalized(false))
    dispatch(setData(await parse(file)))
    setLoading(false)
    return false
  }
  const remove = async () => {
    setLoading(true)
    dispatch(setData([]))
    setLoading(false)
    return true
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={24} style={{ marginBottom: 16 }}>
        <Upload.Dragger
          accept=".csv,.txt"
          beforeUpload={upload}
          onRemove={remove}
          maxCount={1}
        >
          <Space direction="vertical" size="large" align="center">
            <Typography.Title level={3}>
              Click or Drop file to upload
            </Typography.Title>
            <Typography.Text>
              The accepted file types are <code>.csv</code>, <code>.txt</code>.
            </Typography.Text>
            <Button
              type="primary"
              icon={<IonIcon name="cloud-upload-outline" />}
              loading={loading}
            >
              Upload
            </Button>
          </Space>
        </Upload.Dragger>
      </Col>
    </Row>
  )
}

export default Collector
