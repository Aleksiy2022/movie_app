import { Flex, Spin } from 'antd'

import { contentStyle } from './spinStyle.js'

export default function SpinLoader() {
  const content = <div style={contentStyle} />
  return (
    <Flex justify={'center'} gap="middle" style={{ marginBottom: 36 }}>
      <Spin tip="Loading" size="large">
        {content}
      </Spin>
    </Flex>
  )
}
