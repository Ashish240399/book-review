import React from "react";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-[50px] sm:pt-[70px] md:pt-[80px] px-[1.5%] pb-4">
      {children}
    </div>
  );
};
