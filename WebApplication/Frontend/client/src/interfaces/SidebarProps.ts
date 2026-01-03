import type { ISet } from './SetInterface';

export interface SidebarProps {
  filteredSets: ISet[];
  selectedSets: ISet[];
  expandedSetIds: number[];
  search: string;
  setSearch: (value: string) => void;
  toggleExpand: (id: number) => void;
  handleSelectSet: (set: ISet) => void;
  gameStarted: boolean;
}