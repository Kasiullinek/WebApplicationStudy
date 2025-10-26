import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header/>

      {/* Main wrapper*/}
      <main className="w-full max-w-5xl mx-auto px-4">
        {/* About Section */}
        <section id="about" className="px-6 py-16 text-center bg-gray-50 flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4">O stronie</h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              Quickly design and customize responsive mobile-first sites with
              Tailwind, the world’s most popular utility-first CSS framework,
              featuring responsive grids, prebuilt components, and powerful
              customization options.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition inline-block text-center"> Utwórz konto</Link>
              <a href="#avaiable-games" className="border border-gray-400 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-100 transition inline-block text-center">Zagraj</a>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section id="instructions" className="px-6 py-16">
          <h2 className="text-3xl font-semibold border-b border-gray-200 pb-2 mb-10"> Instrukcje</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            { [
              {
                title: "Wybierz mini-grę",
                text: "Wybierz jedną z dostępnych gier i rozpocznij zabawę w naukę.",
              },
              {
                title: "Wybierz zestawy słówek",
                text: "Wybierz odpowiedni zestaw słówek dopasowany do poziomu trudności.",
              },
              {
                title: "Graj i powtarzaj",
                text: "Graj regularnie, by utrwalać nowo poznane słowa i poprawić pamięć.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 flex items-center justify-center text-3xl text-black font-semibold-">
                    {i + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Available Games */}
        <section id="avaiable-games" className="px-6 py-16">
          <h2 className="text-3xl font-semibold border-b border-gray-200 pb-2 mb-10"> Dostępne gry</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Fiszki",
                desc: "Szybkie powtórki słówek za pomocą fiszek.",
              },
              {
                title: "Memory",
                desc: "Trenuj pamięć, łącząc pasujące pary kart. Im szybciej je znajdziesz, tym lepszy wynik!",
              },
              {
                title: "Wisielec",
                desc: "Odgadnij ukryte słowo, zanim skończą się próby. Każda litera ma znaczenie!",
              },
              {
                title: "Bingo",
                desc: "Słuchaj, obserwuj i zaznaczaj! Znajdź słowa lub obrazy na planszy, zanim upłynie czas.",
              },
            ].map((game, i) => (
              <a key={i} href="#" className="group block bg-blue-600 text-white rounded-3xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform transform relative">
                <div className="flex flex-col h-full p-8">
                  <h3 className="text-2xl font-bold mb-3">{game.title}</h3>
                  <p className="text-white/90 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2">
                    {game.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 bg-gray-100">
        <div className="container mx-auto text-center text-gray-500"> Place sticky footer content here. </div>
      </footer>
    </div>
  );
}

export default Home
