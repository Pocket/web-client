import {
  FacebookColorIcon,
  TwitterColorIcon,
  LinkedinMonoIcon,
  RedditMonoIcon,
} from '@pocket/web-ui'
import { BufferShareButton } from './share-menu.buffer'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton
} from 'react-share'
import { PopupMenuGroup, PopupMenuItem } from '@pocket/web-ui'

export const SocialItems = ({ onSocialShare, quote = '', url, title }) => (
  <PopupMenuGroup>
    <PopupMenuItem>
      <FacebookShareButton
        onShareWindowClose={() => onSocialShare('facebook')}
        quote={quote}
        url={url}>
          <FacebookColorIcon />
          Facebook
      </FacebookShareButton>
    </PopupMenuItem>
    <PopupMenuItem>
      <TwitterShareButton
        onShareWindowClose={() => onSocialShare('twitter')}
        title={title}
        url={url}>
          <TwitterColorIcon />
          Twitter
      </TwitterShareButton>
    </PopupMenuItem>
    <PopupMenuItem>
      <LinkedinShareButton
        onShareWindowClose={() => onSocialShare('linkedin')}
        title={title}
        summary={quote}
        url={url}>
          <LinkedinMonoIcon />
          LinkedIn
      </LinkedinShareButton>
    </PopupMenuItem>
    <PopupMenuItem>
      <RedditShareButton
        onShareWindowClose={() => onSocialShare('reddit')}
        title={title}
        url={url}>
          <RedditMonoIcon />
          Reddit
      </RedditShareButton>
    </PopupMenuItem>
    <PopupMenuItem>
      <BufferShareButton
        onShareWindowClose={() => onSocialShare('buffer')}
        text={quote}
        url={url}>
          Buffer
      </BufferShareButton>
    </PopupMenuItem>
  </PopupMenuGroup>
)
