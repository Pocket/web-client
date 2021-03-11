import { css } from 'linaria'

const homeCollections = css`
  font-family: 'Graphik Web';
  font-style: normal;
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 1.2;
  margin-bottom: var(--spacing050);
`

export const HomeGreeting = () => {
  return <div className={homeCollections}>Good morning</div>
}
