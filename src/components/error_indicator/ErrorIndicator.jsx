import { Alert } from 'antd'

export default function ErrorIndicator({ error, isOnline }) {
  return (
    <Alert
      message={!isOnline ? `You're offline right now. Check your connection.` : `Could not find movies`}
      description={!isOnline ? null : `${error.message}`}
      type="error"
    />
  )
}
