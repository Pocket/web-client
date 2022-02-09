import { useState } from 'react'
import { css} from 'linaria'
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
  margin-top: 2rem;

  p {
    font-size: var(--fontsize100);
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

const closeButtonOverrides = css`
  color: var(--color-white100);

  &:hover,
  &:active,
  &:focus {
    color: var(--color-white100);
  }
`

export function Snackbar({
  showMessage,
  title
}) {
  const [isVisible, setVisible] = useState(showMessage)

  const remove = () => {
    setVisible(false)
  }

  return (
    <Fade show={isVisible} remove={remove}>
      <SectionWrapper>
        <div className={snackbar}>
          <div className="snackbar_title">
            <p>{title}</p>
            <CloseButton
              handleClose={remove}
              closeButtonOverrides={closeButtonOverrides}
            />
          </div>
        </div>
      </SectionWrapper>
    </Fade>
  )
}
