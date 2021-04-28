import React from 'react'
import { SaveToPocket } from 'components/save-to-pocket/save-to-pocket'
import Link from 'next/link'
import { SaveFilledIcon } from '@pocket/web-ui'
import { css } from 'linaria'

export const savedItemAction = css`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--fontSize150);
  min-width: 3.913em;
  color: var(--color-textSecondary);
  cursor: pointer;
  padding-top: 8px;
  text-decoration: none;

  span {
    margin-top: 0;
  }

  svg {
    color: var(--color-actionBrand);
  }

  .savedCopy {
    font-size: 1rem;
    padding-left: 8px;
  }
`

export function ActionsRecit({
  id,
  isAuthenticated,
  onSave = () => {},
  saveStatus,
  openUrl,
  onOpen,
  openExternal
}) {
  return (
    <div className="actions">
      {(saveStatus === 'saved') ? (
        <Link href={openUrl}>
          <a
            onClick={onOpen}
            target={openExternal ? "_blank" : undefined}
            className={savedItemAction}>
            <SaveFilledIcon />
            <span className="savedCopy">Read now</span>
          </a>
        </Link>
      ) : (
        <SaveToPocket
          saveAction={onSave}
          isAuthenticated={isAuthenticated}
          saveStatus={saveStatus}
          id={id}
        />
      )}
    </div>
  )
}
