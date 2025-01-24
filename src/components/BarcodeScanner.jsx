import React, { useState, useEffect } from "react";
import Quagga from "@ericblade/quagga2";

const BarcodeScanner = () => {
  // const [scannedBarcode, setScannedBarcode] = useState("");
  // const [scannerInitialized, setScannerInitialized] = useState(false);

  Quagga.init(
    {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#yourElement"), // Or '#yourElement' (optional)
      },
      decoder: {
        readers: ["code_128_reader"],
      },
    },
    function (err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    }
  );

  return (
    <div className="barcode-scanner-container">
      <button onClick={initializeScanner}>Scan Barcode</button>
      {scannerInitialized && renderScannerUI()}
      {scannedBarcode && <p>Scanned Barcode: {scannedBarcode}</p>}
    </div>
  );
};

export default BarcodeScanner;
