import { Menu, Home } from "lucide-react";
import { useState } from "react";
import Sidebar from "./SideBar";

const Header = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const handleChange = () => {
    setNavOpen(!isNavOpen);
  };

  const NavBarModal = () => {
    return (
      <div
        className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm"
        onClick={handleChange}
      >
        <div className="w-full h-fit">
          <Sidebar />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="relative top-0 left-0 right-0 z-40 backdrop-blur-md bg-[#7b7b7b] border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 sm:w-9 sm:h-9 bg-[#016B61] rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#d4ffee]">
                Vault Manager
              </h1>
            </div>

            {/* Menu Icon */}
            <button
              onClick={handleChange}
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {isNavOpen && <NavBarModal />}
    </>
  );
};

export default Header;
