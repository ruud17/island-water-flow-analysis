import { google, sheets_v4 } from "googleapis";
import { config } from "../config/envVarHandler";
import { Cell, FlowingCellsResponse, SheetTab } from "../interfaces";

class GoogleSheetsService {
  private sheets: sheets_v4.Sheets;
  private apiKey: string;
  private spreadsheetId: string;

  constructor() {
    this.apiKey = config.GOOGLE_SHEETS_API_KEY;
    this.spreadsheetId = config.GOOGLE_SHEETS_ID;
    const auth = new google.auth.GoogleAuth({
      credentials: config.GOOGLE_SHEETS_API_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    this.sheets = google.sheets({ version: "v4", auth });
  }

  async getSpreadsheetTabs(): Promise<SheetTab[]> {
    try {
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
      });

      const tabs = response.data.sheets?.map((sheet) => ({
        id: sheet.properties?.sheetId?.toString() || "",
        title: sheet.properties?.title || "",
      }));

      return tabs || [];
    } catch (error) {
      console.error("Error fetching spreadsheet tabs:", error);
      throw error;
    }
  }

  async getFlowingCells(sheetId: number): Promise<FlowingCellsResponse> {
    try {
      const metadataResponse = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
      });

      const sheet = metadataResponse.data.sheets?.find(
        (sheet) => sheet.properties?.sheetId === sheetId
      );

      if (!sheet || !sheet.properties?.title) {
        throw new Error(`Sheet with ID ${sheetId} not found.`);
      }

      const sheetName = sheet.properties.title;

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: sheetName,
      });

      const mappedData = (response.data.values || []).map((row: string[]) =>
        row.map(Number)
      );

      const flowingCells = this.calculateFlowingCells(mappedData);

      return flowingCells;
    } catch (error) {
      console.error("Error fetching grid data:", error);
      throw error;
    }
  }

  // algorithm related code

  private calculateFlowingCells(gridData: number[][]): FlowingCellsResponse {
    const rowsLength = gridData.length;
    const columnsLength = gridData[0].length;

    if (rowsLength === 1 && columnsLength === 1) {
      return {
        count: 1,
        cells: [{ row: 0, col: 0 }],
      };
    }

    const NWBorderCells: Cell[] = [];
    const SEBorderCells: Cell[] = [];

    // Define NW border cells (top row and left column excluding last row)
    for (let i = 0; i < columnsLength; i++) {
      NWBorderCells.push({ row: 0, col: i }); // Top row
    }
    for (let j = 1; j < rowsLength - 1; j++) {
      NWBorderCells.push({ row: j, col: 0 }); // Left column excluding bottom-left corner
    }

    // Define SE border cells (bottom row and right column excluding first row)
    for (let k = 0; k < columnsLength; k++) {
      SEBorderCells.push({ row: rowsLength - 1, col: k }); // Bottom row
    }
    for (let m = 1; m < rowsLength - 1; m++) {
      SEBorderCells.push({ row: m, col: columnsLength - 1 }); // Right column excluding top-right corner
    }

    // Initialize reachability grids
    const NWReachable = Array.from({ length: rowsLength }, () =>
      Array(columnsLength).fill(false)
    );
    const SEReachable = Array.from({ length: rowsLength }, () =>
      Array(columnsLength).fill(false)
    );

    // Perform BFS from NW and SE borders
    this.bfs(NWBorderCells, NWReachable, rowsLength, columnsLength, gridData);
    this.bfs(SEBorderCells, SEReachable, rowsLength, columnsLength, gridData);

    // Find cells that can reach both NW and SE borders
    const resultCells: Cell[] = [];
    for (let row = 0; row < rowsLength; row++) {
      for (let col = 0; col < columnsLength; col++) {
        if (NWReachable[row][col] && SEReachable[row][col]) {
          resultCells.push({ row, col });
        }
      }
    }

    return {
      count: resultCells.length,
      cells: resultCells,
    };
  }

  private bfs(
    startCells: Cell[],
    reachable: boolean[][],
    rowsLength: number,
    columnsLength: number,
    gridData: number[][]
  ) {
    const directions = [
      [-1, 0],
      [1, 0], // up, down
      [0, -1],
      [0, 1], // left, right
    ];

    const queue: Cell[] = [...startCells];

    while (queue.length > 0) {
      const { row, col } = queue.shift()!;
      reachable[row][col] = true;

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 &&
          newRow < rowsLength &&
          newCol >= 0 &&
          newCol < columnsLength &&
          !reachable[newRow][newCol] &&
          gridData[newRow][newCol] >= gridData[row][col]
        ) {
          queue.push({ row: newRow, col: newCol });
        }
      }
    }
  }
}
export default GoogleSheetsService;
