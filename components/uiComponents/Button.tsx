import React from "react";

interface Props {
  className: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ className, children, onClick }: Props) => {
  return <button className={className} onClick={onClick}>{children}</button>;
};

export default Button;
