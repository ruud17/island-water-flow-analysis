export interface SheetTab {
  id: string;
  title: string;
}

export interface Cell {
  row: number;
  col: number;
}

export interface FlowingCellsResponse {
  count: number;
  cells: Cell[];
}
