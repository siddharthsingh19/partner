import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import "./App.css";

function App() {
  const [data, setData] = useState("No result");
  const [isScanning, setIsScanning] = useState(false);
  const [cameraFacing, setCameraFacing] = useState("user"); // 'user' for front camera, 'environment' for back camera
  const webcamRef = useRef(null);

  const handleScan = (err, result) => {
    if (result) {
      setData(result.text);
      setIsScanning(false); // Stop scanning after a successful scan
    } else {
      setData("No result");
    }
  };

  const handleStartScan = () => {
    setIsScanning(true); // Start scanning
    setData("No result"); // Reset data
  };

  const toggleCamera = () => {
    setCameraFacing((prev) => (prev === "user" ? "environment" : "user")); // Toggle camera
  };

  return (
    <div className="scanner-container">
      <h1>Barcode Scanner</h1>
      <div className="camera-feed">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={300}
          height={200}
          videoConstraints={{
            facingMode: cameraFacing, // Use the camera facing mode from state
          }}
        />
        <div className="overlay"></div>
      </div>
      {isScanning && (
        <BarcodeScannerComponent
          width={300}
          height={200}
          onUpdate={handleScan}
          delay={1000}
        />
      )}
      <p>Scanned Data: {data}</p>
      <button onClick={handleStartScan}>Start Scanning</button>
      <button onClick={toggleCamera}>Switch Camera</button>{" "}
      {/* Button to switch camera */}
    </div>
  );
}

export default App;
