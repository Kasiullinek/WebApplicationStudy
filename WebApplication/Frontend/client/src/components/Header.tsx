import { Link} from "react-router-dom";
import { useUserRole } from "../hooks/useUserRole";
import { logout } from "../api/auth";
 
const Header: React.FC = () => {
  const { role } = useUserRole();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center mb-2 md:mb-0 text-gray-900 no-underline">
          <h2 className="text-2xl font-semibold">Aplikacja Internetowa</h2>
        </Link>

        <ul className="flex flex-col md:flex-row gap-2 md:gap-6 text-center">
          <li><Link to="/" className="text-gray-500 hover:text-blue-600 transition">Strona główna</Link></li>
          <li><Link to="/home#about" className="text-gray-800 hover:text-blue-600 transition">O stronie</Link></li>
          <li><Link to="/home#instructions" className="text-gray-800 hover:text-blue-600 transition">Instrukcje</Link></li>
          <li><Link to="/home#avaiable-games" className="text-gray-800 hover:text-blue-600 transition">Gry</Link></li>
          <li><Link to="/home#basic-sets"className="text-gray-800 hover:text-blue-600 transition">Zestawy</Link></li>

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
              <button onClick={() => {logout(); window.location.reload();}}className="border border-red-600 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition text-center"> Wyloguj </button>
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

