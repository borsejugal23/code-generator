import React, { useState, useEffect } from "react";

const CodeForm = () => {
  const [code, setCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState(null);
  const url = "http://localhost:8080";

  const refreshCode = async () => {
    try {
      const response = await fetch(`${url}/api/codes`);
      const data = await response.json();
      setCode(data.code);
    } catch (error) {
      setError("Error fetching code");
    }
  };

  const submitCode = async () => {
    try {
      const response = await fetch(`${url}/api/codes/use`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: userCode }),
      });
      const data = await response.json();
      setResult(data.message || data.error);
    } catch (error) {
      setError("Error submitting code");
    }
  };

  useEffect(() => {
    refreshCode(); // Initial code generation
  }, []);

  return (
    <div
      style={{
        width: "50%",
        height: "400px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#e0e0e0", // Adding a background color for visibility
      }}
    >
      <div style={{ marginBottom: "10px" ,marginTop:"50px"}}>
        <strong>Code:</strong> <span>{code}</span>{" "}
        <button onClick={refreshCode} style={buttonStyle}>
          Refresh
        </button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter code"
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          style={inputStyle}
        />
        <button onClick={submitCode} style={buttonStyle}>
          Submit
        </button>
      </div>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      {result && <div style={{ marginBottom: "10px" }}>{result}</div>}
    </div>
  );
};

const buttonStyle = {
  padding: "8px 12px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginLeft: "4px",
};

const inputStyle = {
  padding: "8px",
  marginRight: "8px",
  minWidth: "150px",
  borderRadius:"3px"
};

export default CodeForm;
