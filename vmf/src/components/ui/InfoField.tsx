import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Pen, X, Eye } from "lucide-react"; // optional icons
import ViewBoxModal from "./ViewModal";

interface InfoFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  value?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

const InfoField: React.FC<InfoFieldProps> = ({
  className,
  title,
  value,
  onEdit,
  onDelete,
  onView,
  ...props
}) => {

 
  return (
    <div
      className={cn("h-fit w-full flex flex-col gap-3 text-[22px]", className)}
      {...props}
    >
      <p className="text-myfont px-2 font-bold text-2xl tracking-wide">
        {title}:
      </p>

      <div
        className="w-full bg-[#D2C1B6] rounded-2xl h-fit p-4 border-3 border-[#001965]
                   shadow-xl text-2xl text-[#003459] flex items-center justify-between gap-4"
      >
        <p className="text-myfont text-[#001735] font-light truncate flex-1 min-w-0">
          {value}
        </p>

        <div className="flex items-center gap-3 shrink-0">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-[#001965] hover:text-[#00af3d] transition"
            >
              <Pen size={24} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-[#001965] hover:text-[#a30000] transition"
            >
              <X size={24} />
            </button>
          )}
          {onView && (
            <button
              onClick={onView}
              className="text-[#001965] hover:text-[#a30000] transition"
            >
            <Eye size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoField;
