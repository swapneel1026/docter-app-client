import * as React from "react";

const PdfViewer = ({ url }) => {
  return (
    <div>
      <embed
        src={url}
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
