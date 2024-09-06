# Island Water Flow Analysis

## Objective

Develop a system to determine the number of grid cells in various topographical scenarios of an island where water can flow down to both the island's northwest and southeast edges. This information is presented in a grid format within a Google Sheet.

## Project Requirements

### 1. Data Retrieval

- Access a Google Sheet containing multiple tabs, each representing a different grid setup of the island's terrain.
- The Google Sheet must be read in real-time during code execution.
- Each cell in the grid represents the elevation at a geographic point, with the northwest and southeast edges of the grid adjacent to two different oceans.

### 2. Algorithmic Solution

- Implement an algorithm to identify cells from which water can flow to both oceans.
- Water can flow from a higher or equal height cell to an adjacent lower or equal height cell.
- Calculate the number of cells that have a direct or indirect flow path to both the northwest and southeast edges.

### 3. Output

- Create a web application where users can select a scenario (a tab from the Google Sheet).
- Display the number of qualifying cells and their coordinates.
- Results should dynamically update based on the user's selection.

## Setup Instructions

### 1. Clone the repository and navigate to the project directory:

    git clone <repository_url>
    cd codebase

### 2. Run backend

1. Create googleapis service account and on `cloud.google` and store in `key.json` file
2. Setup `env vars`:
   `PORT=9000`
   ` GOOGLE_SHEETS_ID=`
   `GOOGLE_SHEETS_API_KEY=./key.json`

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Run the application:

   ```bash
   npm run dev
   ```

### 3. Run frontend

1. Setup env vars:
   `REACT_APP_API_URL=http://localhost:9000`

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm start
   ```

### 4. Open the application in your browser to interact with the grid scenarios and view the results.

## Key Features

- Real-time data retrieval from Google Sheets.
- Dynamic visualization of water flow paths in a grid format.
- User-friendly interface to select different scenarios and view results instantly.
