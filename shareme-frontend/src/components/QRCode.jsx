import React, { useState } from "react";
import QRCode from "qrcode.react";

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
      />
    </div>
  );
}

export default QRCodeGenerator;