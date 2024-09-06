import React, { useState } from "react";
import SheetsDropdown from "./components/SheetsDropdown";
import FlowingCoordinates from "./components/FlowingCoordinates";

const App: React.FC = () => {
  const [selectedSheetId, setSelectedSheetId] = useState<string>("");

  const handleSelectSheet = (sheetId: string) => {
    setSelectedSheetId(sheetId);
  };

  return (
    <div>
      <h1>Google Sheets Flowing Cells</h1>
      <SheetsDropdown onSelectSheet={handleSelectSheet} />
      {selectedSheetId && <FlowingCoordinates sheetId={selectedSheetId} />}
    </div>
  );
};

export default App;
