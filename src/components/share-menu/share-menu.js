import React, { Component } from 'react'
import copy from 'clipboard-copy'
import { css } from 'linaria'
import { popoverBase } from 'components/popover/popover'
import { PopupMenuGroup, PopupMenuItem } from '@pocket/web-ui'
import { SocialItems } from './share-menu.social'
import { urlWithPocketRedirect, urlWithPermanentLibrary } from 'common/utilities'
import {
  ProfileIcon,
  LinkIcon,
  DiscoverFilledIcon,
  ArticleIcon
} from '@pocket/web-ui'

const menuStyle = css`
  ${popoverBase};
  display: block;
  list-style-type: none;
  margin: 0;
  padding: 0;
  min-width: 200px;
`

export class ShareMenu extends Component {
  state = {
    copied: false
  }

  copyLink = () => {
    const { url, quote } = this.props
    const str = quote ? `${quote} [${url}]` : url
    copy(str).then(this.setCopied)
  }
  setCopied = () => {
    this.setState({ copied: true })
  }
  sendToRecommend = () => this.props.shareItem('recommend')
  sendToFriend = () => this.props.shareItem()
  onSocialShare = service => this.props.socialShare(service)

  render() {
    const { popoverRef } = this.props

    return (
      <ul className={menuStyle} ref={popoverRef}>
        <PopupMenuGroup>
          <PopupMenuItem onClick={this.copyLink}>
            <LinkIcon />
            {this.state.copied
              ? 'Copied!' // ? translate('shareMenu.copied') : translate('shareMenu.copy')
              : 'Copy Link' }
          </PopupMenuItem>
          <PopupMenuItem onClick={this.sendToRecommend}>
            Recommend {/*translate('shareMenu.recommend')*/}
          </PopupMenuItem>
          <PopupMenuItem onClick={this.sendToFriend}>
            <ProfileIcon />
            Send to Friend {/*translate('shareMenu.sendToFriend')*/}
          </PopupMenuItem>
          { this.props.isPremium ? (
            <PopupMenuItem
              href={urlWithPermanentLibrary(this.props.item_id)}
              target="_blank">
              <ArticleIcon />
              Permanent Library {/*translate('shareMenu.permanentCopy.copy'),aria: translate('shareMenu.permanentCopy.aria')*/}
            </PopupMenuItem>
          ) : null }
          <PopupMenuItem
            href={urlWithPocketRedirect(this.props.url)}
            target="_blank">
            <DiscoverFilledIcon />
            View Original
          </PopupMenuItem>
        </PopupMenuGroup>
        <SocialItems
          url={this.props.url}
          onSocialShare={this.onSocialShare}
          quote={this.props.quote}
          title={this.props.title}
        />
      </ul>
    )
  }
}
