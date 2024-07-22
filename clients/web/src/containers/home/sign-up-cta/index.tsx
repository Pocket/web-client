import style from './style.module.css'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { CallOutBuildHome } from 'components/call-out/call-out-build-home'

export const HomeSignUpCTA = ({ topBorder = false }: { topBorder: boolean }) => {
  return (
    <SectionWrapper className={style.base}>
      <CallOutBuildHome topBorder={topBorder} />
    </SectionWrapper>
  )
}
