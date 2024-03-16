import { useState } from 'react'
import { css, cx } from '@emotion/css'
import { CloseButton } from 'components/close-button/close-button'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { Fade } from 'common/utilities/animation/fade'

const snackbar = css`
  font-family: var(--fontSansSerif);
  background-color: var(--color-actionPrimary);
  color: var(--color-white100);
  padding: 1rem;
  border-radius: var(--borderRadius);
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);

  p {
    font-size: var(--fontSize100);
    margin-bottom: 0;
  }

  .snackbar_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  button {
    padding: 0.5rem;
  }
`

const wrapper = css`
  &.saves {
    padding: 0 0;
    margin-bottom: 2rem;
  }

  &.home {
    margin-top: 2rem;
  }
`

const closeButtonOverrides = css`
  color: var(--color-white100);

  &:hover,
  &:active,
  &:focus {
    color: var(--color-white100);
  }
`

export function Snackbar({ showMessage, title, type }) {
  const [isVisible, setVisible] = useState(showMessage)

  const remove = () => {
    setVisible(false)
  }

  return (
    <Fade show={isVisible} remove={remove}>
      <SectionWrapper className={cx(wrapper, type)}>
        <div className={snackbar}>
          <div className="snackbar_title">
            <p>{title}</p>
            <CloseButton handleClose={remove} closeButtonOverrides={closeButtonOverrides} />
          </div>
        </div>
      </SectionWrapper>
    </Fade>
  )
}
