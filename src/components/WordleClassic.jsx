import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dictArray from "./dictionary";
import { TopWordle } from './TopPanel';
// import { getRandomWord } from "./dictionary";

// const dailyWord = getRandomWord().toUpperCase();
const dailyWord = "Apple".toUpperCase();
// let correct = 0;


function WordleGame() {
  const [currentRow, setCurrentRow] = useState(0);
  const [hiddenInput, setHiddenInput] = useState('');
  const [grid, setGrid] = useState(Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ({ content: '', state: '' }))));
  // const [gameWon, setGameWon] = useState(false);
  let correct = 0;

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
      console.log('Word not found in dictionary.');
      return;
    }
    updateCellColors(hiddenInput);
    switchToNextRow();
    clearInput();
    
    // Unfocus the input field when the game is won
    if (correct === 5) {
      toast.success('Congratulations! You won!');
      inputRef.current.blur();
    }
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
  
  // const updateCellColors = (word) => {
  //   const gridCopy = [...grid];
  //   for (let i = 0; i < word.length; i++) {
  //     setTimeout(() => {
  //       const char = word[i];
  //       const cell = gridCopy[currentRow][i];
  //       // let correct = 0;
        
  //       if (dailyWord[i] === char) {
  //         cell.state = 'flipped-green'; // Correct letter in the correct position
  //         correct++;
  //       } else if (dailyWord.includes(char)) {
  //         cell.state = 'flipped-yellow'; // Correct letter in the wrong position
  //       } else {
  //         cell.state = 'flipped-red'; // Incorrect letter
  //       }
  //       setGrid([...gridCopy]); // Update the grid after coloring each cell
  
  //       // Check if all cells in the current row have correct letters
  //       // const allCorrect = gridCopy[currentRow].every(cell => cell.state === 'flipped-green');
  //       const allCorrect = gridCopy[currentRow].every(cell => cell.state === 'flipped-green');
  //       if (allCorrect) {
  //         // setGameWon(true); // Set gameWon to true if all letters are correct
  //         toast.success('Congratulations! You won!');
  //         inputRef.current.blur();
  //       }
  //       // if (correct===5) {
  //       //   // setGameWon(true); // Set gameWon to true if all letters are correct
  //       //   toast.success('Congratulations! You won!');
  //       //   inputRef.current.blur();
  //       // }
  //     }, 150 * (i + 1));
  //   }
  // };

  const updateCellColors = (word, correctRef) => {
    const gridCopy = [...grid];
    for (let i = 0; i < word.length; i++) {
      setTimeout(() => {
        const char = word[i];
        const cell = gridCopy[currentRow][i];
  
        if (dailyWord[i] === char) {
          cell.state = 'flipped-green'; // Correct letter in the correct position
          correctRef.current++; // Increment correct count
        } else if (dailyWord.includes(char)) {
          cell.state = 'flipped-yellow'; // Correct letter in the wrong position
        } else {
          cell.state = 'flipped-red'; // Incorrect letter
        }
        setGrid([...gridCopy]); // Update the grid after coloring each cell
  
        // Check if all cells in the current row have correct letters
        if (correctRef.current === 5) {
          toast.success('Congratulations! You won!');
          inputRef.current.blur();
        }
      }, 150 * (i + 1));
    }
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
    // if (!gameWon) {
    //   // Prevent the input from losing focus if the game is not won
    //   inputRef.current.focus();
    // }
    if (!correct===5) {
      // Prevent the input from losing focus if the game is not won
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
          hideProgressBar={true} // Hide the cooldown bar
          closeButton={false} // Disable the close button
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
      </div>
    </div>

  );
}

export default WordleGame;
