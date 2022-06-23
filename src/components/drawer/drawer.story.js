import { Drawer as Component } from './drawer'

export default {
  title: 'Components/Drawer',
  component: Component
}

export const Drawer = () => {
  return (
    <Component isOpen={true} handleClose={() => {}} appRootSelector="#root">
      Behold the content
    </Component>
  )
}
