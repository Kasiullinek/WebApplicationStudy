import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { IRow } from "../../interfaces/RowInterface";
import { useUserSets } from "../../hooks/useUserSets";

const Read: React.FC = () => {
  const {
    loading,
    error,
    sets,
    expandedSetIds,
    search,
    setSearch,
    toggleExpand,
    filteredSets,
    editedSet,
    editLoading,
    onEditSet
    } = useUserSets();

  if (loading) {
  return <p>Ładowanie zestawów...</p>;
  }
  if (error) {
    return <p className="text-red-500">Błąd: {error}</p>;
  }
  if (sets.length === 0) {
    return <p>Brak zestawów do wyświetlenia.</p>;
  }

  return ( 
    <div className="min-h-screen flex flex-col bg-white">
      {/* Nagłówek */}
      <Header/>

      {/* Zawartość strony */}
      <div className="flex flex-col md:flex-row h-screen bg-gray-50">
        {/* Panel boczny */}
        <div className="md:w-1/3 lg:w-1/4 border-r border-gray-200 p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-3">Moje Zestawy</h2>
          <input type="text" placeholder="Szukaj zestawu..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full border rounded-lg p-2 mb-3"/>
    
          <div className="overflow-y-auto flex-1 space-y-2">
            {filteredSets.map((set) => {
              const isExpanded = expandedSetIds.includes(set.id);
    
              return (
                <div key={set.id} className="border rounded-lg">
                  {/* Nagłówek zestawu */}
                  <div className={`flex justify-between items-center p-2 cursor-pointer rounded-lg border transition-colors duration-200`} onClick={() => toggleExpand(set.id)}>
                    {/* Lewa strona */}
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{set.title}</span>
                        <span className="text-gray-500 text-sm">
                          {set.rows.length} słówek
                        </span>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700" onClick={(e) => {e.stopPropagation();toggleExpand(set.id);}}>
                        {isExpanded ? "▲" : "▼"}
                      </button>
                    </div>
                    {/* Prawa strona */}
                    <div className="flex items-center gap-2">
                      <button className="text-blue-500 hover:text-blue-700 text-sm" onClick={(e) => {e.stopPropagation(); onEditSet(set.id);}}>Edytuj</button>
                    </div>
                  </div>
                  {/* Lista słówek */}
                  {isExpanded && (
                    <ul className="p-2 pl-6 space-y-1 bg-gray-50 border-t border-gray-200">
                      {set.rows.map((row: IRow) => (
                        <li key={row.id} className="text-sm text-gray-700">{row.term} → {row.translation}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Główne okno */}
        <div className="flex-1 flex flex-col p-6 overflow-y-auto">
            {!editedSet && (
            <div className="flex items-center justify-center h-full text-gray-400">
              Wybierz zestaw do edycji
            </div>
          )}
          {editLoading && (
            <div className="flex items-center justify-center h-full">
              Ładowanie zestawu...
            </div>
          )}

          {editedSet && !editLoading && (
            <div className="max-w-3xl w-full mx-auto bg-white rounded-lg shadow p-6">
              {/* Tytuł */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-1">Tytuł zestawu</label>
                <input type="text" value={editedSet.title} className="w-full border rounded-lg p-2" readOnly/>
              </div>
              {/* Lista słówek */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Słówka</h3>
                <div className="space-y-2">
                  {editedSet.rows.map((row) => (
                    <div key={row.id} className="grid grid-cols-2 gap-4">
                      <input type="text" value={row.term} className="border rounded-lg p-2" readOnly/>
                      <input type="text" value={row.translation} className="border rounded-lg p-2" readOnly/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stopka */}
      <Footer/>
    </div>
  );
};
export default Read;

