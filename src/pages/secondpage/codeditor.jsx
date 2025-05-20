import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faDownload } from "@fortawesome/free-solid-svg-icons";
import Editor from "@monaco-editor/react";

const defaultCodes = {
  C: `#include <stdio.h>\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}`,
  "C++": `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello World\";\n    return 0;\n}`,
  Java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}`,
  Python: `print(\"Hello World\")`,
  Javascript: `console.log(\"Hello World\")`,
};

const CodeEditor = forwardRef(({ setOutputValue, inputValue, code }, ref) => {
  const [language, setLanguage] = useState("C++");
  const [editorCode, setEditorCode] = useState(() => localStorage.getItem('editorCode') || defaultCodes["C++"]);
  const [isRunning, setIsRunning] = useState(false);
  const [editorTheme, setEditorTheme] = useState("vs-dark");

  // Register custom themes if needed
  React.useEffect(() => {
    if (window.monaco) {
      window.monaco.editor.defineTheme('solarized-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { background: '002b36' },
          { token: '', foreground: '839496', background: '002b36' },
          { token: 'comment', foreground: '586e75' },
          { token: 'string', foreground: '2aa198' },
          { token: 'keyword', foreground: '859900' },
          { token: 'number', foreground: 'b58900' },
        ],
        colors: {
          'editor.background': '#002b36',
          'editor.foreground': '#839496',
          'editor.lineHighlightBackground': '#073642',
          'editorCursor.foreground': '#d30102',
          'editor.selectionBackground': '#073642',
          'editor.inactiveSelectionBackground': '#07364299',
        },
      });
      window.monaco.editor.defineTheme('dracula', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { background: '282a36' },
          { token: '', foreground: 'f8f8f2', background: '282a36' },
          { token: 'comment', foreground: '6272a4' },
          { token: 'string', foreground: 'f1fa8c' },
          { token: 'keyword', foreground: 'ff79c6' },
          { token: 'number', foreground: 'bd93f9' },
        ],
        colors: {
          'editor.background': '#282a36',
          'editor.foreground': '#f8f8f2',
          'editor.lineHighlightBackground': '#44475a',
          'editorCursor.foreground': '#ffb86c',
          'editor.selectionBackground': '#44475a',
          'editor.inactiveSelectionBackground': '#44475a99',
        },
      });
    }
  }, []);

  // Persist code to localStorage on change
  useEffect(() => {
    localStorage.setItem('editorCode', editorCode);
  }, [editorCode]);
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setEditorCode(defaultCodes[lang]);
  };

  // Use Piston API for code execution (no proxy or API key needed)
  const PISTON_BASE_URL = "https://emkc.org/api/v2/piston";

  const languageToPiston = {
    'C': { language: 'c', version: '10.2.0', filename: 'main.c' },
    'C++': { language: 'cpp', version: '10.2.0', filename: 'main.cpp' },
    'Java': { language: 'java', version: '15.0.2', filename: 'Main.java' },
    'Python': { language: 'python3', version: '3.10.0', filename: 'main.py' },
    'Javascript': { language: 'javascript', version: '18.15.0', filename: 'main.js' } // fixed version for Piston
    
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutputValue("Running...");
    try {
      const langInfo = languageToPiston[language];
      if (!langInfo) {
        setOutputValue("Unsupported language for Piston API.");
        setIsRunning(false);
        return;
      }
      const res = await fetch(`${PISTON_BASE_URL}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: langInfo.language,
          version: langInfo.version,
          files: [{ name: langInfo.filename, content: editorCode }],
          stdin: inputValue || ""
        })
      });
      if (!res.ok) {
        setOutputValue(`Error: ${res.status} ${res.statusText}`);
        setIsRunning(false);
        return;
      }
      const result = await res.json();
      setOutputValue(
        (result.run && result.run.stdout) ? result.run.stdout :
        (result.run && result.run.stderr) ? result.run.stderr :
        (result.compile && result.compile.stdout) ? result.compile.stdout :
        (result.compile && result.compile.stderr) ? result.compile.stderr :
        "No output"
      );
    } catch (err) {
      setOutputValue("Error: " + err.message);
    }
    setIsRunning(false);
  };

  // Expose handleRun to parent via ref
  useImperativeHandle(ref, () => ({
    handleRun
  }));

  // Update editor code if code prop changes (for code import)
  useEffect(() => {
    if (code !== undefined && code !== null && code !== editorCode) {
      setEditorCode(code);
    }
  }, [code]);

  return (
    <div className="min-h-full flex flex-col w-full h-full p-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 border border-gray-700 shadow-xl rounded-lg">
      <div className="flex items-center justify-between px-2 mb-2">
        <div className="flex items-center gap-x-6">
          <select
            className="bg-gray-900 text-white mt-2 px-2 py-1 rounded w-24 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={language}
            onChange={handleLanguageChange}
          >
            <option>C</option>
            <option>C++</option>
            <option>Java</option>
            <option>Python</option>
            <option>Javascript</option>
          </select>
          <select
            className="bg-gray-900 text-white mt-2 px-2 py-1 rounded w-36 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={editorTheme}
            onChange={e => setEditorTheme(e.target.value)}
            title="Editor Theme"
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
            <option value="hc-black">High Contrast</option>
            <option value="solarized-dark">Solarized Dark</option>
            <option value="dracula">Dracula</option>
-          </select>          <button 
          onClick={() => {
            const blob = new Blob([editorCode], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `code.${language.toLowerCase() === 'c++' ? 'cpp' : 
                         language.toLowerCase() === 'javascript' ? 'js' :
                         language.toLowerCase() === 'python' ? 'py' :
                         language.toLowerCase() === 'java' ? 'java' :
                         language.toLowerCase() === 'c' ? 'c' : 'txt'}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
          className="bg-gray-900 text-white mt-2 px-2 py-1 rounded w-36 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 flex gap-2"
          title="Download code as file" 
        >
          <FontAwesomeIcon icon={faDownload} className="text-blue-600" />
          <span className="text-sm font-semibold">Download Code</span>
        </button>
        </div>
        <div className="flex gap-2 px-3 py-1 items-center relative group">
          <button
            className="text-green-blue hover:text-blue-700 focus:outline-none rounded-full p-1 transition-all duration-200"
            onClick={handleRun}
            disabled={isRunning}
            aria-label="Run code"
            style={{ fontSize: '1.2rem', background: 'none', border: 'none', cursor: isRunning ? 'not-allowed' : 'pointer' }}
          >
            <FontAwesomeIcon icon={faPlay} className="text-blue-400"/> <span className="text-white text-sm">Run</span>
          </button>
          {/* Instant tooltip on hover */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-0 z-10">
            Run
          </div>
        </div>
      </div>
      <div className="flex-1 mt-2 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
        <Editor
          height="550px"
          theme={editorTheme}          language={
            language === "C" || language === "C++"
              ? "cpp"
              : language === "Java"
              ? "java"
              : language === "Python"
              ? "python"
              : language === "Javascript"
              ? "javascript"
              : "plaintext"
          }
          value={editorCode}
          onChange={(value) => setEditorCode(value || "")}          options={{ fontSize: 14, minimap: { enabled: false } }}
        />
      </div>
    </div>
  );
});

export default CodeEditor;