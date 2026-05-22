import { useState } from "react";
import { NavLink } from "react-router";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "underline" : "";

export default function Navbar() {
  return (
    <nav className="flex gap-5 font-bold text-3xl p-4 bg-gray-200">
      <NavLink to="/" className={linkClass}>
        UI Junkyard
      </NavLink>
      <NavbarDropdown />
    </nav>
  );
}

function NavbarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 -960 960 960"
          width="40px"
          fill="#000000"
        >
          <path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z" />
        </svg>
      </button>
      <div
        className={isOpen ? "absolute w-full left-0 p-2 bg-blue-600" : "hidden"}
      >
        <ul>
          <p className="underline font-black">Applications</p>
          <li className="font-medium">
            <NavLink to="/app/todo">Todo Page</NavLink>
          </li>
        </ul>
        <ul>
          <p className="underline font-black">Fake Websites</p>
          <li className="font-medium">
            <NavLink to="/fakeweb/weather">Weather Page</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
