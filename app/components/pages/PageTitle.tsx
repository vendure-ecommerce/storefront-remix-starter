import React from "react";

interface PageTitleProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
  srOnly?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({
  className,
  title,
  children,
  srOnly,
}) => {
  return (
    <h1
      className={`${className ? `${className}` : "text-5xl font-bold leading-none"} ${srOnly ? "sr-only" : ""}`}
    >
      {title && !children && title}{" "}
      {/* Ha van title és nincs children, akkor a title-t jelenítsd meg */}
      {children} {/* Ha vannak gyerekelemek, azokat jelenítsd meg */}
    </h1>
  );
};

export default PageTitle;
