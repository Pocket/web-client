import { css, cx } from '@emotion/css'
import ReactMarkdown from 'react-markdown'
import { breakpointSmallHandset } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'
import { breakpointSmallTablet } from 'common/constants'
import { breakpointMediumTablet } from 'common/constants'
import { breakpointLargeTablet } from 'common/constants'

const cardPageHeaderStyle = css`
  margin-bottom: var(--spacing100);

  h1 {
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: 600;
    font-size: var(--fontSize250);
    line-height: 1.2;
    letter-spacing: -0.005em;
    margin-bottom: 1.5rem;

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

  h2 {
    margin-bottom: 1.725rem;
  }

  .collectionSubTitle {
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

// i.e., h2
const subHeadingStyle = css`
  font-family: 'Doyle';
  font-style: normal;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1.2;
  margin-bottom: 0.5rem;

  ${breakpointMediumTablet} {
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
`

const cardListHeadingStyle = css`
  margin: 0 0 2rem 0;

  ${breakpointLargeHandset} {
    margin: 0 0 1.725rem;
  }
`

export const CardPageHeader = ({ title, subHeading }) => {
  return title ? (
    <header className={cardPageHeaderStyle}>
      <h1 className="pageTitle" data-testid="page-title">
        {title}
      </h1>
      {subHeading ? <h2 className={cx('h3', subHeadingStyle)}>{subHeading}</h2> : null}
    </header>
  ) : null
}

export const CollectionPageHeader = ({ title, note }) => {
  return title ? (
    <header className={cardPageHeaderStyle}>
      <h1 className="collectonTitle">{title}</h1>
      <h2 className={cx('h3', subHeadingStyle)}>Essential Reads</h2>
      <div className="descriptor">
        <ReactMarkdown>{note}</ReactMarkdown>
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
