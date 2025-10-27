import React from "react";

interface ViewBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  value?: string;
  onClose?: () => void;
  
}   

const ViewBox: React.FC<ViewBoxProps> = ({
  title = "Title",
  value = "Value",
}) => {
  return (
    <div
      className="flex flex-col sm:flex-row justify-start items-start sm:items-center 
                 text-myfont gap-4 bg-[#cfad96] w-full max-w-[900px] min-h-[100px] 
                 relative rounded-3xl border-3 shadow-2xl border-[#1B3C53] p-6 sm:p-8 
                 overflow-hidden mx-auto"
    >
      <div
        className="bg-[#daedfa] text-myfont text-xl sm:text-2xl font-semibold 
                   px-4 sm:px-6 py-2 border-2 border-[#1B3C53] rounded-2xl 
                   shrink-0"
      >
        {title}:
      </div>

      <div
        className="bg-[#daedfa] text-myfont text-lg sm:text-2xl font-medium 
                   px-4 sm:px-6 py-2 border-2 border-[#1B3C53] rounded-2xl 
                   overflow-x-auto whitespace-nowrap scrollbar-hide
                   scrollbar-thumb-[#1B3C53] scrollbar-track-[#b8cbd8] 
                    w-[900px] sm:max-w-[700px]"
      >
        {value
          ? value
          : "Various educators teach rules governing the length of paragraphs. They may say that a paragraph should be 100 to 200 words long, or be no more than five or six sentences. But a good paragraph should not be measured in characters, words, or sentences. The true measure of your paragraphs should be ideas."}
      </div>
    </div>
  );
};

const ViewBoxModal: React.FC<ViewBoxProps> = ({title, value, onClose,}) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ViewBox title={title} value={value} />
      </div>
    </div>
  );
};

export default ViewBoxModal;
