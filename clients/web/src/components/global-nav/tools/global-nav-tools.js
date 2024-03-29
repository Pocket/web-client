import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/css'

const listStyle = css`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;

  li {
    margin: 0 0 0 var(--spacing050);
    padding: 0;

    &:first-child {
      margin-left: 0;
    }
  }
`

/**
 * Component that displays a list of "tools" (buttons as icons) within the GlobalNav.
 * Accepts a list of "tools" (name, label, icon) and provides a tool click callback
 * to know when a particular tool was clicked. The list of tools is passed in as a prop
 * so that tools can be customized in the GlobalNav per page/app.
 */
const GlobalNavTools = ({ tools = [], onToolClick = () => {} }) => {
  function handleToolClick(event, toolName) {
    onToolClick(toolName)
  }

  if (!tools.length) {
    return null
  }

  return (
    <ul className={listStyle}>
      {tools.map((tool) => {
        return (
          <li key={`global-nav-tool-${tool.name}`}>
            <button
              type="button"
              data-testid={`global-nav-tool-${tool.name}`}
              aria-label={tool.label}
              data-tooltip={tool.label}
              data-tooltip-position="bottom"
              onClick={(event) => {
                handleToolClick(event, tool.name)
              }}
              className="action">
              {tool.icon}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

GlobalNavTools.propTypes = {
  /**
   * Tool icons to display. Accepted as a prop so that tools can be customized per
   * page context via the GlobalNav parent. Each tool should have a name (id),
   * label (for display), and icon component. Each icon will be rendered as a
   * button in a list.
   */
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      icon: PropTypes.node
    })
  ),

  /**
   * Callback function called when any tool is clicked. Gets passed the name of
   * that tool.
   */
  onToolClick: PropTypes.func
}

export default GlobalNavTools
