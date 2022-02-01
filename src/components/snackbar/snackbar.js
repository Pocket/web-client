import { css} from 'linaria'
import { CloseButton } from 'components/close-button/close-button'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'

const snackbar = css`
  font-family: var(--fontSansSerif);
  background-color: var(--color-actionPrimary);
  color: var(--color-white100);
  padding: 1rem;
  border-radius: var(--borderRadius);
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
  margin-top: 2rem;

  p {
    margin-bottom: 0;
  }

  .snackbar_title {
    display: flex;
    align-items: flex-start;
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
  title,
  handleClose,
}) {

  return (
    <SectionWrapper>
      <div className={snackbar}>
        <div className="snackbar_title">
          <p>{title}</p>
          <CloseButton
            handleClose={handleClose}
            closeButtonOverrides={closeButtonOverrides}
          />
        </div>
      </div>
    </SectionWrapper>
  )
}
