// @refresh reset
import { useSelector } from 'react-redux'
import { css } from 'linaria'
import classNames from 'classnames'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { WhatsNewHeader } from 'components/headers/whats-new-header'
import Jan142021 from 'components/release-notes/jan-14-2021'

const whatsNewStyles = css`
  font-family: var(--fontSansSerif);

  section {
    border-bottom: 1px solid var(--color-dividerTertiary);
    padding-bottom: var(--spacing050);
    margin-bottom: 2rem;

    &:last-of-type {
      border-bottom: none;
    }
  }

  h6 {
    font-weight: 500;
    margin-bottom: 2rem;
    color: var(--color-textPrimary);
  }

  p {
    font-weight: 600;
    font-size: var(--fontSize100);
    margin-bottom: var(--spacing075);
    color: var(--color-textPrimary);
  }

  ul {
    font-size: var(--fontSize100);
    color: var(--color-textSecondary);
    margin-bottom: var(--spacing150);
    max-width: 550px;

    li {
      margin-bottom: var(--spacing050);

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`

export default function Messages() {
  const isLoggedIn = useSelector((state) => !!state.user.auth)

  return (
    <Layout title="Pocket - What’s New">
      <SideNav isLoggedIn={isLoggedIn} />

      <main className={classNames('main', whatsNewStyles)}>
        <WhatsNewHeader title="What’s New" />

        <Jan142021 />
        <Jan142021 />
        <Jan142021 />
        <Jan142021 />
      </main>
    </Layout>
  )
}
