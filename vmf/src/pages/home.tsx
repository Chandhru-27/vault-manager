import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import PersonalInfo from "../components/PersonalInfo";
import WebLinks from "../components/WebLinks";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-linear-to-br from-amber-100/50 to-orange-100/50"></div>
      </div>
      <Header />

      {/* Main Content */}
      <main className="pt-10 pb-8 px-4 sm:px-6 lg:px-4 min-h-[calc(100vh-5rem)]">
        <div className="max-w-screen mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 h-full">
            <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-0">
              <div className="flex-1 min-h-[300px]">
                <ProfileCard />
              </div>

              {/* Web Links */}
              <div className="flex-1 min-h-[300px]">
                <WebLinks />
              </div>
            </div>

            {/* Right Content - Personal Info */}
            <div className="lg:col-span-8">
              <div className="h-full">
                <PersonalInfo />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
