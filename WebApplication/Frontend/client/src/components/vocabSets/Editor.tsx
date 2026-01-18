import React from "react";
import type { VocabEditorProps } from "../../interfaces/VocabEditorProps";

const Editor: React.FC<VocabEditorProps> = ({
    editedSet,
    editLoading,
    setEditedSet,
    onSaveSet,
    saveLoading,
    }) => {
    if (!editedSet && !editLoading) {
        return (
        <div className="flex items-center justify-center h-full text-gray-400"> Wybierz zestaw do edycji</div>
        );
    }

    if (editLoading) {
        return (
        <div className="flex items-center justify-center h-full"> Ładowanie zestawu...</div>
        );
    }
    return (
        <div className="max-w-3xl w-full mx-auto bg-white rounded-lg shadow p-6">
            {/* Tytuł */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-1">Tytuł zestawu</label>
                <input type="text" value={editedSet!.title} onChange={(e) =>setEditedSet({...editedSet!, title: e.target.value,})} className="w-full border rounded-lg p-2"/>
            </div>
            {/* Lista słówek */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Słówka</h3>
                <div className="space-y-2">
                {editedSet!.rows.map((row, index) => (
                    <div key={row.id} className="grid grid-cols-2 gap-4">
                    <input type="text" value={row.term} onChange={(e) => {const newRows = [...editedSet!.rows]; newRows[index] = {...newRows[index],term: e.target.value,}; setEditedSet({...editedSet!, rows: newRows,});}} className="border rounded-lg p-2"/>
                    <input type="text" value={row.translation} onChange={(e) => {const newRows = [...editedSet!.rows]; newRows[index] = {...newRows[index],translation: e.target.value,}; setEditedSet({...editedSet!, rows: newRows,});}} className="border rounded-lg p-2"/>
                    </div>
                ))}
                </div>
            </div>
            {/* Zapisz zmiany */}
            <div className="mt-6 flex justify-end">
                <button onClick={onSaveSet} disabled={saveLoading} className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
                {saveLoading ? "Zapisywanie..." : "Zapisz zmiany"}
                </button>
            </div>
        </div>
    );
};
export default Editor;

