import get from "lodash.get";
import React, { useEffect, useRef } from "react";
import InputLabel from "../Label";
import dynamic from "next/dynamic";
import { SpinnerGap } from "phosphor-react";

const AsyncSelect: any = dynamic(() => import("react-select/async" as any), {
  ssr: false,
});

interface Props {
  fetch: Function | any[];
  placeholder?: string;
  fieldName?: string;
  fieldLabel?: string;
  fieldValue?: string;
  label?: string;
  value?: any;
  isClearable?: boolean;
  onChange: (field: string, value: any) => void;
  containerStyles?: React.CSSProperties;
  controlStyles?: React.CSSProperties;
  getModelValue?: (obj: any) => any;
  isDisabled?: boolean;
  fakeOptions?: { value?: string; label?: string; name?: string }[];
  cacheOptions?: boolean;
  defaultOptions?: boolean;
  hideSelectedOptions?: boolean;
  onCreate?: (value: string) => Promise<any>;
  enableAdd?: boolean;
  defaultLabelCreate?: string;
  theme?: string;
  isMulti?: Boolean;
}

const Select: React.FC<Props> = ({
  fetch,
  fieldName,
  placeholder,
  label,
  value,
  fieldLabel,
  fieldValue,
  onChange,
  containerStyles,
  controlStyles,
  getModelValue,
  isClearable = true,
  isDisabled,
  fakeOptions = [],
  cacheOptions = true,
  defaultOptions = true,
  hideSelectedOptions = false,
  onCreate,
  enableAdd = false,
  defaultLabelCreate,
  isMulti,
  theme = "light",
}) => {
  const inputRef = useRef(null);
  const selectRef = useRef<any>(null);

  const bgWhenDisabled = isDisabled
    ? theme === "dark"
      ? "#1f1622"
      : "#e5e7eb"
    : "transparent";

  if (Array.isArray(fetch) && typeof fetch[0] == "string") {
    fetch = fetch.map((i) => ({ value: i, label: i }));
    fieldValue = "value";
    fieldLabel = "label";
    if (value) {
      value = fetch.find((t) => t.value == value);
    }
  }

  if (Array.isArray(fetch) && typeof fetch[0] == "object" && fieldValue) {
    fieldValue = fieldValue || "value";
    fieldLabel = fieldLabel || "label";
    if (value) {
      value = fetch.find((t) => t[fieldValue as any] == value);
    }
  }

  useEffect(() => {
    selectRef?.current?.retry();
  }, [fetch]);

  const loadOptions = async (inputValue: any): Promise<any[]> => {
    return new Promise(async (resolve) => {
      if (Array.isArray(fetch)) {
        resolve(
          [
            ...fakeOptions,
            ...fetch,
            ...(enableAdd
              ? [
                {
                  new: true,
                  name:
                    inputValue.length == 0
                      ? defaultLabelCreate
                        ? defaultLabelCreate
                        : "(Novo)"
                      : "Criar: " + inputValue,
                },
              ]
              : []),
          ].filter((op) => {
            if (fieldLabel) {
              return get(op, fieldLabel)
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            }
            return String(op).toLowerCase().includes(inputValue.toLowerCase());
          })
        );
      } else {
        const arr = await fetch(inputValue);
        resolve([
          ...fakeOptions,
          ...arr,
          ...(enableAdd
            ? [
              {
                name:
                  inputValue.length == 0
                    ? defaultLabelCreate
                      ? defaultLabelCreate
                      : "(Novo)"
                    : "Criar: " + inputValue,
              },
            ]
            : []),
        ]);
      }
    });
  };

  return (
    <div
      className={`w-full ${isDisabled ? "cursor-not-allowed" : ""}`}
      ref={inputRef}
    >
      {label && <InputLabel label={label} />}

      <AsyncSelect
        hideSelectedOptions={hideSelectedOptions}
        loadOptions={loadOptions}
        defaultOptions={defaultOptions}
        isMulti={isMulti}
        ref={selectRef}
        isClearable={isClearable}
        value={value || null}
        onChange={(e: any) => {
          if (e !== null) {
            if (e.new && onCreate) {
              onCreate(e.name.replace("Criar: ", "")).then((response) => {
                const value = getModelValue
                  ? getModelValue(response)
                  : response;
                onChange(
                  fieldName || "",
                  fieldValue ? get(value, fieldValue) : value
                );
                setTimeout(() => {
                  selectRef?.current?.retry();
                }, 1000);
              });
            } else {
              const value = getModelValue ? getModelValue(e) : e;
              onChange(
                fieldName || "",
                fieldValue ? get(value, fieldValue) : value
              );
            }
          } else {
            onChange(fieldName || "", null);
          }
        }}
        isDisabled={isDisabled}
        name={fieldName}
        noOptionsMessage={() => "Não há opções"}
        loadingMessage={() => "Buscando dados..."}
        instanceId={fieldName}
        getOptionValue={(op: any) => (getModelValue ? getModelValue(op) : op)}
        getOptionLabel={(op: any) => {
          return fieldLabel ? get(op, fieldLabel) : op;
        }}
        components={{
          LoadingIndicator: () => (
            <SpinnerGap className="animate-spin" size={22} />
          ),
        }}
        styles={{
          container: (provided: any) => {
            return {
              ...provided,
              background: bgWhenDisabled,
              ...containerStyles,
              border: "none",
            };
          },
          loadingIndicator: (provided: any) => {
            return { ...provided, width: "1rem", height: "1rem" };
          },
          control: (provided: any, state: any) => {
            return {
              ...provided,
              // boxShadow:
              //   " 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              background: "transparent",
              border: controlStyles
                ? "transparent"
                : state.isFocused
                  ? "1px solid #e91756"
                  : "1px solid #9ca3af",
              "&:hover": {
                borderColor: state.isFocused ? "#e91756" : "#9ca3af",
              },
              ...controlStyles,
              ...(!containerStyles ? { height: 50, borderRadius: "8px" } : {}),
            };
          },
          singleValue: (provided: any, state: any) => {
            return {
              ...provided,
              color: "var(--font-secondary)",
            };
          },
          option: (provided: any, state: any) => {
            return {
              ...provided,
              background: state.isFocused
                ? "#6fd0c4"
                : theme === "dark"
                  ? "gray"
                  : "white",
              color: state.isFocused
                ? "black"
                : theme === "dark"
                  ? "white"
                  : "black",
              cursor: "pointer",
            };
          },
          menuList: (provided: any) => {
            return {
              ...provided,
              background: theme === "dark" ? "gray" : "white",
            };
          },
        }}
        className="rounded-lg text-sm bg-transparent  font-primary  dark:text-white"
        placeholder={placeholder || ""}
      />
    </div>
  );
};

export default Select;
