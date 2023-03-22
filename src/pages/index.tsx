import { Spinner } from "phosphor-react";
import Base from "../components/Base";

export default function Home() {
  return (
    <>
      <Base>
        <div className="flex items-center justify-center h-full w-full">
          <Spinner className="animate-spin text-pink text-8xl" />
        </div>
      </Base>
    </>
  );
}
