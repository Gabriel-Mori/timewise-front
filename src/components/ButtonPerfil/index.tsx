import React from 'react'

interface Props {
  label?: string
  className?: string
  disabled?: boolean
  style?: any
  loading?: boolean
  onClick?(e: any): void
  icon?: JSX.Element
  cancel?(e: any): void
}

const Button: React.FC<Props> = ({
  label,
  className,
  disabled,
  style,
  loading,
  onClick,
  icon,
  cancel,
}) => {
  return (
    <div className="flex  ">
      <button
        className={`${className} rounded-lg text-white dark:text-white text-1xl  px-6 py-2 w-40 h-12  hover:bg-secondary bg-primary`}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="flex items-center justify-center">
          {icon}
          <h3 className=" text-1xl"> {label}</h3>
        </div>
      </button>
    </div>
  )
}

export default Button
