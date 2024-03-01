import { css } from '@emotion/css'
import { ArrowRightIcon } from 'components/icons/ArrowRightIcon'

const linkWrapper = css`
  font-family: 'Graphik Web';
  font-weight: 500;
  line-height: 132%;
  color: var(--color-actionPrimary);
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: var(--color-actionPrimaryHover);
    text-decoration: underline;
  }

  .arrow-icon {
    margin-left: 0.15rem;
    vertical-align: text-bottom;
    height: 1.1rem;
  }
`

export const ArrowLink = ({ href, target, margin, onClick, children, id, dataCy }) => (
  <a
    className={linkWrapper}
    style={{ margin }}
    href={href}
    target={target}
    id={id}
    data-testid={dataCy}
    onClick={onClick}>
    {children}
    <ArrowRightIcon className="arrow-icon" />
  </a>
)
