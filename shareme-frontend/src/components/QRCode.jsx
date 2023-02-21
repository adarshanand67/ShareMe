import QRCode from "qrcode.react";
import React from "react";

const QRCodeGenerator = ({ url }) => {
  const qrValue = "https://share-me-web.netlify.app/login";
  // console.log(url);
  return (
    <div className="App">
      <QRCode
        id="qr-gen"
        value={url}
        size={150}
        level={"H"}
        includeMargin={true}
        className="z-10"
      />
    </div>
  );
};

export default QRCodeGenerator;
