import React, { useEffect, useState } from "react";
import { getFlowingCells, FlowingCell } from "../services/apiService";

interface FlowingCoordinatesProps {
  sheetId: string;
}

const FlowingCoordinates: React.FC<FlowingCoordinatesProps> = ({ sheetId }) => {
  const [flowingCells, setFlowingCells] = useState<FlowingCell>({
    count: 0,
    cells: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFlowingCells = async () => {
      if (!sheetId) return;

      setLoading(true);
      try {
        const cellsData = await getFlowingCells(sheetId);
        setFlowingCells({
          count: cellsData.count,
          cells: cellsData.cells,
        });
      } catch (error) {
        console.error("Error fetching flowing cells:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlowingCells();
  }, [sheetId]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h3>Total Flowing Cells: {flowingCells.count}</h3>
          <ul>
            {flowingCells.cells.map((cell, index) => (
              <li key={index}>
                ({cell.col}, {cell.row})
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FlowingCoordinates;
