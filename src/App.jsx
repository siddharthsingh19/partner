import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import "./App.css";

function App() {
  const [data, setData] = useState("No result");
  const [productName, setProductName] = useState("");
  const [mrp, setMrp] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false); // New state for scanning status
  const webcamRef = useRef(null);

  const handleScan = (err, result) => {
    if (result) {
      setData(result.text);
      setShowInputs(true);
      setIsScanning(false); // Stop scanning after a successful scan
    } else {
      setData("No result");
    }
  };

  const handleStartScan = () => {
    setIsScanning(true); // Start scanning
    setData("No result"); // Reset data
    setShowInputs(false); // Hide input fields
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({
      barcode: data,
      productName,
      mrp,
      sellingPrice,
    });
    setProductName("");
    setMrp("");
    setSellingPrice("");
    setShowInputs(false);
    setData("No result");
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

      {showInputs && (
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="MRP"
            value={mrp}
            onChange={(e) => setMrp(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Selling Price"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {submittedData && (
        <div className="submitted-data">
          <h2>Submitted Product Details:</h2>
          <p>
            <strong>Barcode:</strong> {submittedData.barcode}
          </p>
          <p>
            <strong>Product Name:</strong> {submittedData.productName}
          </p>
          <p>
            <strong>MRP:</strong> {submittedData.mrp}
          </p>
          <p>
            <strong>Selling Price:</strong> {submittedData.sellingPrice}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
