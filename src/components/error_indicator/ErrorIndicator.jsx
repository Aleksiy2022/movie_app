import { Alert } from 'antd'

export default function ErrorIndicator({ error }) {
  return <Alert message={`Could not find movies`} description={`${error.message}`} type="error" />
}
