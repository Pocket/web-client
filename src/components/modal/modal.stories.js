import { ConfirmDelete } from './modal.confirm'
import { Modal } from './modal'

export default {
  title: 'Components/Modal'
}

export const normal = () => (
  <Modal>
    <ConfirmDelete>
      <h2>Are you sure?</h2>
      <p>Once you take this action, there is no turning back.</p>
    </ConfirmDelete>
  </Modal>
)
