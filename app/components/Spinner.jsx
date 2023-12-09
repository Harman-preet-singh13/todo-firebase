import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Spinner = () => {
  return (
    <div className="w-full h-[65vh] flex items-center justify-center">
      <AiOutlineLoading3Quarters className="text-blue-500 animate-spin text-3xl" />
    </div>
  );
};

export default Spinner;
