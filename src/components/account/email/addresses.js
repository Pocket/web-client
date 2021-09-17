import { css } from 'linaria'
import { Button } from '@pocket/web-ui'

const emailStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const EmailAddresses = () => {
  return (
    <section className={emailStyle}>
      <h2>Email Addresses</h2>
      <div className="sectionBody emailBody">
        <label htmlFor="firstname">Primary Email</label>
        <input type="text" name="firstname" />
        <Button variant="secondary" className="actionInline">
          Edit
        </Button>

        <input type="text" name="addEmail" placeholder="Add new email address" />
        <Button variant="primary" className="actionInline">
          Add Email
        </Button>

        <div className="contextCopy">
          Adding additional email addresses to your account will:
          <ul>
            <li>Allow you to log in with that email as well as your primary email </li>
            <li>Allow friends to share pocket links to any of your account emails </li>
            <li>Save links emailed to add@getpocket.com from any account email</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
