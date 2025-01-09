import type { SVGProps } from "react"

export const SnippetsIcon = ({className, ...rest}: SVGProps<SVGSVGElement>) => {
  const iconClass = ['icon', className && className].join(' ')
  return (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true" className={iconClass} {...rest}><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.389 5.832c.02 1.522 1.285 2.74 2.824 2.719 1.54-.021 2.77-1.272 2.749-2.794s-1.286-2.74-2.825-2.72-2.77 1.272-2.748 2.795M4.038 5.971c.021 1.523 1.286 2.74 2.825 2.72 1.539-.022 2.77-1.272 2.748-2.795-.02-1.522-1.285-2.74-2.824-2.719-1.54.02-2.77 1.272-2.749 2.794M17.518 20.88 8.43 8.188M7.113 20.88l8.52-12.79"/></svg>
)}
  
