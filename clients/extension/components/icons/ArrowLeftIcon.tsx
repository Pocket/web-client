import type { SVGProps } from 'react'

export const ArrowLeftIcon = ({ className, ...rest }: SVGProps<SVGSVGElement>) => {
  const iconClass = ['icon', className && className].join(' ')
  return (
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={iconClass}
      {...rest}>
      <path d="M12.707 5.707a1 1 0 0 0-1.414-1.414l-7 7a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414-1.414L7.414 13H19.05c.525 0 .95-.448.95-1s-.425-1-.95-1H7.414z" />
    </svg>
  )
}
