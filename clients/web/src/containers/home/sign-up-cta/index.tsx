import style from './style.module.css'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { CallOutBuildHome } from 'components/call-out/call-out-build-home'

import type { FC } from 'react'

export const HomeSignUpCTA: FC = () => {
  return (
    <SectionWrapper className={style.base}>
      <CallOutBuildHome topBorder={false} />
    </SectionWrapper>
  )
}
