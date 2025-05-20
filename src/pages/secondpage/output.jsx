import { faUpload, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const OutputSection = ({ outputValue }) => {
  const handleExport = () => {
    const blob = new Blob([outputValue || "No output"], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Robust output handling
  let displayValue = outputValue;
  if (displayValue === null || displayValue === undefined || displayValue === "") {
    displayValue = "No output";
  } else if (typeof displayValue !== 'string') {
    try {
      displayValue = JSON.stringify(displayValue);
    } catch {
      displayValue = "[Unrenderable output]";
    }
  }
  // Hide raw JSON parse errors ONLY if the output is exactly the error string
  if (
    displayValue === 'Unexpected end of JSON input' ||
    displayValue === 'JSON parse error' ||
    displayValue === 'SyntaxError'
  ) {
    displayValue = `An error occurred while processing the output.\n\nRaw output:\n${outputValue}`;
  }

  return (
    <div className="bg-gray-100 h-1/2 flex flex-col">
      <div className="flex flex-col flex-1 justify-between items-center">
        <div className="bg-gray-200 h-[45px] w-full flex justify-between items-center shadow p-[15px]">
          <span className="font-bold">Output:</span>
          <div className="cursor-pointer flex items-center gap-2" onClick={handleExport}> 
            <FontAwesomeIcon icon={faDownload} className="text-blue-600" />
            <span className="text-sm font-semibold">Download Output</span>
          </div>
        </div>
        <textarea 
          readOnly 
          className="w-full p-2 text-sm flex-1 resize-none mt-2 outline-none"
          value={displayValue}
          onChange={() => {}} // prevent React warning
        /> 
      </div>
    </div>
  );
};

export default OutputSection;
