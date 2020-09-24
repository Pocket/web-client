import { css } from 'linaria'
import ReactMarkdown from 'react-markdown'
import { breakpointSmallHandset, breakpointSmallTablet } from '@pocket/web-ui'
import { breakpointMediumHandset } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointMediumTablet } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'

const cardPageHeaderStyle = css`
  margin-bottom: var(--spacing100);

  h1 {
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: 600;
    font-size: var(--fontSize250);
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

  h3 {
    margin-bottom: var(--spacing050);
  }

  h4 {
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: 500;
    font-size: var(--fontSize100);
    text-transform: uppercase;
    margin-bottom: var(--spacing050);
    color: var(--color-actionPrimary);

    ${breakpointTinyTablet} {
      font-size: var(--fontSize085);
    }

    ${breakpointLargeHandset} {
      margin-bottom: var(--spacing025);
    }
  }

  .descriptor {
    max-width: 550px;
    p {
      font-family: 'Graphik Web';
      font-size: var(--fontSize100);
      margin-bottom: var(--spacing050);

      ${breakpointMediumTablet} {
        font-size: var(--fontSize085);
      }

      ${breakpointSmallTablet} {
        margin-bottom: var(--spacing100);
      }
    }
  }
`

// i.e., h3
const subHeadingStyle = css`
  font-family: 'Doyle';
  font-style: normal;
  font-weight: 500;
  font-size: var(--fontSize125);
  line-height: 1.2;
  margin-bottom: var(--spacing050);

  ${breakpointMediumTablet} {
    font-weight: 500;
    font-size: var(--fontSize100);
    margin-bottom: var(--spacing025);
  }
`

const cardListHeadingStyle = css`
  margin: var(--spacing250) 0 calc(var(--spacing100) * -1);

  ${breakpointLargeHandset} {
    margin: var(--spacing150) 0 calc(var(--spacing050) * -1);
  }
`

export const CardPageHeader = ({ title, subHeading }) => {
  return title ? (
    <header className={cardPageHeaderStyle}>
      <h1 className="pageTitle">{title}</h1>
      {subHeading ? <h3 className={subHeadingStyle}>{subHeading}</h3> : null}
    </header>
  ) : null
}

export const CollectionPageHeader = ({ title, note }) => {
  return title ? (
    <header className={cardPageHeaderStyle}>
      <h4>Collection</h4>
      <h1 className="collectonTitle">{title}</h1>
      <h3 className={subHeadingStyle}>Essential Reads</h3>
      <div className="descriptor">
        <ReactMarkdown source={note} />
      </div>
    </header>
  ) : null
}

export const SearchPageHeader = ({ title }) => {
  return title ? (
    <header className={cardPageHeaderStyle}>
      <h1 className="pageTitle">{capitalizeFirstLetter(title)} on Pocket</h1>
    </header>
  ) : null
}

export const CardListHeading = ({ children }) => {
  return (
    <h3 className={`${subHeadingStyle} ${cardListHeadingStyle}`}>{children}</h3>
  )
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
