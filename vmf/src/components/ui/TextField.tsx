import React from "react";
import { cn } from "../../lib/utils";

interface TextFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  hyperLink?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  className,
  title,
  hyperLink,
  ...props
}) => {
  const normalizedLink =
    hyperLink && !hyperLink.startsWith("http")
      ? `https://${hyperLink}`
      : hyperLink;

  return (
    <div
      className={cn("h-fit w-full flex gap-3 text-[22px]", className)}
      {...props}
    >
      <p className="font-bold">{title}:</p>
      {normalizedLink ? (
        <a
          href={normalizedLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {hyperLink}
        </a>
      ) : (
        <span>-</span>
      )}
    </div>
  );
};

export default TextField;
