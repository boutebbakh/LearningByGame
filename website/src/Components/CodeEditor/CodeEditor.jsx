// import React, { useState } from 'react';
// import MonacoEditor from 'react-monaco-editor';

// const CodeEditor = () => {
//   const [code, setCode] = useState('');
//   const [output, setOutput] = useState('');

//   const handleEditorChange = (newValue) => {
//     setCode(newValue);
//   };

//   const { VM } = require('vm2');

//   const vm = new VM();
  
//   const handleRunCode = () => {
//     try {
//       const result = vm.run(code);
//       setOutput(result);
//     } catch (error) {
//       setOutput(`Error: ${error.message}`);
//     }
//   };
  
  

//   return (
//     <div>
//       <div style={{ marginBottom: '10px' }}>
//         <button onClick={handleRunCode}>Run</button>
//       </div>
//       <MonacoEditor
//         height="400"
//         language="javascript"
//         theme="vs-dark"
//         value={code}
//         onChange={handleEditorChange}
//         options={{
//           automaticLayout: true,
//         }}
//       />
//       <div style={{ marginTop: '10px', border: '1px solid #ccc', padding: '10px' }}>
//         <h3>Output</h3>
//         <pre>{output}</pre>
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;
