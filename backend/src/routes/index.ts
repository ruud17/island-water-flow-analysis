import { Router } from "express";
import GoogleSheetsController from "../controllers/GoogleSheetsController";

const router = Router();
const googleSheetsController = new GoogleSheetsController();

router.get("/sheets", googleSheetsController.getSheets);
router.get(
  "/sheets/:sheetId",
  googleSheetsController.getFlowingCoordinatesFromSingleSheet
);

export default router;
