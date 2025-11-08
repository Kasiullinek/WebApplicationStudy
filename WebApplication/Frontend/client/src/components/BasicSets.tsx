import React, { useEffect, useState } from "react";
import { fetchBasicSets } from "../api/vocab"; 
import type { ISetDto } from "../interfaces/ISetDto";

const BasicSets: React.FC = () => {
  const [sets, setSets] = useState<ISetDto[]>([]);
  const [expandedSetIds, setExpandedSetIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSets = async () => {
      try {
        const data = await fetchBasicSets();
        setSets(data);
      } catch (err: any) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };

    loadSets();
  }, []);

  const toggleExpand = (setId: number) => {
    setExpandedSetIds(prev => prev.includes(setId) ? prev.filter(id => id !== setId) : [...prev, setId]
    );
  };

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
    <div className="max-w mx-auto p-4">
      <ul className="space-y-4">
        {sets.map((set, index) => (
          <li key={set.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
            <div className="flex justify-between items-center">
              <div>
                <p><span className="font-semibold">Zestaw {index + 1}:</span>{" "}</p>
                <p>Tytuł: {set.title}</p>
                <p className="text-gray-500 text-sm"> Utworzono: {new Date(set.createdAt).toLocaleDateString()}</p>
              </div>
              <button onClick={() => toggleExpand(set.id)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">{expandedSetIds.includes(set.id) ? "Zwiń listę" : "Rozwiń listę"}</button>
            </div>

            {expandedSetIds.includes(set.id) && (
              <ul className="mt-2 border-t pt-2">
                {set.rows.map(row => (
                  <li key={row.id} className="flex justify-between py-1 border-b last:border-b-0">
                    <span>{row.term}</span>
                    <span className="text-gray-600">{row.translation}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BasicSets;
