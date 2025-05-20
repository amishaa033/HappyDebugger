import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload,  } from "@fortawesome/free-solid-svg-icons";


const InputSection = ({ inputValue, setInputValue, onImportCode }) => {
  // If not provided as props, fallback to local state for standalone use
  const [localInput, setLocalInput] = useState("");
  const value = inputValue !== undefined ? inputValue : localInput;
  const onChange = setInputValue || setLocalInput;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        onChange(ev.target.result);
        if (onImportCode) onImportCode(ev.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-gray-100 h-1/2 flex flex-col ">
      <div className="flex flex-col flex-1 justify-between items-center ">
        <div className="bg-gray-200 h-[45px] w-full flex justify-between items-center shadow p-[15px]">
          <span className="font-bold ">Input:</span>
          <label htmlFor="input" className="cursor-pointer flex items-center gap-2"> 
            <FontAwesomeIcon icon={faDownload} className="text-blue-600" />
            <span className="text-sm font-semibold">Import Input</span>
          </label>
          <input id="input" type="file" className="hidden" onChange={handleFileChange} />
        </div>
        <textarea
          className="w-full   p-2 text-sm flex-1 resize-none mt-2 "
          placeholder="Enter custom input..."
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputSection;