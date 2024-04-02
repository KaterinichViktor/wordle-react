import React from 'react';

export function Keyboard({ setHiddenInput, hiddenInput, updateCells, handleSubmit }) {
  const keyboardLetters = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Delete', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Enter']
  ];

  const handleButtonClick = (letter) => {
    setHiddenInput(hiddenInput + letter);
    updateCells(hiddenInput + letter);
  };

  const handleDeleteClick = () => {
    setHiddenInput(hiddenInput.slice(0, -1));
    updateCells(hiddenInput.slice(0, -1));
  };

  return (
    <div className='keyboard-box'>
      {keyboardLetters.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter, index) => {
            if (rowIndex === 2 && (letter === 'Delete' || letter === 'Enter')) {
              return (
                <button key={index} id={`button-${letter.toLowerCase()}`} onClick={letter === 'Delete' ? handleDeleteClick : handleSubmit} className={letter === 'Delete' ? 'delete-button' : 'enter-button'}>{letter}</button>
              );
            } else {
              return (
                <button key={index} id={`button-${letter.toLowerCase()}`} onClick={() => handleButtonClick(letter)} className="keyboard-button">{letter}</button>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
}

export const colorButtonByCellState = (buttonId, state) => {
  const button = document.getElementById(buttonId);
  if (!button) return;

  const currentClasses = button.classList;

  switch (state) {
    case 'flipped-green':
      if (!currentClasses.contains('green')) {
        button.classList.remove('yellow');
        button.classList.add('green');
      }
      break;
    case 'flipped-yellow':
      if (!currentClasses.contains('yellow') && !currentClasses.contains('green')) {
        button.classList.add('yellow');
      }
      break;
    case 'flipped-red':
      button.classList.add('red');
      break;
    default:
      break;
  }
};
