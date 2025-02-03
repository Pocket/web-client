import { EXT_ACTIONS } from '../actions'

import type { ExtAuth } from './auth'
import type { ExtItemResponse } from './item'
import type { ExtNote } from './note'
import type { ExtSave } from './save'

export interface ExtMessage {
  action: EXT_ACTIONS
  item?: ExtItemResponse
  auth?: ExtAuth
  error?: string
  saveData?: ExtSave
  noteData?: ExtNote
  noteId?: string
}
