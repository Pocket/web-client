import { BatchProcessing } from './processing'

export default {
  title: 'Components/Batch Processing',
  components: BatchProcessing
}

export const Basic = (args) => <BatchProcessing {...args} />
Basic.args = { batchCount: 6, batchTotal: 0 }
