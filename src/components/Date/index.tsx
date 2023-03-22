import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import pt from 'date-fns/locale/pt'

registerLocale('pt', pt)

interface Props {
  icon?: JSX.Element
  placeholder?: string
  fieldName?: string
  value?: any
  inputRef?: any
  className?: string
  disabled?: boolean
  onKeyDown?: (e: any) => void
  onChange: Function
  dateFormat?: string
  type?: 'date' | 'time'
}

const DatePick: React.FC<Props> = ({
  icon,
  placeholder,
  onChange,
  className = '',
  value,
  disabled,
  onKeyDown,
  fieldName,
  inputRef,
  dateFormat = 'dd/MM/yyyy',
  type = 'date',
}) => {
  const handleTypeTime = {
    showTimeSelect: true,
    showTimeSelectOnly: true,
    timeCaption: 'Horas',
    showTimeInput: true,
    timeInputLabel: 'Selecione uma hora:',
    timeIntervals: 5,
  }
  return (
    <div
      className={`${
        icon ? 'px-4' : ''
      } h-11 w-full border border-solid border-gray-400 focus-within:border-primary rounded-md flex overflow-hidden items-center ${className}`}
    >
      {icon}
      <DatePicker
        className="flex-1 px-4 h-full outline-none w-full bg-transparent text-sm font-primary "
        locale="pt"
        name={fieldName}
        ref={inputRef}
        autoComplete="off"
        dateFormat={dateFormat}
        selected={value}
        disabled={disabled}
        onKeyDown={onKeyDown}
        onChange={(value: any) => {
          onChange(fieldName, value)
        }}
        placeholderText={placeholder || 'dd/mm/aaaa'}
        {...(type === 'time' ? { ...handleTypeTime } : {})}
      />
    </div>
  )
}

export default DatePick
