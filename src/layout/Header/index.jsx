import logo from "../../assets/logo.svg";
function Header() {
  return (
    <div className="flex gap-5 justify-between px-10 w-full text-lg leading-7 text-center text-gray-500 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <img src={logo} className=" w-80 hover:cursor-pointer" />
    </div>
  );
}

export default Header;
