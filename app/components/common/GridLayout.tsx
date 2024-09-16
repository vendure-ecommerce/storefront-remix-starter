import React from "react";

interface GridLayoutProps {
  className?: string;
  children: React.ReactNode;
}

const GridLayout: React.FC<GridLayoutProps> = ({ className, children }) => {
  return (
    <div
      className={`${className ? `${className}` : "grid grid-cols-2 gap-item sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"}`}
    >
      {children}
    </div>
  );
};

export default GridLayout;
