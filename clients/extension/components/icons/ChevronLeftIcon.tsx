import type { SVGProps } from 'react'

export const ChevronLeftIcon = ({ className, ...rest }: SVGProps<SVGSVGElement>) => {
  const iconClass = ['icon', className && className].join(' ')
  return (
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={iconClass}
      {...rest}>
      <path
        fillRule="evenodd"
        d="M14.707 4.293a1 1 0 0 1 0 1.414L8.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0"
        clipRule="evenodd"
      />
    </svg>
  )
}
