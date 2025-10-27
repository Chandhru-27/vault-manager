const NavLinks = ["Home", "Vault", "Log out"];

const Sidebar = () => {
  return (
    <div className="bg-[#1B3C53] w-full h-full text-center rounded-b-[80px]  z-0 transition-all duration-300">
      <ul className="py-12 w-full space-y-5 text-nav">
        {NavLinks.map((value) => (
          <li key={Math.random()}>
            <a className="hover:underline tracking-wider transition-all duration-300">
              {value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
