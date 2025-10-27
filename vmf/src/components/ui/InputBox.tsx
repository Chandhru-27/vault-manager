import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

interface FieldConfig {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  inputClassName?: string;
  labelClassName?: string;
}

interface InputBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  fields: FieldConfig[];
  className?: string;
  onClose?: () => void;
  onConfirm?: (values: Record<string, string>) => void;
  initialValues?: Record<string, string>;
}

interface InputBoxModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (values: Record<string, string>) => void;
  fields: FieldConfig[];
  initialValues?: Record<string, string>;
}

const InputBox: React.FC<InputBoxProps> = ({
  fields,
  className,
  onClose,
  onConfirm,
  initialValues,
}) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>(
    initialValues || {}
  );

  useEffect(() => {
    if (initialValues) setInputValues(initialValues);
  }, [initialValues]);

  const handleChange = (name: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => (onConfirm ? onConfirm(inputValues) : null);

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-8 bg-[#cfad96] w-[700px] min-h-[380px] relative rounded-3xl border-3 shadow-2xl border-[#1B3C53] p-8",
        className
      )}
    >
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col w-full items-center gap-2">
          <div className="flex flex-col">
            {field.label && (
              <label
                htmlFor={field.name}
                className={cn(
                  "text-xl font-semibold text-[#1B3C53] px-2 pb-2",
                  field.labelClassName
                )}
              >
                {field.label}
              </label>
            )}
            <input
              id={field.name}
              name={field.name}
              type={field.type || "text"}
              placeholder={field.placeholder || ""}
              required={field.required}
              value={inputValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={cn(
                "w-[580px] bg-[#D2C1B6] rounded-2xl h-20 border-3 placeholder-gray-500 placeholder:font-medium border-[#1B3C53] shadow-xl px-8 text-2xl text-[#003459] font-serif focus:outline-none focus:ring-2 focus:ring-[#1B3C53]",
                field.inputClassName
              )}
            />
          </div>
        </div>
      ))}
      <div className="flex gap-5">
        <button
          onClick={onClose}
          className="bg-[#1a2b37] text-[#D2C1B6] px-8 py-2 rounded-3xl hover:bg-[#d3d3d3] hover:text-[#1B3C53] transition-all duration-400"
        >
          Close
        </button>
        <button
          onClick={handleConfirm}
          className="bg-[#D2C1B6] text-[#1B3C53] px-5 py-2 rounded-3xl border-2 hover:bg-[#d3d3d3] hover:text-[#1B3C53]  transition-all duration-400"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

const InputBoxModal: React.FC<InputBoxModelProps> = ({
  isOpen,
  onClose,
  onConfirm,
  fields,
  initialValues,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <InputBox fields={fields} onClose={onClose} onConfirm={onConfirm} initialValues={initialValues}/>
      </div>
    </div>
  );
};

export default InputBoxModal;
