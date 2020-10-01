import React, { Component } from 'react'
import detectIt from 'detect-it'

export const ScrollTracker = ComponentToWrap => {
  return class ScrollHandler extends Component {
    constructor(props) {
      super(props)
      this.checking = false
      this.state = {
        scrollPercentage: 0,
        scrollDirection: 'd'
      }
    }

    getScrollPercent() {
      // https://stackoverflow.com/a/8028584
      const h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight'

      var val = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100

      return {
        percent: isFinite(val) ? val : 0,
        value: h[st] || b[st]
      }
    }

    update = () => {
      this.checking = false
      const { percent, value } = this.getScrollPercent()
      const direction = percent >= this.state.scrollPercentage ? 'd' : 'u'

      this.setState({
        scrollPercentage: percent,
        scrollValue: value,
        scrollDirection: direction
      })
    }

    handleScroll = () => {
      if (!this.checking) requestAnimationFrame(this.update)
      this.checking = true
    }

    componentDidMount() {
      window.addEventListener(
        'scroll',
        this.handleScroll,
        detectIt.passiveEvents ? { passive: true } : false
      )
    }

    componentWillUnmount() {
      window.removeEventListener(
        'scroll',
        this.handleScroll,
        detectIt.passiveEvents ? { passive: true } : false
      )
    }

    componentWillMount() {
      this.update()
    }

    render() {
      return (
        <ComponentToWrap
          {...this.props}
          scrollPercentage={this.state.scrollPercentage}
          scrollValue={this.state.scrollValue}
          scrollDirection={this.state.scrollDirection}
        />
      )
    }
  }
}
