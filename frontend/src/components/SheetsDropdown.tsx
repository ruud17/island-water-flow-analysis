import React, { useEffect, useState } from "react";
import { getSheets, SheetTab } from "../services/apiService";

interface SheetsDropdownProps {
  onSelectSheet: (sheetId: string) => void;
}

const SheetsDropdown: React.FC<SheetsDropdownProps> = ({ onSelectSheet }) => {
  const [sheets, setSheets] = useState<SheetTab[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>("");

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const sheetsData = await getSheets();
        setSheets(sheetsData);
      } catch (error) {
        console.error("Error fetching sheets:", error);
      }
    };

    fetchSheets();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sheetId = event.target.value;
    setSelectedSheet(sheetId);
    onSelectSheet(sheetId);
  };

  return (
    <div>
      <label htmlFor="sheetsDropdown">Select a sheet:</label>
      <select
        id="sheetsDropdown"
        value={selectedSheet}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          Select a sheet
        </option>
        {sheets.map((sheet) => (
          <option key={sheet.id} value={sheet.id}>
            {sheet.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SheetsDropdown;
