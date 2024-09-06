import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 9000,
  GOOGLE_SHEETS_ID: process.env.GOOGLE_SHEETS_ID || "",
  GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY
    ? JSON.parse(
        fs.readFileSync(path.resolve(process.env.GOOGLE_SHEETS_API_KEY), "utf8")
      )
    : null,
};
