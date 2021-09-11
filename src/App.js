import React from "react";
import { parse } from "papaparse";
import "./styles.css";

export default function App() {
  const [highlighted, setHighlighted] = React.useState(false);
  const [fileData, setFileData] = React.useState([]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div
        className={`dropzone ${
          highlighted ? "dropzone-true" : "dropzone-false"
        }`}
        onDragEnter={() => {
          setHighlighted(true);
        }}
        onDragLeave={() => {
          setHighlighted(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);
          // console.log(e.dataTransfer.files[0]);
          const file = e.dataTransfer.files[0];
          const type = e.dataTransfer.files[0].type;
          // csv = "application/vnd.ms-excel"
          // txt = "text/plain"
          async function handle() {
            const text = await file.text();
            if (type === "application/vnd.ms-excel") {
              const { data } = parse(text, { header: true });
              console.log(data);
            }
            if (type === "text/plain") {
              const { data } = parse(text, { header: false });
              console.log(data);
            }
          }
          handle();
        }}
      >
        <p>Drop csv/txt file Here</p>
      </div>
    </div>
  );
}
