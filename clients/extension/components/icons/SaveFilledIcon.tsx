import type { SVGProps } from 'react'

export const SaveFilledIcon = ({ className, ...rest }: SVGProps<SVGSVGElement>) => {
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
        d="M12 21c5.523 0 10-4.477 10-10V5a2 2 0 0 0-2-2H4c-1.105 0-2 .893-2 1.998V11c0 5.523 4.477 10 10 10M8.707 9.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L12 12.586z"
        clipRule="evenodd"
      />
    </svg>
  )
}
