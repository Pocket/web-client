import { css } from 'linaria'

const selectDownArrowLight = `data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="292.4" height="292.4"><path fill="#000000" d="M287 69.4a17.6 17.6 0 0 0-13-5.4H18.4c-5 0-9.3 1.8-12.9 5.4A17.6 17.6 0 0 0 0 82.2c0 5 1.8 9.3 5.4 12.9l128 127.9c3.6 3.6 7.8 5.4 12.8 5.4s9.2-1.8 12.8-5.4L287 95c3.5-3.5 5.4-7.8 5.4-12.8 0-5-1.9-9.2-5.5-12.8z"/></svg>`
const selectDownArrowLightEncoded = encodeURI(selectDownArrowLight).replace('#', '%23')
const selectDownArrowDark = `data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="292.4" height="292.4"><path fill="#FFFFFF" d="M287 69.4a17.6 17.6 0 0 0-13-5.4H18.4c-5 0-9.3 1.8-12.9 5.4A17.6 17.6 0 0 0 0 82.2c0 5 1.8 9.3 5.4 12.9l128 127.9c3.6 3.6 7.8 5.4 12.8 5.4s9.2-1.8 12.8-5.4L287 95c3.5-3.5 5.4-7.8 5.4-12.8 0-5-1.9-9.2-5.5-12.8z"/></svg>`
const selectDownArrowDarkEncoded = encodeURI(selectDownArrowDark).replace('#', '%23')

const checkboxCheckMarkLight = `data:image/svg+xml;charset=US-ASCII,<svg width="16" height="13" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.635 12.175L1.095 9.21a1.5 1.5 0 011.927-2.3l2.49 2.087 7.45-7.962a1.5 1.5 0 012.191 2.05l-8.391 8.968a1.5 1.5 0 01-2.126.123z" fill="#FFFFFF"/></svg>`
const checkboxCheckMarkLightEncoded = encodeURI(checkboxCheckMarkLight).replace('#', '%23')

const checkboxCheckMarkColor = `data:image/svg+xml;charset=US-ASCII,<svg width="16" height="13" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.635 12.175L1.095 9.21a1.5 1.5 0 011.927-2.3l2.49 2.087 7.45-7.962a1.5 1.5 0 012.191 2.05l-8.391 8.968a1.5 1.5 0 01-2.126.123z" fill="#008078"/></svg>`
const checkboxCheckMarkColorEncoded = encodeURI(checkboxCheckMarkColor).replace('#', '%23')

const checkboxCheckMarkHover = `data:image/svg+xml;charset=US-ASCII,<svg width="16" height="13" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.635 12.175L1.095 9.21a1.5 1.5 0 011.927-2.3l2.49 2.087 7.45-7.962a1.5 1.5 0 012.191 2.05l-8.391 8.968a1.5 1.5 0 01-2.126.123z" fill="#004D48"/></svg>`
const checkboxCheckMarkHoverEncoded = encodeURI(checkboxCheckMarkHover).replace('#', '%23')

const crossIconColor = `data:image/svg+xml;charset=US-ASCII, <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.36369 0.405544C1.82296 -0.135181 0.94627 -0.135181 0.405544 0.405544C-0.135181 0.94627 -0.135181 1.82296 0.405544 2.36369L4.04186 6L0.405544 9.63631C-0.135181 10.177 -0.135181 11.0537 0.405544 11.5945C0.946271 12.1352 1.82296 12.1352 2.36369 11.5945L6 7.95814L9.63631 11.5945C10.177 12.1352 11.0537 12.1352 11.5945 11.5945C12.1352 11.0537 12.1352 10.177 11.5945 9.63631L7.95814 6L11.5945 2.36369C12.1352 1.82296 12.1352 0.94627 11.5945 0.405544C11.0537 -0.135181 10.177 -0.135181 9.63631 0.405544L6 4.04186L2.36369 0.405544Z" fill="#737373"/></svg>`
const crossIconColorEncoded = encodeURI(crossIconColor).replace('#', '%23')

const crossIconHover = `data:image/svg+xml;charset=US-ASCII, <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.36369 0.405544C1.82296 -0.135181 0.94627 -0.135181 0.405544 0.405544C-0.135181 0.94627 -0.135181 1.82296 0.405544 2.36369L4.04186 6L0.405544 9.63631C-0.135181 10.177 -0.135181 11.0537 0.405544 11.5945C0.946271 12.1352 1.82296 12.1352 2.36369 11.5945L6 7.95814L9.63631 11.5945C10.177 12.1352 11.0537 12.1352 11.5945 11.5945C12.1352 11.0537 12.1352 10.177 11.5945 9.63631L7.95814 6L11.5945 2.36369C12.1352 1.82296 12.1352 0.94627 11.5945 0.405544C11.0537 -0.135181 10.177 -0.135181 9.63631 0.405544L6 4.04186L2.36369 0.405544Z" fill="#404040"/></svg>`
const crossIconHoverEncoded = encodeURI(crossIconHover).replace('#', '%23')

/**
 * Elements *
 * These styles aid in the basic styling of standard non-typography element tags
 * such as form elements.
 */
export const Elements = css`
  :global() {
    form {
      font-family: var(--fontSansSerif);
    }

    legend {
      display: block;
      font-size: var(--fontSize085);
      font-weight: bold;
      border-bottom: 1px solid var(--color-formFieldBorder);
      margin: 0 0 var(--spacing150) 0;
    }

    label {
      font-family: var(--fontSansSerif);
    }

    input[type='text'],
    input[type='date'],
    input[type='email'],
    input[type='password'],
    input[type='search'],
    input[type='month'],
    input[type='number'],
    input[type='time'],
    input[type='url'],
    input[type='week'],
    textarea,
    select {
      font-family: var(--fontSansSerif);
      color: var(--color-textPrimary);
      display: block;
      outline: none;
      border: none;
      border-radius: var(--borderRadius);
      line-height: 160%;
      padding: var(--spacing050) var(--spacing075);
      width: 100%;
      background: none;
      -webkit-appearance: none;
      /* box shadow is used to simulate border so that on focus we can increase
      the thickness to 2px without shifting elements on the page. */
      box-shadow: 0px 0px 0px 1px var(--color-formFieldBorder);

      &:disabled {
        opacity: 0.5;
        pointer-events: none;
      }

      &:hover:enabled {
        box-shadow: 0px 0px 0px 1px var(--color-formFieldBorderHover);
      }

      &:focus:enabled {
        box-shadow: 0px 0px 0px 2px var(--color-actionPrimary);
      }
    }

    /* clears the 'X' from Chrome */
    input[type='search']::-webkit-search-decoration,
    input[type='search']::-webkit-search-cancel-button,
    input[type='search']::-webkit-search-results-button,
    input[type='search']::-webkit-search-results-decoration {
      display: none;
      -webkit-appearance: none;
    }

    /* dotted line on select elements in FF */
    select:-moz-focusring {
      color: transparent;
      text-shadow: 0 0 0 var(--color-textPrimary);
    }

    label {
      cursor: pointer;
      &.block {
        display: flex;
        align-items: center;
      }
    }

    label > input[type='radio'],
    label > input[type='checkbox'] {
      cursor: pointer;
      margin: 0 0.725rem 0 0;
    }

    input[type='radio'] + label,
    input[type='checkbox'] + label {
      display: inline-block;
      vertical-align: middle;
      margin: 0 0 0 var(--spacing075);
    }

    input[type='radio'] {
      height: var(--size150);
      width: var(--size150);
      margin: var(--size050) 0 var(--size050);
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: 2px solid var(--color-formFieldBorder);
      border-radius: 50%;
      outline: none;
      transition: border 50ms cubic-bezier(0.4, 0, 0.2, 1),
        background 50ms cubic-bezier(0.4, 0, 0.2, 1);
      background: var(--color-canvas);
      vertical-align: middle;

      & + label {
        margin: var(--size050) 0 var(--size050);
        display: inline-block;
        min-height: 24px;
        position: relative;
        padding: 0 24px;
        cursor: pointer;
        vertical-align: bottom;
        &:before,
        &:after {
          position: absolute;
          content: '';
          border-radius: 50%;
          transition: all 50ms ease;
          transition-property: transform, border-color;
        }
        // radio button border
        &:before {
          left: -12px;
          top: 0;
          width: 24px;
          height: 24px;
          border: 2px solid var(--color-formFieldBorder);
        }
        // selected radio button inner circle
        &:after {
          top: 5px;
          left: -7px;
          width: 14px;
          height: 14px;
          transform: scale(0);
          background: var(--color-actionPrimary);
        }
      }

      &:focus {
        outline: 2px solid var(--color-actionPrimary);
        outline-offset: 2px;
      }

      &:hover:enabled {
        border-color: var(--color-actionPrimaryHover);
        & + label:before {
          border-color: var(--color-actionPrimaryHover);
        }
      }

      &:disabled {
        & + label {
          opacity: 0.5;
        }
        &:hover {
          & + label:before,
          & + label {
            cursor: not-allowed;
          }
        }
      }

      &:checked {
        border-color: var(--color-actionPrimary);
        box-shadow: inset 0 0 0 2px var(--color-canvas);
        background-color: var(--color-actionPrimary);
      }

      &:checked {
        & + label:before {
          border-color: var(--color-actionPrimary);
        }

        & + label:after {
          transform: scale(1);
        }

        &:hover:enabled,
        &:active:enabled {
          & + label:before {
            border-color: var(--color-actionPrimaryHover);
          }
          & + label:after {
            background: var(--color-actionPrimaryHover);
          }
        }
      }
      // same design element regardless of checked or hover
      &:focus {
        & + label:before {
          box-shadow: 0px 0 0 2px var(--color-canvas), 0px 0 0 4px var(--color-formFieldFocusLabel);
        }
      }
    }

    input[type='checkbox'] {
      height: var(--size150);
      width: var(--size150);
      margin: var(--size050) 0 var(--size050);
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: 2px solid var(--color-formFieldBorder);
      border-radius: 4px;
      outline: none;
      transition: border 50ms cubic-bezier(0.4, 0, 0.2, 1),
        background 50ms cubic-bezier(0.4, 0, 0.2, 1);
      background: var(--color-canvas);
      vertical-align: middle;

      & + label {
        width: calc(100% - (var(--spacing075) + var(--size150)));
      }

      &:hover {
        border: 2px solid var(--color-actionPrimary);
      }

      &:active {
        border: 2px solid var(--color-actionPrimaryHover);
      }

      &:before {
        content: url(${checkboxCheckMarkLightEncoded});
        transform: scale(0);
        opacity: 0;
        line-height: normal;
        display: block;
        text-align: center;
        transition: opacity 100ms cubic-bezier(0.4, 0, 0.2, 1),
          transform 100ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      &:checked {
        border: 2px solid var(--color-actionPrimary);
        background: var(--color-actionPrimary);

        &:before {
          transform: scale(1);
          opacity: 1;
        }

        &:hover {
          border: 2px solid var(--color-actionPrimaryHover);
          background: var(--color-actionPrimaryHover);
        }
      }

      // same design element regardless of checked or hover
      &:focus {
        box-shadow: 0px 0 0 2px var(--color-canvas), 0px 0 0 4px var(--color-formFieldFocusLabel);
      }

      &:disabled,
      &:disabled:checked {
        opacity: 0.5;
        pointer-events: none;

        & + label {
          opacity: 0.5;
          pointer-events: none;
        }
      }
    }

    input.toggle[type='checkbox'] {
      cursor: pointer;
      height: 36px;
      width: 64px;
      margin: 0.25 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: none;
      border-radius: 18px;
      outline: none;
      transition: background 50ms cubic-bezier(0.4, 0, 0.2, 1);
      background: var(--color-toggleOff);
      vertical-align: middle;
      color: var(--color-actionPrimary);
      & + label {
        width: auto;
      }

      &:hover,
      &:active {
        background-color: var(--color-toggleOffHover);
        border: none;
        &:before {
          content: url(${crossIconHoverEncoded});
        }
      }

      &:before {
        margin: 2px;
        width: 32px;
        height: 32px;
        background-color: var(--color-canvas);
        border-radius: 18px;
        content: url(${crossIconColorEncoded});
        transform: translateX(0);
        line-height: normal;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 1;
      }

      &:checked {
        color: var(--color-actionPrimary);
        border: none;
        background: var(--color-actionPrimary);

        &:before {
          transform: translateX(28px);
          opacity: 1;
          content: url(${checkboxCheckMarkColorEncoded});
        }

        &:hover {
          border: none;
          background: var(--color-actionPrimaryHover);
          &:before {
            content: url(${checkboxCheckMarkHoverEncoded});
          }
        }
      }

      // same design element regardless of checked or hover
      &:focus {
        box-shadow: 0px 0 0 2px var(--color-canvas), 0px 0 0 4px var(--color-formFieldFocusLabel);
      }

      &:disabled,
      &:disabled:checked {
        opacity: 0.5;
        pointer-events: none;

        & + label {
          opacity: 0.5;
          pointer-events: none;
        }
      }
    }

    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-image: url(${selectDownArrowLightEncoded});
      background-repeat: no-repeat;
      background-position: right 0.7rem top 50%;
      background-size: 11px auto;
      padding-right: 1.725rem;

      .colormode-dark & {
        background-image: url(${selectDownArrowDarkEncoded});
      }
    }

    option {
      color: var(--color-textPrimary);

      .colormode-dark & {
        color: var(--color-canvas);
      }
    }

    a {
      color: inherit;
      text-decoration: underline;
      transition: color 0.1s ease-out;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--color-textLinkHover);
        }
      }
    }

    button,
    a.button,
    input[type='submit'] {
      font-family: var(--fontSansSerif);
      font-size: 1rem;
      line-height: 110%;
      display: inline-block;
      text-decoration: none;
      whitespace: nowrap;
      background-color: var(--color-actionPrimary);
      color: var(--color-actionPrimaryText);
      border: none;
      border-radius: var(--borderRadius);
      padding: 0.75rem;

      &:hover {
        text-decoration: none;
        background-color: var(--color-actionPrimaryHover);
      }

      &:focus {
        outline: 1px auto var(--color-actionFocus);
        outline-offset: 3px;
      }

      &.large {
        font-size: 1.25rem;
        padding: 1rem;
      }

      &.small {
        font-size: 0.85rem;
        padding: 0.75rem;
      }

      .icon {
        margin-right: 0.5rem;
      }

      .colormode-dark & {
        font-weight: 500;
      }

      &.secondary {
        color: var(--color-actionSecondaryText);
        border: 1px solid var(--color-actionSecondary);
        background-color: var(--color-canvas);
        &:hover {
          color: var(--color-actionSecondaryHoverText);
          background-color: var(--color-actionSecondaryHover);
        }
      }

      &.brand {
        color: var(--color-actionBrandText);
        background-color: var(--color-actionBrand);
        &:hover {
          background-color: var(--color-actionBrandHover);
        }
      }

      &.text {
        color: var(--color-textPrimary);
        background-color: var(--color-canvas);
        &:hover {
          color: var(--color-textLinkHover);
          background-color: var(--color-canvas);
        }
      }
    }

    /* Adding resets to the global styles so they load early on */
    #ot-sdk-btn.ot-sdk-show-settings,
    #ot-sdk-btn.optanon-show-settings {
      border: none;
      background-color: transparent;
      font-family: inherit;
      padding: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;

      @media screen and (-ms-high-contrast: active) {
        border: 2px solid currentcolor;
      }

      text-decoration: underline;
      color: var(--color-textPrimary);

      &:hover {
        color: var(--color-textLinkHover);
      }

      &:focus {
        outline: none;
      }
    }
  }
`
