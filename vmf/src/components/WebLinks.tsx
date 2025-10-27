import React, { useState } from "react";
import Card from "./ui/Card";
import TextField from "./ui/TextField";
import InputBoxModal from "./ui/InputBox";
import { Pen, X, Plus, ExternalLink } from "lucide-react";
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
    <div className="flex justify-center items-center w-full h-full px-4 py-8 relative">
      {/* Modern Links Container */}
      <div
        className={cn(
          "w-full max-w-4xl bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-slate-200/50",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Social Links</h2>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-slate-500 font-medium">
              {socialProp.length} {socialProp.length === 1 ? 'link' : 'links'}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Link</span>
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {socialProp.length > 0 ? (
            socialProp.map((item, index) => (
              <div
                key={index}
                className="group relative bg-slate-50/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-200/50 hover:border-indigo-200/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Content */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">
                        {item.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-800 text-lg truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 truncate">{item.link}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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

                {/* Link Button */}
                <a
                  href={item.link.startsWith('http') ? item.link : `https://${item.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
                >
                  <span>Visit Link</span>
                  <ExternalLink size={14} />
                </a>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <ExternalLink className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No links yet</h3>
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
