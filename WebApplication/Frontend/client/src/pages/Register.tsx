import { Link} from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';

const Register: React.FC = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        handleSubmit,
    } = useRegister();
    
        return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg w-96">
                <h2 className="text-2xl mb-4 font-bold text-center">Zarejestruj się</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Wprowadź swój adres e-mail"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Wprowadź swoje hasło"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Wprowadź ponownie swoje hasło"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required/>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Utwórz konto</button>
                <Link to="/login" className="w-full mt-3 border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition text-center block">Masz już konto? Zaloguj się</Link>
            </form>
        </div>
    )
}
export default Register