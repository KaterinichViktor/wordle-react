import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TopCode } from './TopPanel';


function GuessCode() {
  const [currentRow, setCurrentRow] = useState(0);
  const [hiddenInput, setHiddenInput] = useState('');
  const [grid, setGrid] = useState([Array.from({ length: 4 }, () => ({ content: '', state: '' }))]);
  const [correctAmounts, setCorrectAmounts] = useState([0]);
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
      toast.error('Please enter a 4-digit number', { autoClose: 3000 });
      return;
    }
    const correctAmount = getCorrectAmount(hiddenInput);
    setCorrectAmounts((prevAmounts) => [...prevAmounts.slice(0, currentRow), correctAmount]);
    clearInput();
    if (correctAmount === 4) {
      colorCellsGreen();
      inputRef.current.blur();
      setTimeout(() => {
        toast.success('You`ve cracked the code! Congratulations!', { autoClose: 1000 });
      }, 750);
    } else {
      switchToNextRow();
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

  const clearInput = () => {
    setHiddenInput('');
    // inputRef.current.focus();
  };

  // const switchToNextRow = () => {
  //   setCurrentRow((prevRow) => (prevRow + 1) % 10);
  //   if (currentRow < 10 && correctAmounts !== 4 ) {
  //     setGrid((prevGrid) => [...prevGrid, Array.from({ length: 4 }, () => ({ content: '', state: '' }))]);
  //     setCorrectAmounts((prevAmounts) => [...prevAmounts, 0]);
  //   } 
  // };
  const switchToNextRow = () => {
    setCurrentRow((prevRow) => prevRow + 1);
    if (currentRow === 9 && correctAmounts[currentRow] !== 4) {
      inputRef.current.blur();
      setTimeout(() => {
        toast.error('You failed! Better luck next time.', { autoClose: 1000 });
      }, 750);
    } else if (currentRow < 10 && correctAmounts[currentRow] !== 4) {
      setGrid((prevGrid) => [...prevGrid, Array.from({ length: 4 }, () => ({ content: '', state: '' }))]);
      setCorrectAmounts((prevAmounts) => [...prevAmounts, 0]);
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

  const colorCellsGreen = () => {
    const greenCells = [0, 1, 2, 3];
    greenCells.forEach((index, i) => {
      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[currentRow][index].state = 'all-right';
          return newGrid;
        });
      }, 150 * (i + 1));
    });
  };

  const handleInputBlur = () => {
    if (correctAmounts[currentRow] === 4) {
      inputRef.current.blur();
    }
  };

  const getCorrectClass = (amount) => {
    switch (amount) {
      case 0:
        return 'zero-right';
      case 1:
        return 'one-right';
      case 2:
        return 'two-right';
      case 3:
        return 'three-right';
      case 4:
        return 'four-right';
      default:
        return 'default-right';
    }
  };
  


  return (
    <div className='code-box'>
      <TopCode/>
      <div className="crack-code-container">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          closeButton={false}
        />
        <div style={{ marginRight: '20px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <input
                className='hdn-input-code'
                type="text"
                value={hiddenInput}
                onChange={handleInputChange}
                maxLength="4"
                autoFocus
                onBlur={handleInputBlur}
                ref={inputRef}
              />
            </div>
          </form>

          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="row" style={{ display: 'flex', justifyContent: 'center' }}>
              {row.map(({ content, state }, cellIndex) => (
                <div key={cellIndex} className={`cell-code ${state}`} >
                  <div className="cell-code-inner">
                    <div className="cell-code-front">
                      <div className="cell-code-content">{content}</div>
                    </div>
                    <div className="cell-code-back">
                      <div className="cell-code-content">{content}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* {correctAmounts.map((amount, index) => (
            <div className='correct-number-box' key={index} > <h2 className={`correct-number ${colorShow}`}>{amount}</h2> correct digits</div>
          ))} */}
          {correctAmounts.map((amount, index) => (
            <div className='correct-number-box' key={index}>
              <h2 className={`correct-number ${getCorrectClass(amount)}`}>{amount}</h2> correct digits
            </div>
          ))}

        </div>
      </div>
    </div>
    
  );
}

export default GuessCode;
