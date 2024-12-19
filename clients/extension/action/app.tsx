import { ActionContainer } from '../components/action-container'

export function App() {
  const actionUnSave = () => console.log('save')

  return <ActionContainer actionUnSave={actionUnSave} />
}
