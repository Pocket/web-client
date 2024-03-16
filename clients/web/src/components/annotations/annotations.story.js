import { Rail } from 'components/rail/rail'
import { cardStyles, Quote, CreatedDate } from './annotations.card'
import { EmptyList } from './annotations.empty-list'
import { QuoteList } from './annotations.list'

export default {
  title: 'Article/Annotations'
}

export const emptyListMessage = () => <EmptyList />

export const quoteCard = () => (
  <div className={cardStyles}>
    <Quote>
      Although James Cromwell would get more screen time in George Miller’s talking pig tale than in
      any of his previous films, he had only 171 words of dialogue.
    </Quote>
    <CreatedDate>2019-11-12 13:02:07</CreatedDate>
  </div>
)

const annotations = [
  {
    annotation_id: '3d9b0e41-7367-400d-87dd-b3a823a43577',
    item_id: '791330381',
    quote:
      'It is remarkable to think that with all these patterns each cell is only listening to its immediate neighbour.',
    patch:
      '@@ -3586,16 +3586,36 @@\n gates: %0A\n+%3Cpkt_tag_annotation%3E\n It is re\n@@ -3716,16 +3716,37 @@\n ighbour.\n+%3C/pkt_tag_annotation%3E\n %0AIf you \n',
    version: '2',
    created_at: '2020-10-07 17:07:06'
  },
  {
    annotation_id: 'bfff4b51-17db-4c27-bd89-3bad00ab0582',
    item_id: '791330381',
    quote:
      'When Conway came up with the Life rules, he was not sure if a pattern existed with a total number of live cells that kept on growing.',
    patch:
      '@@ -2623,16 +2623,36 @@\n eships.%0A\n+%3Cpkt_tag_annotation%3E\n When Con\n@@ -2776,16 +2776,37 @@\n growing.\n+%3C/pkt_tag_annotation%3E\n %0ABill Go\n',
    version: '2',
    created_at: '2020-10-07 15:58:55'
  },
  {
    annotation_id: 'e0a6ec44-374b-4fd8-98d9-3aa9e5e944e2',
    item_id: '791330381',
    quote:
      'We start with a pattern on the grid (generation 0) and we apply the rules simultaneously on all cells. ',
    patch:
      '@@ -1232,16 +1232,36 @@\n  %0A      \n+%3Cpkt_tag_annotation%3E\n We start\n@@ -1355,16 +1355,37 @@\n  cells. \n+%3C/pkt_tag_annotation%3E\n This act\n',
    version: '2',
    created_at: '2019-11-12 13:02:07'
  }
]

export const quoteList = () => (
  <Rail visible>
    <QuoteList annotations={annotations} visible={true} isPremium={true} />
  </Rail>
)

export const quoteFullList = () => (
  <Rail visible>
    <QuoteList
      annotations={annotations}
      visible={true} // WHAT IS THIS FOR>???
      isPremium={false}
    />
  </Rail>
)
