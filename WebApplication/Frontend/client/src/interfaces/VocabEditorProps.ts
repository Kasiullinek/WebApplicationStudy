import type { ISet } from './SetInterface';

export interface VocabEditorProps {
  editedSet: ISet | null;
  editLoading: boolean;
  saveLoading: boolean;
  setEditedSet: (set: ISet) => void;
  onSaveSet: () => void;
}