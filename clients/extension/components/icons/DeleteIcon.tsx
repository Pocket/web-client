import type { SVGProps } from "react"

export const DeleteIcon = ({className, ...rest}: SVGProps<SVGSVGElement>) => {
  const iconClass = ['icon', className && className].join(' ')
  return (
  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className={iconClass} {...rest}><path fillRule="evenodd" d="M7 5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4h5a1 1 0 1 1 0 2h-1v11a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7H2a1 1 0 0 1 0-2zm2 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zM5 7h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" clipRule="evenodd"/><path fillRule="evenodd" d="M9 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1M15 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1" clipRule="evenodd"/></svg>
)}
  
