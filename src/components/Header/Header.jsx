import logo from "../../images/Logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Лого проекта в шапке" className="header__logo" />
    </header>
  );
}
