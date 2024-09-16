import React, { ReactNode, HTMLAttributes } from "react";
import "./Typography.css";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "center" | "inherit" | "justify" | "left" | "right";
  size?: "bold" | "normal";
  color?: "default" | "primary" | "secondary" | "error";
}

const Typography = ({
  children,
  variant = "h1",
  align = "left",
  color = "default",
  size = "normal",
  ...props
}: Props) => {
  return (
    <h1 {...props} className={`${variant} ${align} ${color} ${size}`}>
      {children}
    </h1>
  );
};

export default Typography;
