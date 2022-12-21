import { css } from 'linaria'
import { breakpointSmallHandset } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'
import { breakpointLargeTablet } from 'common/constants'
import { capitalizeFirstLetter } from 'common/utilities/strings/strings'

const whatsNewHeaderStyle = css`
  margin-bottom: var(--spacing100);
  font-family: 'Graphik Web';

  h1 {
    display: inline-block;
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: 500;
    font-size: var(--fontSize150);
    line-height: 1.2;
    letter-spacing: -0.005em;
    margin-bottom: var(--spacing150);

    ${breakpointLargeTablet} {
      font-size: var(--fontSize200);
    }

    ${breakpointTinyTablet} {
      margin-bottom: var(--spacing100);
    }

    ${breakpointLargeHandset} {
      font-size: var(--fontSize150);
    }

    ${breakpointSmallHandset} {
      font-size: var(--fontSize125);
      margin-bottom: var(--spacing100);
    }
  }
`

export const WhatsNewHeader = ({ title }) => {
  return (
    <header className={whatsNewHeaderStyle}>
      <h1 className="pageTitle" data-cy="page-title">
        {capitalizeFirstLetter(title)}
      </h1>
    </header>
  )
}
