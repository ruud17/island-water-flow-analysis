import { Request, Response, NextFunction } from "express";
import GoogleSheetsService from "../services/GoogleSheetsService";

class GoogleSheetsController {
  private googleSheetsService: GoogleSheetsService;

  constructor() {
    this.googleSheetsService = new GoogleSheetsService();
  }

  public getSheets = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const tabs = await this.googleSheetsService.getSpreadsheetTabs();
      res.json(tabs);
    } catch (error) {
      next(error);
    }
  };

  public getFlowingCoordinatesFromSingleSheet = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const sheetId = parseInt(req.params.sheetId, 10);

    try {
      const gridData = await this.googleSheetsService.getFlowingCells(sheetId);
      res.json(gridData);
    } catch (error) {
      next(error);
    }
  };
}

export default GoogleSheetsController;
