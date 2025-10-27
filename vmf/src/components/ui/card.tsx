import * as React from "react";
import { cn } from "../../lib/utils";

interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<InputProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "bg-[#333333] w-[350px] h-[450px] shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
