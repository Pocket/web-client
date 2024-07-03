import style from './style.module.css'

/**
 * Error
 * ---
 * This is just a generic error we are using to pass any message in and letting the user
 * know that everything is broken and there is no recourse. Time to go outside and run through
 * the sprinklers.
 */
export function Error({ title, message }: { title: string; message: string }) {
  return (
    <div className={`${style.base} page-container`} data-testid="error">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  )
}
