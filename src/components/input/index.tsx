import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Label from "../Label";

interface Props {
  icon?: JSX.Element;
  placeholder: string;
  type?: string;
  className?: string;
  theme?: string;
  value?: any;
  onChange?: any;
  onFocus?: any;
  onKeyUp?: any;
  autoFocus?: boolean;
  inputRef?: any;
  label?: string;
  disabled?: boolean;
  maxlength?: number;
}

const Input: React.FC<Props> = ({
  icon,
  placeholder,
  type,
  className = "",
  theme,
  value,
  onChange,
  onFocus,
  onKeyUp,
  autoFocus,
  inputRef,
  label,
  disabled,
  maxlength,
}) => {
  const [inputType, setInputType] = useState(type);
  return (
    <div className="flex flex-col">
      {label && <Label label={label} />}
      <div
        className={`${theme == "dark"
          ? "bg-gray-ultra-dark dark:border-none text-gray-ultra-light"
          : "bg-chat"
          } dark:bg-gray-ultra-dark flex flex-row items-center ${icon ? "px-4" : "px-2"
          } py-4 w-full rounded-lg ${className}`}
      >
        {icon}
        <input
          disabled={disabled || false}
          ref={inputRef}
          style={{ borderRadius: "14px" }}
          type={inputType}
          maxLength={maxlength}
          placeholder={placeholder}
          autoFocus={autoFocus}
          value={value}
          {...(onChange ? { onChange } : {})}
          {...(onFocus ? { onFocus } : {})}
          {...(onKeyUp ? { onKeyUp } : {})}
          className={`bg-transparent h-full outline-none flex-1 w-full pl-2 ${inputType == "number" ? "text-right" : "text-left"
            }`}
        />
        {type === "password" && inputType == "password" && (
          <FiEye
            onClick={() => setInputType("text")}
            className="cursor-pointer text-gray-medium"
          />
        )}
        {type === "password" && inputType == "text" && (
          <FiEyeOff
            onClick={() => setInputType("password")}
            className="cursor-pointer text-gray-medium"
          />
        )}
      </div>
    </div>
  );
};

export default Input;
