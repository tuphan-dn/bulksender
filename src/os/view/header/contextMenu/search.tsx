import { ChangeEvent, useCallback, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import { Row, Col, Input, Button } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import {
  useRootDispatch,
  useRootSelector,
  RootState,
  RootDispatch,
} from 'os/store'
import { setValue } from 'os/store/search.reducer'

const Search = () => {
  const dispatch = useRootDispatch<RootDispatch>()
  const location = useLocation()
  const history = useHistory()
  const {
    search: { value, loading, disabled },
  } = useRootSelector((state: RootState) => state)

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setValue(e.target.value))
    },
    [dispatch],
  )
  const onClear = useCallback(() => {
    dispatch(setValue(''))
    history.push(location.pathname)
  }, [dispatch, history, location.pathname])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    dispatch(setValue(params.get('search') || ''))
  }, [dispatch, location.search])

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Input
          placeholder="Search"
          bordered={false}
          onChange={onChange}
          value={value}
          prefix={
            <Button
              type="text"
              size="small"
              icon={
                <IonIcon
                  name={value ? 'close-circle-outline' : 'search-outline'}
                />
              }
              loading={loading}
              disabled={disabled}
              onClick={value ? onClear : () => {}}
            />
          }
          disabled={disabled}
        />
      </Col>
    </Row>
  )
}

export default Search
