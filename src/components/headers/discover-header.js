import { css, cx } from 'linaria'
import ReactMarkdown from 'react-markdown'
import { breakpointSmallHandset } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointSmallTablet } from '@pocket/web-ui'
import { breakpointMediumTablet } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'

const cardPageHeaderStyle = css`
  h1 {
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: 600;
    font-size: var(--fontSize250);
    line-height: 1.2;
    letter-spacing: -0.005em;
    padding-bottom: var(--spacing150);
    margin: 0;

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

  .collectionSubTitle {
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: 500;
    font-size: var(--fontSize100);
    text-transform: uppercase;
    padding-bottom: 0;
    margin: 0;
    color: var(--color-actionPrimary);

    ${breakpointTinyTablet} {
      font-size: var(--fontSize085);
    }

    ${breakpointLargeHandset} {
      padding-bottom: 0;
      margin: 0;
    }
  }

  .descriptor {
    max-width: 550px;
    p {
      font-family: 'Graphik Web';
      font-size: var(--fontSize100);
      padding-bottom: 0;
      margin: 0;

      ${breakpointMediumTablet} {
        font-size: var(--fontSize085);
      }

      ${breakpointSmallTablet} {
        padding-bottom: 0;
        margin: 0;
      }
    }
  }
`

// i.e., h2
const subHeadingStyle = css`
  font-family: 'Doyle';
  font-style: normal;
  font-weight: 500;
  font-size: var(--fontSize125);
  line-height: 1.2;
  padding-bottom: 0;
  margin: 0;

  ${breakpointMediumTablet} {
    font-weight: 500;
    font-size: var(--fontSize100);
    padding-bottom: 0;
    margin: 0;
  }
`

const cardListHeadingStyle = css`
  padding: var(--spacing250) 0 0;

  ${breakpointLargeHandset} {
    padding: var(--spacing150) 0 0;
  }
`

export const CardPageHeader = ({ title, subHeading }) => {
  return title ? (
    <header className={cardPageHeaderStyle}>
      <h1 className="pageTitle">{title}</h1>
      {subHeading ? <h2 className={cx('h3', subHeadingStyle)}>{subHeading}</h2> : null}
    </header>
  ) : null
}

export const CollectionPageHeader = ({ title, note }) => {
  return title ? (
    <header className={cardPageHeaderStyle}>
      <p className="h4 collectionSubTitle">Collection</p>
      <h1 className="collectonTitle">{title}</h1>
      <h2 className={cx('h3', subHeadingStyle)}>Essential Reads</h2>
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
  return <h2 className={cx('h3', subHeadingStyle, cardListHeadingStyle)}>{children}</h2>
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
