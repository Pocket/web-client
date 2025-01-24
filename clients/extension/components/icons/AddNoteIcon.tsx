import type { SVGProps } from 'react'

export const AddNoteIcon = ({ className, ...rest }: SVGProps<SVGSVGElement>) => {
  const iconClass = ['icon', className && className].join(' ')
  return (
    <svg
      className={iconClass}
      {...rest}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 5H20V19.6522C20 19.9609 19.8601 20.2907 19.553 20.5577C19.2415 20.8286 18.7925 21 18.3 21H5.7C5.2075 21 4.75852 20.8286 4.44699 20.5577C4.13989 20.2907 4 19.9609 4 19.6522V5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 3V4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3V4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 3V4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0001 17.5C11.4478 17.5 11.0001 17.0523 11.0001 16.5V8.5C11.0001 7.94772 11.4478 7.5 12.0001 7.5C12.5523 7.5 13.0001 7.94772 13.0001 8.5V16.5C13.0001 17.0523 12.5523 17.5 12.0001 17.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 12.4998C7 11.9475 7.44772 11.4998 8 11.4998H16C16.5523 11.4998 17 11.9475 17 12.4998C17 13.052 16.5523 13.4998 16 13.4998H8C7.44772 13.4998 7 13.052 7 12.4998Z"
        fill="currentColor"
      />
    </svg>
  )
}
