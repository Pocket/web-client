import type { SVGProps } from "react"

export const SaveIcon = ({className, ...rest}: SVGProps<SVGSVGElement>) => {
  const iconClass = ['icon', className && className].join(' ')
  return (
  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className={iconClass} {...rest}><path fillRule="evenodd" d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2H2m2 0H2v6c0 5.523 4.477 10 10 10s10-4.477 10-10V5h-2v6a8 8 0 1 1-16 0z" clipRule="evenodd"/><path fillRule="evenodd" d="M7.293 9.293a1 1 0 0 1 1.414 0L12 12.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414" clipRule="evenodd"/></svg>
)}
  
