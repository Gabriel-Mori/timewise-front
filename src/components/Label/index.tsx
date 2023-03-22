import React from "react";

interface Props {
  label: string;
}

const Label: React.FC<Props> = ({ label }) => {
  return (
    <div className="mb-2">
      <label className="text-4xl sm:text-base font-semibold text-font-color-light-gray">
        {label}
      </label>
    </div>
  );
};

export default Label;
