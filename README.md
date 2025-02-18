# Mall Inventory Management App  

## Overview  
The **Mall Inventory Management App** is a full-stack application that helps manage inventory efficiently. It consists of three main components:  

- **Client** (Frontend) – React-based application  
- **Server** (Backend) – Node.js with Express  
- **FastAPI** (ML Model/API) – Python FastAPI backend  

## Project Structure
Mall Inventory Management App/

├── client/    # React frontend

├── server/    # Node.js backend 

├── fastapi/   # Python FastAPI backend

└── README.md  # Documentation

## Prerequisites
Ensure you have the following installed:
- **Node.js & npm** – [Download](https://nodejs.org/)
- **Python 3** – [Download](https://www.python.org/)
- **Virtual Environment (venv) for Python**

## Installation & Setup

### 1️⃣ Setup & Run Client (Frontend)
1. Navigate to the client folder:
   ```sh
   cd client
   ```

2. Install the necessary dependencies:
   ```sh
   npm install
   ```

3. Run the client:
   ```sh
   npm run dev
   ```
   The frontend will be accessible at `http://localhost:3000`.

### 2️⃣ Setup & Run Server (Backend)
1. Navigate to the `server` folder:
   ```sh
   cd server
   ```

2. Install the necessary dependencies:
   ```sh
   npm install
   ```

3. Run the server:
   ```sh
   nodemon server.js
   ```
   The backend will be accessible at `http://localhost:5000`.

### 3️⃣ Setup & Run FastAPI (ML API)

#### 🔹 Download & Setup the ML Model
* Download the ML Model from Google Drive: 📥 **[ML Model Drive Link]** (add your drive link here)
* Create a folder named `ml_models` inside the `fastapi` directory:
  ```sh
  mkdir fastapi/ml_models
  ```
* Paste the downloaded model file inside the `ml_models` folder.

#### 🔹 Install Dependencies & Run FastAPI
1. Navigate to the `fastapi` directory:
   ```sh
   cd fastapi
   ```

2. Create a virtual environment for Python:
   ```sh
   python3 -m venv venv # Create a virtual environment
   ```

3. Activate the environment:
   * **For macOS/Linux**:
     ```sh
     source venv/bin/activate
     ```
   * **For Windows**:
     ```sh
     venv\Scripts\activate
     ```

4. Install the necessary dependencies:
   ```sh
   pip install -r requirements.txt
   ```

5. Run the FastAPI server:
   ```sh
   uvicorn fastapi_app:app --host 0.0.0.0 --port 5050 --reload
   ```
   The FastAPI server will be accessible at `http://localhost:5050`.

## Usage
1. Start all three servers in the following order:

   a. Start FastAPI server:
   ```sh
   cd fastapi
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   uvicorn fastapi_app:app --host 0.0.0.0 --port 5050 --reload
   ```

   b. Start Node.js backend:
   ```sh
   cd server
   nodemon server.js
   ```

   c. Start React frontend:
   ```sh
   cd client
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
```
