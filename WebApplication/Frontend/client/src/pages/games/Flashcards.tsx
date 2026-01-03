import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { useFlashcards } from "../../hooks/useFlashcards";

const Flashcards: React.FC = () => {
  const {
    loading,
    error,
    selectedSets,
    expandedSetIds,
    search,
    setSearch,
    toggleExpand,
    handleSelectSet,
    gameStarted,
    handleStartGame,
    handleNextCard,
    handlePrevCard,
    handleRestart,
    showBack,
    setShowBack,
    currentIndex,
    rows,
    infoMessage,
    filteredSets
  } = useFlashcards();

  if (loading) {
    return <p>Ładowanie zestawów...</p>;
  }
  if (error){
    return <p className="text-red-500">Błąd: {error}</p>;
  } 
  if (filteredSets.length === 0) {
    return <p>Brak zestawów do wyświetlenia.</p>;
  }

return (
  <div className="min-h-screen flex flex-col bg-white">
    {/* Nagłówek */}
    <Header/>

      <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Panel boczny */}
      <Sidebar filteredSets={filteredSets} selectedSets={selectedSets} expandedSetIds={expandedSetIds} search={search} setSearch={setSearch} toggleExpand={toggleExpand} handleSelectSet={handleSelectSet} gameStarted={gameStarted}/>

      {/* Główne okno gry */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Wybrane zestawy */}
        {selectedSets.length > 0 && !gameStarted && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSets.map((set) => (
              <span key={set.id} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">{set.title}</span>
            ))}
          </div>
        )}

        {error && (<div className="text-red-500 mb-4 font-medium text-center"> {error} </div>)}

        {/* Główna zawartość */}
        {!gameStarted ? (
          <div className="text-center">
            {infoMessage ? (
              <p className="text-gray-500 mb-6">{infoMessage}</p>
            ) : (
              selectedSets.length > 0 && !gameStarted && (
                <Button className="px-6 py-2 text-lg rounded-xl" onClick={handleStartGame}> Rozpocznij</Button>
              )
            )}
          </div>
        ) : (
          <>
            {rows.length > 0 ? (
              <div className="flex flex-col items-center">
                <div className="w-80 h-48 cursor-pointer mb-6" style={{ perspective: "1000px" }} onClick={() => setShowBack(!showBack)}>
                  <div className="relative w-full h-full transition-transform duration-500"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: showBack ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* FRONT */}
                    <Card className="absolute w-full h-full flex items-center justify-center text-center bg-white shadow-xl rounded-2xl"
                      style={{ backfaceVisibility: "hidden" }}>
                      <CardContent>
                        <p className="text-xl font-semibold">
                          {rows[currentIndex].term}
                        </p>
                      </CardContent>
                    </Card>

                    {/* BACK */}
                    <Card className="absolute w-full h-full flex items-center justify-center text-center bg-white shadow-xl rounded-2xl rounded-2xl"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}>
                      <CardContent>
                        <p className="text-xl font-semibold">
                          {rows[currentIndex].translation}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button onClick={handlePrevCard} disabled={currentIndex <= 0}> Cofnij </Button>
                  <Button onClick={handleNextCard} disabled={currentIndex >= rows.length - 1}> Następne </Button>
                  <Button variant="outline" onClick={handleRestart}> Zakończ </Button>
                </div>
                <p className="text-gray-500 mt-3 text-sm"> {currentIndex + 1} / {rows.length}</p>
              </div>
            ) : (
              <p>Brak słówek w wybranych zestawach.</p>
            )}
          </>
        )}
      </div>
    </div>
    
      {/* Stopka */}
      <Footer/>
  </div>
  );
};

export default Flashcards


