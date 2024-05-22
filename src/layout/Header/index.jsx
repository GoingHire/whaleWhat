import logo from "../../assets/logo.svg";
function Header() {
  return (
    <div className="w-full bg-black">
      <img src={logo} className="w-4" />
    </div>
  );
}

export default Header;
