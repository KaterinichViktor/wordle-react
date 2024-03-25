import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GuessCode() {
  const [currentRow, setCurrentRow] = useState(0);
  const [hiddenInput, setHiddenInput] = useState('');
  const [grid, setGrid] = useState([Array.from({ length: 4 }, () => '')]);
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
      toast.success('You`ve cracked the code! Congratulations!', { autoClose: false });
      // colorCellsGreen();
    } else {
      switchToNextRow();
    }
  };

  const updateCells = (input) => {
    setGrid((prevGrid) => {
      const newRow = [...prevGrid[currentRow]];
      for (let i = 0; i < 4; i++) {
        newRow[i] = input[i] || '';
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
    if (currentRow < 20) {
      setGrid((prevGrid) => [...prevGrid, Array.from({ length: 4 }, () => '')]);
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

  // const colorCellsGreen = () => {
  //   const greenCells = [0, 1, 2, 3];
  //   greenCells.forEach((index, i) => {
  //     setTimeout(() => {
  //       setGrid((prevGrid) => {
  //         const newGrid = [...prevGrid];
  //         newGrid[currentRow][index] = 'green';
  //         return newGrid;
  //       });
  //     }, 500 * (i + 1));
  //   });
  // };

  return (
    <div style={{ display: 'flex' }}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true} // Hide the cooldown bar
        closeButton={false} // Disable the close button
      />
      <div style={{ marginRight: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
              className='hdn-input'
              type="text"
              value={hiddenInput}
              onChange={handleInputChange}
              maxLength="4"
              autoFocus
              onBlur={() => inputRef.current.focus()}
              ref={inputRef}
            />
            {/* <button type="submit">Submit</button> */}
          </div>
        </form>

        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row" style={{ display: 'flex', justifyContent: 'center' }}>
            {row.map((cellContent, cellIndex) => (
              <div key={cellIndex} className={`cell`} style={{ width: '30px', height: '30px', border: '1px solid black', textAlign: 'center', lineHeight: '30px', marginBottom: '10px' }}>
                {cellContent}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {correctAmounts.map((amount, index) => (
          <div key={index} style={{ marginRight: '10px', padding: '5px', border: '1px solid black', marginBottom: '10px', height: '30px' }}>Correct digits: {amount}</div>
        ))}
      </div>
    </div>
  );
}

export default GuessCode;








