import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from '../api/auth';

const Header: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const readRole = () => {
      const userData = localStorage.getItem('user');
      if (!userData) {
        setRole(null);
        return;
      }
      try {
        const parsed = JSON.parse(userData);
        console.log("Console Log zalogowany użytkownik:", parsed);

        let r: any = null;
        if (parsed && typeof parsed === 'object') {
          r =
            parsed.role ??
            parsed.Role ??
            (Array.isArray(parsed.roles) ? parsed.roles[0] : parsed.roles) ??
            parsed['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ??
            parsed.userName ??
            parsed.sub ??
            null;
        } else if (typeof parsed === 'string') {
          r = parsed;
        }
        setRole(r);
      } catch {
        setRole(null);
      }
    };

    // read on mount and when location changes (after navigate)
    readRole();

    // listen to storage changes (other tabs)
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'user') readRole();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [location]);

    const handleLogout = () => {
        logout();
        setRole(null);
        navigate('/'); // przekierowanie po wylogowaniu
  };     
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-4">
        <a href="#" className="flex items-center mb-2 md:mb-0 text-gray-900 no-underline">
          <h2 className="text-2xl font-semibold">Aplikacja Internetowa</h2>
        </a>

        <ul className="flex flex-col md:flex-row gap-2 md:gap-6 text-center">
          <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">Strona główna</a></li>
          <li><a href="#about" className="text-gray-800 hover:text-blue-600 transition">O stronie</a></li>
          <li><a href="#instructions" className="text-gray-800 hover:text-blue-600 transition">Instrukcje</a></li>
          <li><a href="#avaiable-games" className="text-gray-800 hover:text-blue-600 transition">Gry</a></li>

          {/* Różne sekcje w zależności od roli */}
          {role === "Admin" && (
            <li><Link to="/admin-panel" className="text-red-600 hover:text-red-700 transition">Panel Admina</Link></li>
          )}
          {role === "User" && (
            <li><Link to="/user-vocabulary-sets" className="text-green-600 hover:text-green-700 transition">Moje Zestawy</Link></li>
          )}
        </ul>

        <div className="flex space-x-2 mt-3 md:mt-0">
          {/* Jeśli zalogowany */}
          {role ? (
            <>
              <span className="text-gray-700 flex items-center">Zalogowano jako: <b className="ml-1">{role}</b></span>
              <button onClick={handleLogout} className="border border-red-600 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition text-center"> Wyloguj </button>
            </>
          ) : (
            <>
              <Link to="/login" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition text-center">Zaloguj się</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-center">Zarejestruj</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;

