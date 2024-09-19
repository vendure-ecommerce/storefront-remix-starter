import React from "react";

interface SummaryProps {
  children: React.ReactNode;
}

const Summary: React.FC<SummaryProps> = ({ children }) => {
  return <div className='flex flex-col gap-4'>{children}</div>;
};

export default Summary;
