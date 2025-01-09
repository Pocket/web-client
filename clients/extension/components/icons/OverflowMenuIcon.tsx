import type { SVGProps } from "react"

export const OverflowMenuIcon = ({className, ...rest}: SVGProps<SVGSVGElement>) => {
  const iconClass = ['icon', className && className].join(' ')
  return (
  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className={iconClass} {...rest}><path d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0M6 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0M22 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/></svg>
)}
  
