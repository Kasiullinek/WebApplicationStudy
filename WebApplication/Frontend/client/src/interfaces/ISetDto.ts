import type { IRowDto } from "./IRowDto";

export interface ISetDto {
  id: number;
  title: string;
  createdAt: string;
  rows: IRowDto[];
}
