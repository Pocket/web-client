// @refresh reset
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { css } from 'linaria'
import classNames from 'classnames'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { WhatsNewHeader } from 'components/headers/whats-new-header'
import Jan192021 from 'components/release-notes/jan-19-2021'
import Feb032021 from 'components/release-notes/feb-03-2021'
import Mar232021 from 'components/release-notes/mar-23-2021'
import { RELEASE_NOTES_VERSION } from 'common/constants'
import { setReleaseNotes } from 'connectors/app/app.state'

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
    margin-bottom: var(--spacing150);

    li {
      margin-bottom: var(--spacing050);
      color: var(--color-textPrimary);

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`

export default function Messages() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isLoggedIn = useSelector((state) => !!state.user.auth)

  useEffect(() => {
    dispatch(setReleaseNotes(RELEASE_NOTES_VERSION))
  }, [])

  return (
    <Layout title={`Pocket - ${t('whats-new:whats-new', "What's New")}`}>
      <SideNav isLoggedIn={isLoggedIn} />

      <main className={classNames('main', whatsNewStyles)}>
        <WhatsNewHeader title={t('whats-new:whats-new', "What's New")} />

        <Mar232021 />
        <Feb032021 />
        <Jan192021 />
      </main>
    </Layout>
  )
}
