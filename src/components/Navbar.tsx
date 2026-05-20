import { NavLink } from "react-router";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "underline" : "";

export default function Navbar() {
  return (
    <nav className="flex justify-center gap-5 font-bold text-3xl p-4">
      <NavLink to="/" className={linkClass}>
        Main Page
      </NavLink>
      <NavLink to="/todo" className={linkClass}>
        Todo Page{" "}
      </NavLink>
    </nav>
  );
}
