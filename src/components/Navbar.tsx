"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <a className="navbar-brand" href="#">
        Suraj localhost
      </a>
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
