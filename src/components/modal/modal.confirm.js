import { css } from 'linaria'
import { overlayBase } from 'components/overlay/overlay'
import { Button } from '@pocket/web-ui'
import classNames from 'classnames'

const confirmDeleteWrapper = css`
  padding: 20px;
  h2 {
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: var(--color-textPrimary);
  }
  p {
    margin: 10px 0 30px;
    color: var(--color-textSecondary);
  }
`

const confirmActions = css`
  display: flex;
  justify-content: flex-end;
`

const buttonSpacing = css`
  margin-left: 15px;
`

export const ConfirmDelete = ({
  children,
  confirmModal,
  cancelModal,
  operateOn,
  translate
}) => (
  <div className={classNames(overlayBase, confirmDeleteWrapper)}>
    {children}
    <div className={confirmActions}>
      <Button
        variant="secondary"
        onClick={cancelModal}
        // data-tooltip={translate('modalConfirm.cancel')}
        // aria-label={translate('modalConfirm.cancel')}
      >
        {/*<Translate id="modalConfirm.cancel">*/}
        Cancel
        {/*</Translate>*/}
      </Button>
      <Button
        onClick={confirmModal}
        className={buttonSpacing}
        // data-tooltip={translate('modalConfirm.delete', { type: operateOn })}
        // aria-label={translate('modalConfirm.delete', { type: operateOn })}
      >
        {/*<Translate id="modalConfirm.delete" data={{ type: operateOn }}>*/}
        Delete {operateOn}
        {/*</Translate>*/}
      </Button>
    </div>
  </div>
)
