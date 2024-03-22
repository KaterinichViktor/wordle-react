// import React, { useState, useRef } from 'react';

// function GuessCode() {
//   const [currentRow, setCurrentRow] = useState(0);
//   const [hiddenInput, setHiddenInput] = useState('');
//   const [grid, setGrid] = useState([Array.from({ length: 4 }, () => '')]);
//   const [correctAmnt, setCorrectAmnt] = useState(0);

//   const inputRef = useRef(null); // Create a ref for the input element

//   function generateRandomNumber() {
//         return Math.floor(Math.random() * 9000) + 1000;
//     }
    
//   let random4 = generateRandomNumber();

//   const handleInputChange = (e) => {
//     setHiddenInput(e.target.value.replace(/\D/g, '').slice(0, 4));
//     updateCells(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (hiddenInput.length !== 4) {
//       setMessage('Please enter a 4-digit number');
//       return;
//     }


//     switchToNextRow();
//     setCorrectAmnt(getCorrectAmount(hiddenInput));
//     clearInput();
//   };

//   const getCorrectAmount = (number) => {
//     let correctAmnt = 0;
//     for (let i = 0; i < 4; i++) {
//       if (random4[i] === number[i]) {
//         correctAmnt++;
//       }
//     }
//     return correctAmnt;
//   };

//   const updateCells = (value) => {
//     const gridCopy = [...grid];
//     for (let i = 0; i < gridCopy[currentRow].length; i++) {
//       if (i < value.length) {
//         gridCopy[currentRow][i].content = value[i];
//       } else {
//         gridCopy[currentRow][i].content = '';
//       }
//     }
//     setGrid(gridCopy);
//   };


//   const switchToNextRow = () => {
//     setCurrentRow(currentRow + 1);
//   };

//   const clearInput = () => {
//     setHiddenInput('');
//   };

//   return (
//     <div id="game-container">
//       <form onSubmit={handleSubmit}>
//         <input className='hdn-input' type="text" value={hiddenInput} onChange={handleInputChange} maxLength="4" autoFocus ref={inputRef}  />
//       </form>

//       <div className="row">
//         {grid[currentRow].map(({ content, color }, cellIndex) => (
//           <div key={cellIndex} className={`cell ${color}`}>
//             {content}
//           </div>
//         ))}
//         <div className="correct-count">{correctAmnt}</div>
//       </div>
//     </div>
//   );
// }

// export default GuessCode;