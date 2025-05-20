import React, { useState } from "react";
import '../../output.css';
import InputSection from './input';
import Navbar from './navbar';
import OutputSection from './output';
import CodeEditor from './codeditor';

function Playground() {
  const [outputValue, setOutputValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [importedCode, setImportedCode] = useState("");

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-2/3 flex flex-col">
          <CodeEditor setOutputValue={setOutputValue} inputValue={inputValue} setCodeFromInput={setImportedCode} code={importedCode} outputValue={outputValue} />
        </div>
        <div className="w-1/3 flex flex-col border-l p-0">
          <InputSection inputValue={inputValue} setInputValue={setInputValue} onImportCode={setImportedCode} />
          <div className="w-full h-4 bg-gray-800 flex items-center justify-center text-xs text-gray-400 select-none">
            {/* gap only, no text */}
          </div>
          <OutputSection outputValue={outputValue} />
        </div>
      </div>
    </div>
  );
}

export default Playground;