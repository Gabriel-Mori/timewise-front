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
    <div className="flex flex-col justify-center items-center">
      <button
        className={`${className} text-white dark:text-white text-1xl rounded-full px-6 py-2 w-60 h-14 mt-8 hover:bg-bottomHover bg-bottomm`}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="flex items-center justify-center">
          {icon}
          <h3 className="text-1xl"> {label}</h3>
        </div>
      </button>
      {cancel && (
        <a
          className="text-gray-medium underline mt-5 cursor-pointer"
          onClick={cancel}
        >
          Cancelar
        </a>
      )}
    </div>
  )
}

export default Button
