import React, { useState, useRef } from 'react';

function WordleGame() {
  const [currentRow, setCurrentRow] = useState(0);
  const [hiddenInput, setHiddenInput] = useState('');
  const [grid, setGrid] = useState(Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ({ content: '', color: '' }))));

  const dictArray = ["автор", "актор", "завтра", "рокіт", "торік", "карат", "стовп", "apple", "apexs"];
  const dailyWord = 'APPLE'; // Or fetch it from an API if needed
  const inputRef = useRef(null); // Create a ref for the input element

  const handleInputChange = (e) => {
    setHiddenInput(e.target.value.toUpperCase());
    updateCells(e.target.value.toUpperCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const wordExists = await checkWordInDictionary(hiddenInput);
    if (!wordExists) {
      console.log('Word not found in dictionary.');
      return;
    }
    updateCellColors(hiddenInput);
    switchToNextRow();
    clearInput();
  };

  const checkWordInDictionary = async (word) => {
    try {
      const lowerCaseWord = word.toLowerCase();
      return dictArray.some(dictWord => dictWord.toLowerCase() === lowerCaseWord);
    } catch (error) {
      console.error('Error while checking word in dictionary:', error);
      return false;
    }
  };

  const updateCells = (value) => {
    const gridCopy = [...grid];
    for (let i = 0; i < gridCopy[currentRow].length; i++) {
      if (i < value.length) {
        gridCopy[currentRow][i].content = value[i];
      } else {
        gridCopy[currentRow][i].content = '';
      }
    }
    setGrid(gridCopy);
  };
  

  const updateCellColors = (word) => {
    const gridCopy = [...grid];
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (dailyWord[i] === char) {
        gridCopy[currentRow][i].color = 'green'; // Correct letter in the correct position
      } else if (dailyWord.includes(char)) {
        gridCopy[currentRow][i].color = 'yellow'; // Correct letter in the wrong position
      } else {
        gridCopy[currentRow][i].color = 'red'; // Incorrect letter
      }
    }
    setGrid(gridCopy);
  };

  const switchToNextRow = () => {
    if (currentRow < 5) {
      setCurrentRow(currentRow + 1);
    }
  };

  const clearInput = () => {
    setHiddenInput('');
  };
  const handleInputBlur = (e) => {
  // Prevent the input from losing focus
  inputRef.current.focus();
  };

  return (
    <div id="game-container">
      <form onSubmit={handleSubmit}>
        <input className='hdn-input' type="text" value={hiddenInput} onChange={handleInputChange} maxLength="5" autoFocus onBlur={handleInputBlur} ref={inputRef}  />
      </form>


      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map(({ content, color }, cellIndex) => (
            <div key={cellIndex} className={`cell ${color}`}>
              {content}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default WordleGame;


// import React, { useState, useRef } from 'react';

// function WordleGame() {
//   const [currentRow, setCurrentRow] = useState(0);
//   const [hiddenInput, setHiddenInput] = useState('');
//   const [grid, setGrid] = useState(Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => '')));
//   const inputRef = useRef(null); // Create a ref for the input element

//   const dictArray = ["автор", "актор", "завтра", "рокіт", "торік", "карат", "стовп", "apple"];
//   const dailyWord = 'APPLE'; // Or fetch it from an API if needed

//   const handleInputChange = (e) => {
//     setHiddenInput(e.target.value.toUpperCase());
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const wordExists = await checkWordInDictionary(hiddenInput);
//     if (!wordExists) {
//       console.log('Word not found in dictionary.');
//       return;
//     }
//     updateCellColors(hiddenInput);
//     switchToNextRow();
//     clearInput();
//   };

//   const checkWordInDictionary = async (word) => {
//     try {
//       const lowerCaseWord = word.toLowerCase();
//       return dictArray.some(dictWord => dictWord.toLowerCase() === lowerCaseWord);
//     } catch (error) {
//       console.error('Error while checking word in dictionary:', error);
//       return false;
//     }
//   };

//   const updateCellColors = (word) => {
//     const gridCopy = [...grid];
//     for (let i = 0; i < word.length; i++) {
//       const char = word[i];
//       if (dailyWord[i] === char) {
//         gridCopy[currentRow][i] = 'green'; // Correct letter in the correct position
//       } else if (dailyWord.includes(char)) {
//         gridCopy[currentRow][i] = 'yellow'; // Correct letter in the wrong position
//       } else {
//         gridCopy[currentRow][i] = 'grey'; // Incorrect letter
//       }
//     }
//     setGrid(gridCopy);
//   };

//   const switchToNextRow = () => {
//     if (currentRow < 5) {
//       setCurrentRow(currentRow + 1);
//     }
//   };

//   const clearInput = () => {
//     setHiddenInput('');
//   };

//   const handleInputBlur = (e) => {
//     // Prevent the input from losing focus
//     inputRef.current.focus();
//   };

//   return (
//     <div id="game-container">
//       <form onSubmit={handleSubmit}>
//         <input 
//           type="text" 
//           value={hiddenInput} 
//           onChange={handleInputChange} 
//           maxLength="5" 
//           autoFocus 
//           onBlur={handleInputBlur} 
//           ref={inputRef} // Assign the ref to the input element
//         />
//       </form>

//       {grid.map((row, rowIndex) => (
//         <div key={rowIndex} className="row">
//           {row.map((cellColor, cellIndex) => (
//             <div key={cellIndex} className={`cell ${cellColor}`} />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default WordleGame;
