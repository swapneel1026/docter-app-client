import * as React from "react";

const PdfViewer = ({ url }) => {
  const modifiedUrl = url.replace("http://", "https://");
  return (
    <div>
      <embed
        src={modifiedUrl}
        type="application/pdf"
        style={{
          width: "100%",
          height: "400px",
        }}
      />
    </div>
  );
};

export default PdfViewer;
