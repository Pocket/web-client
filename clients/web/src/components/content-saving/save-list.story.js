import { SaveListButton } from './save-list'

export default {
  title: 'Article/SaveList'
}

export const LoggedIn = () => {
  return <SaveListButton isAuthenticated={true} />
}

export const LoggedOut = () => {
  return <SaveListButton />
}
