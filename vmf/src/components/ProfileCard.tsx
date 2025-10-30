import React, { useEffect, useRef, useState } from "react";
import Card from "./ui/Card";
import { UserRoundPen, Plus, Pen } from "lucide-react";
import UserProfile, { getUserProfile } from "../lib/api/user";
import { cn } from "../lib/utils";

interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ className }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const displayImage = preview || user?.profileImage || null;

  return (
    <div className="flex flex-wrap justify-center  items-center w-full h-full px-2 py-0">
      {/* Modern Profile Card */}
      <div
        className={cn(
          "relative flex w-full h-[40vh] bg-white/70  backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl border-2  border-black/40 transition-all duration-300 hover:-translate-y-1 ",
          className
        )}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 to-blue-50/50 rounded-3xl"></div>

        <div className="relative flex flex-col sm:flex-row gap-10  items-center text-center">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full overflow-hidden bg-linear-to-br from-slate-200 to-slate-300 flex justify-center items-center group ring-4 ring-indigo-100 hover:ring-indigo-200 transition-all duration-300">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt="User"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <UserRoundPen size={64} className="text-slate-400" />
              )}

              <button
                onClick={handleUploadClick}
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                {displayImage ? (
                  <Pen strokeWidth={1.5} size={40} color="white" />
                ) : (
                  <Plus strokeWidth={1.5} size={40} color="white" />
                )}
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight">
              {user?.userName || "User Name"}
            </h1>
            <p className="text-md text-slate-600 font-medium">
              {user?.profession || "Profession"}
            </p>
            <p className="text-sm text-slate-500">
              {user?.city || "City"}, {user?.state || "State"}
            </p>
          </div>
          
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-linear-to-br from-indigo-200/30 to-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-linear-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

export default ProfileCard;
