import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState(""); // To store the input JSON
  const [responseData, setResponseData] = useState(null); // To store the API response

  const handleInputChange = (e) => {
    setJsonInput(e.target.value); // Update state as user types JSON
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput); // Parse the JSON input
      const response = await axios.post(
        "http://127.0.0.1:5000/bfhl",
        parsedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponseData(response.data); // Store the API response
    } catch (error) {
      console.error("Error sending JSON or invalid input:", error);
    }
  };

  return (
    <div>
      <h1>Send JSON Data with Axios</h1>
      <textarea
        placeholder="Enter JSON data here"
        value={jsonInput}
        onChange={handleInputChange}
        rows={5}
        cols={40}
      />
      <br />
      <button onClick={handleSubmit}>Send JSON</button>
      {responseData && (
        <div>
          <h4>Response Data:</h4>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
