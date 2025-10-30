import React, { useState } from "react";
import Card from "./ui/Card";
import TextField from "./ui/TextField";
import InputBoxModal from "./ui/InputBox";
import { Pen, X, Plus, ExternalLink, Link } from "lucide-react";
import { cn } from "../lib/utils";

const WebLinks = ({ className }: { className?: string }) => {
  const [socialProp, setSocialProp] = useState<
    { title: string; link: string }[]
  >([]);

  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = (values: Record<string, string>) => {
    const { title, link } = values;

    if (!title || !link) return;

    if (editingItem !== null) {
      setSocialProp((prev) => {
        const updated = [...prev];
        updated[editingItem] = { title, link };
        return updated;
      });
      setEditingItem(null);
    } else {
      setSocialProp((prev) => [...prev, { title, link }]);
    }

    setIsModalOpen(false);
  };

  const handleUpdate = (index: number) => {
    setEditingItem(index);
    setIsModalOpen(true);
  };

  const handleRemove = (title: string, link: string) => {
    setSocialProp((prev) =>
      prev.filter((item) => !(item.title === title && item.link === link))
    );
  };

  return (
    <div className="w-full h-full pl-2 relative overflow-y-a">
      {/* Modern Links Container */}
      <div
        className={cn(
          " w-[39vw] max-w-4xl h-[60vh] bg-white/70 backdrop-blur-sm rounded-3xl p-4 shadow-lg border-2 border-black/40",
          className
        )}
      >
        {/* Header */}
        <div className="flex flex-row items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-800">
              Social Links
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#bce4e0] rounded-full p-2 "
            >
              <Plus size={24} color="#016B61" />
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className=" md:grid-cols-2">
          {socialProp.length > 0 ? (
            socialProp.map((item, index) => (
              <div
                key={index}
                className="group relative bg-slate-50/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-200/50 hover:border-indigo-200/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Content */}
                <div className="flex flex-col w-full items-start justify-between mb-4">
                  <div className="flex  justify-center items-center space-x-3 flex-1 min-w-0">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-linear-to-r from-indigo-400 to-blue-400 rounded-lg flex  items-center justify-center shrink-0">
                      <span className="text-white font-bold text-xs">
                        {item.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 relative">
                      <h3 className="font-semibold text-slate-800 text-lg truncate">
                        {item.title}
                      </h3>
                      <a
                        href={
                          item.link.startsWith("http")
                            ? item.link
                            : `https://${item.link}`
                        }
                        target="_blank"
                        className="text-sm flex gap-2 bg-black/10 text-blue-600 underline p-2 border-2 border-gray-400 rounded-2xl text-wrap truncate"
                      >
                        {/* Show actual link only on large screens (lg: and above) */}
                        <span className="hidden lg:inline ">{item.link}</span>

                        {/* Show “Visit Link” only on small and medium screens */}
                        <span className="inline  lg:hidden">Visit Link</span>
                      </a>
                    </div>
                  </div>

                  {/* Action Buttons */}
             
                  <div className="absolute top-2 right-2 flex flex-row gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <button
                      onClick={() => handleUpdate(index)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Pen size={16} />
                    </button>
                    <button
                      onClick={() => handleRemove(item.title, item.link)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <ExternalLink className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-600 mb-2">
                No links yet
              </h3>
              <p className="text-slate-500 text-center max-w-sm">
                Add your first social link to get started.
              </p>
            </div>
          )}
        </div>
      </div>

      <InputBoxModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onConfirm={handleConfirm}
        fields={[
          { name: "title", label: "Title", placeholder: "Enter link title" },
          { name: "link", label: "URL", placeholder: "Enter link URL" },
        ]}
        initialValues={
          editingItem !== null ? socialProp[editingItem] : undefined
        }
      />
    </div>
  );
};

export default WebLinks;
