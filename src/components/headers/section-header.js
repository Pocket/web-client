import { css } from 'linaria'
import classNames from 'classnames'
import { breakpointMediumHandset } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointMediumTablet } from '@pocket/web-ui'

const sectionHeaderStyle = css`
  font-family: 'Doyle';
  font-style: normal;
  font-weight: 500;
  font-size: var(--fontSize125);
  line-height: 1.5;
  span {
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: normal;
    font-size: var(--fontSize100);
    line-height: 1.5;

    &:before {
      content: '·';
      font-size: var(--fontSize100);
      padding: 0 0.25em;
    }
  }
  &.topicWithPadding {
    padding-top: var(--spacing400);
  }

  ${breakpointMediumTablet} {
    font-weight: 500;
    font-size: var(--fontSize100);
    span {
      font-size: var(--fontSize085);
    }
    &.topicWithPadding {
      padding-top: var(--spacing250);
    }
  }

  ${breakpointLargeHandset} {
    &.topicWithPadding {
      padding-top: var(--spacing150);
      margin-bottom: var(--spacing150);
    }
  }

  ${breakpointMediumHandset} {
    margin-bottom: var(--spacing100);
    span {
      display: block;
      &:before {
        content: '';
        padding: 0;
      }
    }
  }
`
export const SectionHeader = ({
  sectionTitle,
  sectionDescription,
  addPadding
}) => {
  const sectionClass = classNames(sectionHeaderStyle, {
    topicWithPadding: addPadding
  })
  return sectionTitle ? (
    <h4 className={sectionClass}>
      {sectionTitle}
      {sectionDescription ? <span>{sectionDescription}</span> : null}
    </h4>
  ) : null
}
