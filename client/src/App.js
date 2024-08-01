import axios from "axios";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { fileUpload } from "./apiURL/urls";

import "./App.css";
import { useState } from "react";

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

const upload = async (file) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  try {
    const { data } = await axios.post(fileUpload, file, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const [graphData, setGraphData] = useState([]);
  const uploadFile = async (event) => {
    const [file] = event.target.files;
    const formData = new FormData();
    formData.append("csvFile", file);
    formData.append("fileName", file.name);
    const data = await upload(formData);
    console.log("🚀 ~ uploadFile ~ data:", data)
    setGraphData(data)
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            onChange={uploadFile}
            accept="text/csv"
          />
        </Button>
      </header>
    </div>
  );
}

export default App;
