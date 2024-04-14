import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getPayload } from "../helperFunctions/getPayload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FileUpload({ setFileName }) {
  const [userDetails] = React.useState(getPayload());

  return (
    <>
      <button
        type="button"
        className={`${
          userDetails?.userType === "User"
            ? "bg-teal-600 focus:ring-teal-600"
            : "bg-blue-500 focus:ring-blue-500"
        } relative top-0 left-0 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white  border rounded-md md:text-lg focus:transition-all  focus:ring-2 focus:outline-none w-32 md:min-w-36 md:w-64`}
      >
        Upload file
      </button>
      <input
        className="absolute opacity-0"
        onChange={(e) => {
          const fileName = e.target.files[0].name;
          setFileName(fileName);
        }}
        type="file"
        id="profileImage"
        name="profileImage"
      />
    </>
  );
}
