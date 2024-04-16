import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dictArray from "./dictionary";
import { TopWordle } from './TopPanel';

import {Keyboard, colorButtonByCellState} from './keyboard'; // Import the Keyboard component

// import { getRandomWord } from "./dictionary";

// const dailyWord = getRandomWord().toUpperCase();
const dailyWord = "Apple".toUpperCase();
// let correct = 0;


function WordleGame() {
  const [currentRow, setCurrentRow] = useState(0);
  const [hiddenInput, setHiddenInput] = useState('');
  const [grid, setGrid] = useState(Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ({ content: '', state: '' }))));

  const correctRef = useRef(0);

  useEffect(() => {
    correctRef.current = 0; // Reset correctRef to 0 when a new game starts
  }, [currentRow]); // Reset correctRef whenever currentRow changes
  

  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setHiddenInput(e.target.value.toUpperCase());
    updateCells(e.target.value.toUpperCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const wordExists = await checkWordInDictionary(hiddenInput);
    if (!wordExists) {
      toast.error('Not a valid word'); 
      return;
    }
    updateCellColors(hiddenInput, correctRef);
    switchToNextRow();
    clearInput();
    
    // Unfocus the input field when the game is won
    // if (correct === 5) {
    //   toast.success('Congratulations! You won!');
    //   inputRef.current.blur();
    // }
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

//   const updateCellColors = (word, correctRef) => {
//     const gridCopy = [...grid];
//     const buttonsToColor = {}; // Object to store buttons to color
    
//     for (let i = 0; i < word.length; i++) {
//       const char = word[i];
//       const cell = gridCopy[currentRow][i];
  
//       setTimeout(() => { // Add timeout for cell coloring
//         if (dailyWord[i] === char) {
//           cell.state = 'flipped-green'; 
//           correctRef.current++; 
//         } else if (dailyWord.includes(char)) {
//           cell.state = 'flipped-yellow'; 
//         } else {
//           cell.state = 'flipped-red'; 
//         }
  
//         const buttonId = `button-${char.toLowerCase()}`;
//         buttonsToColor[buttonId] = cell.state; // Store button ID and corresponding state
  
//         setGrid([...gridCopy]); // Update grid after coloring cell
    
//         if (correctRef.current === 5) {
//           toast.success('Congratulations! You won!');
//           inputRef.current.blur();
//         }
//       }, 150 * (i + 1)); // Timeout for cell coloring
//     }
  
//     // Color buttons after all cells are processed
//     setTimeout(() => {
//       Object.keys(buttonsToColor).forEach(buttonId => {
//         const state = buttonsToColor[buttonId];
//         colorButtonByCellState(buttonId, state);
//       });
//     }, 150 * word.length + 500); // Timeout for coloring buttons after all cells are processed
//   };

  const updateCellColors = (word, correctRef) => {
    const gridCopy = [...grid];
    const buttonsToColor = {}; // Object to store buttons to color
    const coloredIndices = {}; // Object to store colored indices

    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const cell = gridCopy[currentRow][i];

        setTimeout(() => { // Add timeout for cell coloring
            if (dailyWord[i] === char) {
                cell.state = 'flipped-green'; 
                correctRef.current++; 
                
            } else if (dailyWord.includes(char)) {
                // Find the first occurrence of the character in the secret word
                // const firstOccurrenceIndex = dailyWord.indexOf(char);
                if (coloredIndices[char] === undefined) {
                    // If the letter hasn't been colored before, color it yellow
                    cell.state = 'flipped-yellow';
                    coloredIndices[char] = true;
                }else if(coloredIndices[char] === true) {
                  cell.state = 'flipped-red';
                }
            } else {
                cell.state = 'flipped-red'; 
            }

            const buttonId = `button-${char.toLowerCase()}`;
            buttonsToColor[buttonId] = cell.state; // Store button ID and corresponding state

            setGrid([...gridCopy]); // Update grid after coloring cell

            if (correctRef.current === 5) {
                toast.success('Congratulations! You won!');
                inputRef.current.blur();
            }
        }, 150 * (i + 1)); // Timeout for cell coloring
    }

    // Color buttons after all cells are processed
    setTimeout(() => {
        Object.keys(buttonsToColor).forEach(buttonId => {
            const state = buttonsToColor[buttonId];
            colorButtonByCellState(buttonId, state);
        });
    }, 150 * word.length + 500); // Timeout for coloring buttons after all cells are processed
};
  
  const updateCells = (value) => {
    const gridCopy = [...grid];
    for (let i = 0; i < gridCopy[currentRow].length; i++) {
      if (i < value.length) {
        gridCopy[currentRow][i].content = value[i];
        gridCopy[currentRow][i].state = 'active';
      } else {
        gridCopy[currentRow][i].content = '';
        gridCopy[currentRow][i].state = '';
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
  const handleInputBlur = () => {
    if (correctRef.current !==5) {

      inputRef.current.focus();
    }
  };

  return (
    <div className='wordle-box'>
      <TopWordle/>
      <div id="game-container">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true} 
          closeButton={false} 
        />
        <form onSubmit={handleSubmit}>
          <input className='hdn-input-wordle' type="text" value={hiddenInput} onChange={handleInputChange} maxLength="5" autoFocus onBlur={handleInputBlur} ref={inputRef}  />
        </form>
      
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map(({ content, state }, cellIndex) => (
                <div key={cellIndex} className={`cell-wordle ${state}`}>
                  <div className="cell-wordle-inner">
                    <div className="cell-wordle-front">
                      <div className="cell-wordle-content">{content}</div>
                    </div>
                    <div className="cell-wordle-back">
                      <div className="cell-wordle-content">{content}</div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        ))}

        <Keyboard
          handleSubmit={handleSubmit}
          setHiddenInput={setHiddenInput}
          hiddenInput={hiddenInput}
          updateCells={updateCells}
        />

      </div>
    </div>

  );
}

export default WordleGame;
