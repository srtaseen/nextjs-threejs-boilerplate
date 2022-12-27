import React from "react";
import dynamic from "next/dynamic";
import ScreenPage from "./ScreenPage";

const ScreenPageLoader = dynamic(() => import("./MainModel"), {
  ssr: false,
  loading: () => <ScreenPage />,
});

const Screen = () => {
  return (
    <div className="w-full">
      <div>
        <ScreenPageLoader />
      </div>
    </div>
  );
};

export default Screen;
