import QRCode from "qrcode.react";
import React from "react";

const QRCodeGenerator = () => {
  const qrValue = "https://share-me-web.netlify.app/login";
  return (
    <div className="App">
      <QRCode
        id="qr-gen"
        value={qrValue}
        size={190}
        level={"H"}
        includeMargin={true}
        className = "z-10"
      />
    </div>
  );
}

export default QRCodeGenerator;