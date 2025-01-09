import type { SVGProps } from "react"

export const NotesIcon = ({className, ...rest}: SVGProps<SVGSVGElement>) => {
  const iconClass = ['icon', className && className].join(' ')
  return (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true" className={iconClass} {...rest}><mask id="a" fill="currentColor"><path d="M3 4h18v15.652c0 .623-.284 1.22-.79 1.66-.507.44-1.194.688-1.91.688H5.7c-.716 0-1.403-.247-1.91-.688S3 20.275 3 19.652z"/></mask><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M3 4h18v15.652c0 .623-.284 1.22-.79 1.66-.507.44-1.194.688-1.91.688H5.7c-.716 0-1.403-.247-1.91-.688S3 20.275 3 19.652z" mask="url(#a)"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3v1m4-1v1m4-1v1"/><path fill="currentColor" fillRule="evenodd" d="M7 11a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1" clipRule="evenodd"/></svg>
)}
  
