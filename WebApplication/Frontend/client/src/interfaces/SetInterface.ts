import type { IRow } from "./RowInterface";

export interface ISet {
  id: number;
  title: string;
  createdAt: string;
  rows: IRow[];
}
