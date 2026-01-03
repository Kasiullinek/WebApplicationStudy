import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <div className={`bg-white shadow-md rounded-xl p-4 transition-transform duration-200 hover:scale-[1.02] ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children, className = "",
}) => {
  return <div className={`p-2 ${className}`}>{children}</div>;
};
export default Card;