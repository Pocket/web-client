import style from './style.module.css'

/**
 * NavTopSearch
 * ---
 * Describe the functionality of this component. Do make sure it is properly typed as
 * it will make working with it much easier
 * !! DO NOT MERGE WITH DEFAULT COMMENTS
 */
export function NavTopSearch() {
  return (
    <div className={style.base} data-testid="nav-top-search">
      <input id="search" name="search" type="search" />
    </div>
  )
}
