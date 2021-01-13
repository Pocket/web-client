// @refresh reset
import { useSelector } from 'react-redux'
import { css } from 'linaria'
import classNames from 'classnames'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { WhatsNewHeader } from 'components/headers/whats-new-header'
import Jan192021 from 'components/release-notes/jan-19-2021'

const whatsNewStyles = css`
  font-family: var(--fontSansSerif);

  section {
    border-bottom: 1px solid var(--color-dividerTertiary);
    padding-bottom: var(--spacing050);
    margin-bottom: 2rem;
    max-width: 550px;

    &:last-of-type {
      border-bottom: none;
    }
  }

  h5 {
    font-size: var(--fontSize125);
    font-weight: 500;
    margin-bottom: 2rem;
    color: var(--color-textPrimary);
  }

  h6 {
    font-weight: 600;
    font-size: var(--fontSize100);
    margin-bottom: var(--spacing075);
    color: var(--color-textPrimary);
  }

  p {
    font-size: var(--fontSize100);
  }

  ul {
    font-size: var(--fontSize100);
    color: var(--color-textSecondary);
    margin-bottom: var(--spacing150);

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

        <Jan192021 />
      </main>
    </Layout>
  )
}
