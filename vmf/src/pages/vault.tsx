import React, { useState } from "react";
import Card from "../components/ui/Card";
import InfoField from "../components/ui/InfoField";
import InputBoxModal from "../components/ui/InputBox";
import { cn } from "../lib/utils";
import ViewBoxModal from "../components/ui/ViewModal";
import { Eye, EyeOff, Plus, Edit, Trash2, Lock } from "lucide-react";

const Vault = ({ className }: { className?: string }) => {
  const [passwords, setPasswords] = useState<
    { website: string; username: string; password: string }[]
  >([]);

  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewItem, setViewItem] = useState<{ website: string; username: string; password: string } | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<Set<number>>(new Set());

  const handleView = (item: { website: string; username: string; password: string }) => {
    setViewItem(item);
    setIsViewOpen(!isViewOpen);
  };

  const handleConfirm = (values: Record<string, string>) => {
    const { website, username, password } = values;

    if (!website || !username || !password) return;

    if (editingItem !== null) {
      setPasswords((prev) => {
        const updatedPasswords = [...prev];
        updatedPasswords[editingItem] = { website, username, password };
        return updatedPasswords;
      });

      setEditingItem(null);
    } else {
      setPasswords((prev) => [...prev, { website, username, password }]);
    }

    setIsModalOpen(false);
  };

  const handleUpdate = (index: number) => {
    setEditingItem(index);
    setIsModalOpen(true);
  };

  const handleRemove = (website: string, username: string, password: string) => {
    setPasswords((prev) =>
      prev.filter((item) => !(item.website === website && item.username === username && item.password === password))
    );
  };

  const togglePasswordVisibility = (index: number) => {
    setVisiblePasswords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-linear-to-br from-slate-100/20 to-blue-100/20"></div>
      </div>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-linear-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Password Vault
              </h1>
            </div>
            <div className="text-sm text-slate-500 font-medium">
              {passwords.length} {passwords.length === 1 ? 'entry' : 'entries'}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Floating Add Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-6 right-6 z-30 w-14 h-14 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          >
            <Plus className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Password Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {passwords.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No passwords yet</h3>
                <p className="text-slate-500 text-center max-w-sm">
                  Start building your secure password vault by adding your first entry.
                </p>
              </div>
            ) : (
              passwords.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-200/50 hover:border-indigo-200/50 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {item.website.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 text-lg truncate max-w-[180px]">
                          {item.website}
                        </h3>
                        <p className="text-sm text-slate-500">Website</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleUpdate(index)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleRemove(item.website, item.username, item.password)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={() => handleView(item)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                        Username
                      </p>
                      <p className="text-slate-700 font-medium truncate">{item.username}</p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                        Password
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="text-slate-700 font-mono flex-1">
                          {visiblePasswords.has(index) ? item.password : '••••••••'}
                        </p>
                        <button
                          onClick={() => togglePasswordVisibility(index)}
                          className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                        >
                          {visiblePasswords.has(index) ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <InputBoxModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onConfirm={handleConfirm}
        fields={[
          { name: "website", label: "Website", placeholder: "eg: google.com" },
          { name: "username", label: "Username", placeholder: "eg: user@example.com" },
          { name: "password", label: "Password", placeholder: "eg: mySecurePass123", type: "password" },
        ]}
        initialValues={
          editingItem !== null ? passwords[editingItem] : undefined
        }
      />
      {isViewOpen && viewItem && (
        <ViewBoxModal
          title={viewItem.website}
          value={`Username: ${viewItem.username}\nPassword: ${viewItem.password}`}
          onClose={() => setIsViewOpen(false)}
        />
      )}
    </div>
  );
};

export default Vault;
