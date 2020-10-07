import { css } from 'linaria'

export const sideNav = css`
  /* position: fixed;
  height: 100%;
  overflow: hidden; */
`

export const sideNavHeader = css`
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize100);
  font-weight: 500;
  line-height: 0.8;
  padding: 20px 20px 10px;
  margin: 5px 0;
  color: var(--color-grey65); /* ! Don't use colors direct */
`

export const sideNavItem = css`
  display: flex;
  align-items: center;
  align-content: center;
  width: 100%;
  padding: 0 20px;
  font-size: var(--fontSize100);
  font-weight: 400;
  line-height: 16px;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 4px;
  text-decoration: none;
  color: var(--color-textPrimary);
  background-color: transparent;

  &:hover {
    color: var(--color-actionPrimary);
    background-color: transparent;
  }
  &:active,
  &:focus {
    transition: none;
    color: var(--color-actionPrimary);
    outline: 1px auto var(--color-navCurrentTab);
  }
  &.active {
    color: var(--color-actionPrimaryHover);
    background-color: var(--color-navCurrentTab);
  }
`
