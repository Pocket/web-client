import { useState } from 'react'
import { css } from '@emotion/css'
import Modal, { ModalBody, ModalFooter } from './modal'
import { TextArea } from 'components/form-fields/text-area'
import { CreateEditShareableList } from 'components/shareable-lists/create-edit-modal'
import { AddToListModal } from 'components/shareable-lists/add-to-list-modal'
import { AddNoteModal } from 'components/shareable-lists/add-note-modal'
import { COLORS } from 'mocks/_data/colors'

export default {
  title: 'Overlays/Modal',
  component: Modal
}

const APP_ROOT_SELECTOR = '#root'

const testChildStyles = css`
  width: 248px;
  height: 350px;
  background-color: teal;
  margin: 1rem 0;
  color: var(--color-canvas);
  padding: 10px;
`

const OverflowElement = () => (
  <div className={testChildStyles}>Placeholder content block (can overflow)</div>
)

export const CreateList = () => (
  <CreateEditShareableList
    appRootSelector={APP_ROOT_SELECTOR}
    showModal
    modalTitle="Create List"
    modalSubmit="Create List"
  />
)

export const ListSettings = () => (
  <CreateEditShareableList
    appRootSelector={APP_ROOT_SELECTOR}
    showModal
    modalTitle="List Settings"
    modalSubmit="Save Changes"
    listName="The Cosmos"
    listDescription="If someone loves a flower, of which just one single blossom grows, in all the millions of stars, it is enough to make him happy just to look at the stars."
  />
)

export const AddToList = () => (
  <AddToListModal
    appRootSelector={APP_ROOT_SELECTOR}
    showModal
    modalTitle="Add to List"
    selectOptions={COLORS}
  />
)

export const AddNote = () => <AddNoteModal appRootSelector={APP_ROOT_SELECTOR} showModal />

export const Basic = () => (
  <Modal
    title="Basic Modal"
    appRootSelector={APP_ROOT_SELECTOR}
    screenReaderLabel="Modal in Storybook"
    handleClose={() => {}}
    isOpen={true}>
    <ModalBody>
      The quick brown fox jumped over the lazy dog
      <br />
      <br />
      <div>
        <img src="http://placeimg.com/320/240/animals/sepia" alt="" />
      </div>
    </ModalBody>
  </Modal>
)

export const StaticModal = () => (
  <Modal
    title="Static Modal Time"
    appRootSelector={APP_ROOT_SELECTOR}
    screenReaderLabel="Modal in Storybook"
    handleClose={() => {}}
    isOpen={true}
    forceMobile={false}
    showCloseButton={true}>
    <ModalBody>Wocka wocka</ModalBody>
    <ModalFooter>
      <button className="primary">Primary Action</button>
    </ModalFooter>
  </Modal>
)

const standardReasons = [
  {
    id: 'broken-meta',
    label: 'The title, link, or image is broken'
  },
  {
    id: 'wrong-category',
    label: 'It’s in the wrong category'
  },
  {
    id: 'sexually-explicit',
    label: 'It’s sexually explicit'
  },
  {
    id: 'offensive',
    label: 'It’s rude, vulgar, or offensive'
  },
  {
    id: 'misinformation',
    label: 'It contains misinformation'
  }
]

const otherFieldStyles = css`
  margin: var(--spacing100) 0 var(--spacing075);
  &,
  & textarea {
    max-width: inherit;
  }
`

export const WithForm = () => {
  const [currentReason, updateReason] = useState(null)
  const [otherText, updateOtherText] = useState('')
  const handleRadioChange = (event) => {
    updateReason(event.target.value)
  }
  const handleTextAreaChange = (event) => {
    updateOtherText(event.target.value)
  }
  return (
    <Modal
      title="With Form"
      appRootSelector={APP_ROOT_SELECTOR}
      screenReaderLabel="Modal in Storybook"
      handleClose={() => {}}
      isOpen={true}
      showCloseButton={true}>
      <ModalBody>
        <form>
          {standardReasons.map(({ id, label }) => (
            <div key={id}>
              <label htmlFor={id}>
                <input type="radio" name="reason" value={id} id={id} onChange={handleRadioChange} />
                {label}
              </label>
            </div>
          ))}
          <div>
            <label htmlFor="other">
              <input
                type="radio"
                name="reason"
                value="other"
                id="other"
                onChange={handleRadioChange}
              />
              Other
            </label>
          </div>
          {currentReason !== 'other' ? null : (
            <TextArea
              name="other-reason"
              labelText="Tell us more"
              value={otherText}
              className={otherFieldStyles}
              onChange={handleTextAreaChange}
              initialRows={4}
              maxRows={4}
              characterLimit={400}
              showCharacterLimit={true}
            />
          )}
        </form>
      </ModalBody>
      <ModalFooter>
        <button className="primary">Primary Action</button>
      </ModalFooter>
    </Modal>
  )
}

export const LengthyContentModal = () => (
  <Modal
    title="Overload Content Modal Time"
    appRootSelector={APP_ROOT_SELECTOR}
    screenReaderLabel="Modal in Storybook"
    handleClose={() => {}}
    isOpen={true}>
    <ModalBody>
      <LongContent />
    </ModalBody>
    <ModalFooter>
      <button className="primary">Primary Action</button>
    </ModalFooter>
  </Modal>
)

export const NoBackgroundScroll = () => {
  const [isOpen, setOpen] = useState(true)
  return (
    <>
      <LongContent />
      <LongContent />
      <LongContent />
      <LongContent />
      <Modal
        title="Overload Content Modal Time"
        appRootSelector={APP_ROOT_SELECTOR}
        screenReaderLabel="Modal in Storybook"
        handleClose={() => setOpen(false)}
        isOpen={isOpen}>
        <ModalBody>
          The background should not scroll. If this modal is closed, background will be scrollable
          again.
        </ModalBody>
        <ModalFooter>
          <button className="primary">Primary Action</button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export const Interactive = () => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const handleOpenClick = () => setIsOpen(true)
  const handleCloseModal = () => setIsOpen(false)

  return (
    <>
      <button onClick={handleOpenClick}>Please open the modal</button>
      <Modal
        title="Interactive Modal Time"
        appRootSelector={APP_ROOT_SELECTOR}
        isOpen={modalIsOpen}
        screenReaderLabel="Modal in Storybook"
        handleClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        showCloseButton={true}>
        <ModalBody>
          <button onClick={handleCloseModal}>Please close the modal</button>
          <OverflowElement />
        </ModalBody>
        <ModalFooter isSticky={true}>
          <button className="primary">Primary Action</button>
        </ModalFooter>
      </Modal>
    </>
  )
}

const LongContent = () => (
  <div>
    I love cheese, especially red leicester ricotta. Cheese and wine cream cheese cheddar boursin
    melted cheese cream cheese bocconcini everyone loves. Queso manchego say cheese cheesy feet
    macaroni cheese cut the cheese fromage who moved my cheese. Roquefort red leicester swiss rubber
    cheese hard cheese taleggio port-salut cauliflower cheese. Halloumi macaroni cheese emmental
    cauliflower cheese hard cheese st. agur blue cheese macaroni cheese cut the cheese. Squirty
    cheese cheesecake who moved my cheese paneer cheesy feet bocconcini cheese and wine cut the
    cheese. Who moved my cheese gouda gouda croque monsieur cream cheese ricotta monterey jack
    cottage cheese. Bavarian bergkase monterey jack chalk and cheese gouda feta bavarian bergkase
    paneer everyone loves. Everyone loves.
    <br />
    <br />
    Parmesan airedale paneer. Cauliflower cheese lancashire cheese on toast camembert de normandie
    cheese strings who moved my cheese cheese on toast ricotta. Stilton halloumi the big cheese
    cheesy grin jarlsberg camembert de normandie cheesy feet manchego. Roquefort cow who moved my
    cheese port-salut edam cheese on toast rubber cheese smelly cheese. Cauliflower cheese jarlsberg
    cheesy grin roquefort fromage when the cheese comes out everybody’s happy halloumi lancashire.
    Fromage frais brie ricotta cheesy feet camembert de normandie roquefort dolcelatte brie. Cheese
    strings cheddar when the cheese comes out everybody’s happy fromage frais monterey jack.
    <br />
    <br />
    Brie roquefort gouda. St. agur blue cheese cheeseburger feta the big cheese swiss feta boursin
    cheesy feet. Danish fontina taleggio fromage babybel queso the big cheese the big cheese cheese
    slices. Pecorino when the cheese comes out everybody’s happy edam pepper jack red leicester
    cheesy feet feta mascarpone. Halloumi mozzarella blue castello cheese strings cheesecake cheddar
    paneer cheese triangles. Stinking bishop squirty cheese boursin fromage frais cheese triangles
    halloumi monterey jack cauliflower cheese. Monterey jack cheesy feet babybel pecorino say cheese
    cheese strings cheese on toast cottage cheese. Cut the cheese cheese and biscuits rubber cheese
    st. agur blue cheese say cheese halloumi.
    <br />
    <br />
    Cheese slices halloumi cheesecake. Bocconcini cheesecake manchego emmental cheeseburger
    bocconcini boursin cheese on toast. Pepper jack edam cheesecake the big cheese goat babybel
    cheese triangles goat. Babybel paneer cheddar fromage cheeseburger squirty cheese macaroni
    cheese cheese and wine. Paneer paneer hard cheese bocconcini chalk and cheese macaroni cheese
    melted cheese st. agur blue cheese. Cottage cheese cheese strings gouda brie bavarian bergkase
    brie cheese and wine ricotta. Squirty cheese mascarpone paneer cheese on toast cheese slices
    camembert de normandie cheese and wine squirty cheese. Blue castello cheesy feet. Hard Cheese
    <br />
    <br />
    <div>
      <img src="http://placekitten.com/g/200/300" alt="" />
    </div>
  </div>
)
