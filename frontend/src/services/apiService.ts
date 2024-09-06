import axios from "axios";

interface Cell {
  row: number;
  col: number;
}

export interface SheetTab {
  id: string;
  title: string;
}

export interface FlowingCell {
  count: number;
  cells: Cell[];
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getSheets = async (): Promise<SheetTab[]> => {
  const response = await api.get<SheetTab[]>("/api/sheets");
  return response.data;
};

export const getFlowingCells = async (
  sheetId: string
): Promise<FlowingCell> => {
  const response = await api.get<FlowingCell>(`/api/sheets/${sheetId}`);
  return response.data;
};
