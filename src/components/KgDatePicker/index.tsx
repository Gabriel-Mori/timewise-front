import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";

registerLocale("pt", pt);

interface Props {
  icon?: JSX.Element;
  placeholder?: string;
  fieldName?: string;
  type?: string;
  value?: any;
  inputRef?: any;
  className?: string;
  disabled?: boolean;
  onKeyPress?: (e: any) => void;
  onChange: Function;
}

const KgDatePicker: React.FC<Props> = ({
  icon,
  placeholder,
  onChange,
  type = "text",
  className = "",
  value,
  disabled,
  onKeyPress,
  fieldName,
  inputRef,
}) => {
  return (
    <div
      className={`${icon ? "px-4" : ""} h-11 ${
        disabled ? "bg-gray-300" : "bg-gray-200"
      } w-full border border-solid border-gray-400 focus-within:border-primary shadow-2xl rounded-md flex overflow-hidden items-center ${className}`}
    >
      {icon}
      <DatePicker
        className="flex-1 px-4 h-full outline-none w-full bg-transparent text-sm font-primary "
        type={type}
        locale="pt"
        name={fieldName}
        ref={inputRef}
        autoComplete="off"
        dateFormat="dd/MM/yyyy"
        selected={value}
        disabled={disabled}
        onKeyPress={onKeyPress}
        onChange={(value: any) => {
          onChange(fieldName, value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default KgDatePicker;
