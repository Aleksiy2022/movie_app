import { Flex, Spin } from 'antd'
import './spin.css'

export default function SpinLoader() {
  const content = <div className="spin-content" />
  return (
    <Flex justify={'center'} gap="middle" className="spin-container">
      <Spin tip="Loading" size="large">
        {content}
      </Spin>
    </Flex>
  )
}
