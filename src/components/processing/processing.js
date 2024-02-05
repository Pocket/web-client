import { ProgressPill } from 'components/progress-pill/progress-pill'
import { Trans } from 'next-i18next'
import { css } from '@emotion/css'

import { ProcessingAnimation } from './processing-animation'
import { breakpointTinyTablet } from 'common/constants'

const processingWrapper = css`
  position: relative;
  display: flex;

  aside {
    width: 86px;
    margin: 0 16px 0 0;
  }

  main {
    width: 100%;
  }

  p {
    margin-bottom: 12px;
  }

  ${breakpointTinyTablet} {
    flex-direction: column;

    aside {
      margin: 0 auto 16px;
    }
  }
`

export const BatchProcessing = ({ batchTotal, batchCount }) => {
  return (
    <div className={processingWrapper}>
      <aside>
        <ProcessingAnimation />
      </aside>
      <main>
        <p>
          <Trans i18nKey="confirm:new-processing">Hang tight, we’re making things happen</Trans> 😎
        </p>
        <ProgressPill total={batchTotal} current={batchTotal - batchCount} />
      </main>
    </div>
  )
}
