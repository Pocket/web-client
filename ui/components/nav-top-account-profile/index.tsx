import style from './style.module.css'

/**
 * NavTopAccountProfile
 * ---
 * User avatar and the dropdown menu
 */
export function NavTopAccountProfile() {
  return (
    <div className={style.base} data-testid="nav-top-account-profile">
      <button className={`${style.avatar} text`} type="button">
        <img alt="" src="https://i.pravatar.cc/300?img=38" />
      </button>
    </div>
  )
}
