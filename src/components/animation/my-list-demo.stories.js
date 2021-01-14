import MyListDemo from './my-list-demo'

export default {
  title: 'Animations/MyListDemo',
  component: MyListDemo
}

export const normal = () => <MyListDemo />

export const firefox = () => <MyListDemo showFirefoxLogo />
