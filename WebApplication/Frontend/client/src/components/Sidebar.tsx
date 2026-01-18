import React from "react";
import type { IRow } from "../interfaces/RowInterface";
import type { SidebarProps } from "../interfaces/SidebarProps";

const Sidebar: React.FC<SidebarProps> = ({
  filteredSets,
  selectedSets,
  expandedSetIds,
  search,
  setSearch,
  toggleExpand,
  handleSelectSet,
  gameStarted
}) => {
  return (
    <div className="md:w-1/3 lg:w-1/4 border-r border-gray-200 p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-3">Zestawy</h2>
      <input type="text" placeholder="Szukaj zestawu..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full border rounded-lg p-2 mb-3"/>

      <div className="overflow-y-auto flex-1 space-y-2">
        {filteredSets.map((set) => {
          const isSelected = !!selectedSets.find((s) => s.id === set.id);
          const isExpanded = expandedSetIds.includes(set.id);

          return (
            <div key={set.id} className="border rounded-lg">
              {/* Nagłówek zestawu */}
              <div className={`flex justify-between items-center p-2 cursor-pointer rounded-lg border transition-colors duration-200 ${isSelected ? "bg-blue-100 border-blue-400 hover:bg-blue-200" : "border-gray-200 hover:bg-gray-100"}`} onClick={() => toggleExpand(set.id)}>
                <div className="flex flex-col">
                  <span className="font-medium">{set.title}</span>
                  <span className="text-gray-500 text-sm">{set.rows.length} słówek</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-500 hover:text-gray-700" onClick={(e) => { e.stopPropagation(); toggleExpand(set.id); }}> {isExpanded ? "▲" : "▼"}</button>
                  <input type="checkbox" checked={isSelected} onChange={() => handleSelectSet(set)} disabled={gameStarted} onClick={(e) => e.stopPropagation()} style={{ transform: "scale(1.5)" }}/>
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
  );
};
export default Sidebar;
