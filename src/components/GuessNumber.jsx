// import React, { useState, useRef } from 'react';

// function GuessCode() {
//   const [currentRow, setCurrentRow] = useState(0);
//   const [hiddenInput, setHiddenInput] = useState('');
//   const [grid, setGrid] = useState([Array.from({ length: 4 }, () => '')]);
//   const [correctAmount, setCorrectAmount] = useState(0);
//   const [message, setMessage] = useState('');

//   const inputRef = useRef(null);
//   const random4 = 1234;
// //   const random4 = useRef(generateRandomNumber());

// //   function generateRandomNumber() {
// //     return Math.floor(Math.random() * 9000) + 1000;
// //   }

//   const handleInputChange = (e) => {
//     const inputValue = e.target.value.replace(/\D/g, '').slice(0, 4);
//     setHiddenInput(inputValue);
//     if (inputValue.length <= 4) {
//       updateCells(inputValue);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (hiddenInput.length !== 4) {
//       setMessage('Please enter a 4-digit number');
//       return;
//     }
//     setCorrectAmount(getCorrectAmount(hiddenInput));
//     clearInput();
//     addNewRow();
//   };

//   const updateCells = (input) => {
//     setGrid((prevGrid) => {
//       const newRow = [...prevGrid[currentRow]];
//       for (let i = 0; i < 4; i++) {
//         newRow[i] = input[i] || '';
//       }
//       const newGrid = [...prevGrid];
//       newGrid[currentRow] = newRow;
//       return newGrid;
//     });
//   };

//   const clearInput = () => {
//     setHiddenInput('');
//     inputRef.current.focus();
//   };

//   const addNewRow = () => {
//     if (currentRow < 9) {
//       setGrid((prevGrid) => [...prevGrid, Array.from({ length: 4 }, () => '')]);
//       setCurrentRow((prevRow) => prevRow + 1);
//     }
//   };

//   const getCorrectAmount = (number) => {
//     // if (!random4.current) return 0; // Check if random4.current is defined
//     let correctAmnt = 0;
//     for (let i = 0; i < 4; i++) {
//       if (random4[i] === number[i]) {
//         correctAmnt++;
//       }
//     }
//     return correctAmnt;
//   };
  

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           ref={inputRef}
//           type="text"
//           value={hiddenInput}
//           onChange={handleInputChange}
//           maxLength="4"
//         />
//         <button type="submit">Submit</button>
//       </form>
//       {message && <p>{message}</p>}
//       {grid.map((row, index) => (
//         <div key={index} style={{ display: 'flex' }}>
//           {row.map((cell, i) => (
//             <div
//               key={i}
//               style={{
//                 width: '50px',
//                 height: '50px',
//                 border: '1px solid black',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               {cell}
//             </div>
//           ))}
//           {index === currentRow && (
//             <div
//               style={{
//                 width: '50px',
//                 height: '50px',
//                 border: '1px solid black',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               {correctAmount}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default GuessCode;


// import React, { useState, useRef } from 'react';

// function GuessCode() {
//   const [currentRow, setCurrentRow] = useState(0);
//   const [hiddenInput, setHiddenInput] = useState('');
//   const [grid, setGrid] = useState([Array.from({ length: 4 }, () => '')]);
//   const [correctAmounts, setCorrectAmounts] = useState([]);
//   const [message, setMessage] = useState('');
//   const inputRef = useRef(null);


//   const random4 = 1234;
// //   const random4 = useRef(generateRandomNumber());

// //   function generateRandomNumber() {
// //     return Math.floor(Math.random() * 9000) + 1000;
// //   }

//   const handleInputChange = (e) => {
//     const inputValue = e.target.value.replace(/\D/g, '').slice(0, 4);
//     setHiddenInput(inputValue);
//     if (inputValue.length <= 4) {
//       updateCells(inputValue);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (hiddenInput.length !== 4) {
//       setMessage('Please enter a 4-digit number');
//       return;
//     }
//     setCorrectAmounts((prevAmounts) => [...prevAmounts, getCorrectAmount(hiddenInput)]);
//     clearInput();
//     switchToNextRow();
//   };

//   const updateCells = (input) => {
//     setGrid((prevGrid) => {
//       const newRow = [...prevGrid[currentRow]];
//       for (let i = 0; i < 4; i++) {
//         newRow[i] = input[i] || '';
//       }
//       const newGrid = [...prevGrid];
//       newGrid[currentRow] = newRow;
//       return newGrid;
//     });
//   };

//   const clearInput = () => {
//     setHiddenInput('');
//     inputRef.current.focus();
//   };

//   const switchToNextRow = () => {
//     setGrid((prevGrid) => {
//       if (currentRow < 9) {
//         return [...prevGrid, Array.from({ length: 4 }, () => '')];
//       } else {
//         return prevGrid;
//       }
//     });
//     setCurrentRow((prevRow) => (prevRow + 1) % 10);
//   };

//   const getCorrectAmount = (number) => {
//     if (!random4.current) return 0;
//     let correctAmnt = 0;
//     for (let i = 0; i < 4; i++) {
//       if (random4.current.toString()[i] === number[i]) {
//         correctAmnt++;
//       }
//     }
//     return correctAmnt;
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           ref={inputRef}
//           type="text"
//           value={hiddenInput}
//           onChange={handleInputChange}
//           maxLength="4"
//         />
//         <button type="submit">Submit</button>
//       </form>
//       {message && <p>{message}</p>}
//       <div style={{ display: 'flex' }}>
//         <table>
//           <tbody>
//             <tr>
//               {grid[currentRow].map((cell, cellIndex) => (
//                 <td key={cellIndex}>{cell}</td>
//               ))}
//             </tr>
//           </tbody>
//         </table>
//         <div style={{ marginLeft: '20px' }}>
//           {correctAmounts.map((amount, index) => (
//             <div key={index}>Correct digits: {amount}</div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GuessCode;


import React, { useState, useRef } from 'react';

function GuessCode() {
  const [currentRow, setCurrentRow] = useState(0);
  const [hiddenInput, setHiddenInput] = useState('');
  const [grid, setGrid] = useState([Array.from({ length: 4 }, () => '')]);
  const [correctAmounts, setCorrectAmounts] = useState([]);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const random4 = 1234; // Temporary random number for testing

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '').slice(0, 4);
    setHiddenInput(inputValue);
    if (inputValue.length <= 4) {
      updateCells(inputValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hiddenInput.length !== 4) {
      setMessage('Please enter a 4-digit number');
      return;
    }
    const correctAmount = getCorrectAmount(hiddenInput);
    setCorrectAmounts((prevAmounts) => [...prevAmounts, correctAmount]);
    clearInput();
    switchToNextRow();
  };

  const updateCells = (input) => {
    setGrid((prevGrid) => {
      const newRow = [...prevGrid[currentRow]];
      for (let i = 0; i < 4; i++) {
        newRow[i] = input[i] || newRow[i]; // Retain existing character if input is empty
      }
      const newGrid = [...prevGrid];
      newGrid[currentRow] = newRow;
      return newGrid;
    });
  };

  const clearInput = () => {
    setHiddenInput('');
    inputRef.current.focus();
  };

  const switchToNextRow = () => {
    setCurrentRow((prevRow) => (prevRow + 1) % 10);
    if (currentRow < 9) {
      setGrid((prevGrid) => [...prevGrid, Array.from({ length: 4 }, () => '')]);
    }
  };

  const getCorrectAmount = (number) => {
    let correctAmnt = 0;
    for (let i = 0; i < 4; i++) {
      if (random4.toString()[i] === number[i]) {
        correctAmnt++;
      }
    }
    return correctAmnt;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={hiddenInput}
          onChange={handleInputChange}
          maxLength="4"
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      <div style={{ display: 'flex' }}>
        <table>
          <tbody>
            <tr>
              {grid[currentRow].map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <div style={{ marginLeft: '20px' }}>
          {correctAmounts.map((amount, index) => (
            <div key={index}>Correct digits: {amount}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GuessCode;
