import React from "react";

interface Props {
  children: any;
}
const Panel: React.FC<Props> = ({ children }: any) => {
  return <div className="p-8 bg-white  rounded-md mt-5">{children}</div>;
};

export default Panel;
