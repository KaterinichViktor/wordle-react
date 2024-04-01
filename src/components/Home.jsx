import React from 'react';
import { Link } from 'react-router-dom';

import wordle from '../images/wordle.jpg'
import hardle from '../images/hardle.jpg'
import code from '../images/code2.png'


const Home = () => {
return (
<div className='homepage'>
    <h2>PLAY</h2>

    <Link to="/wordle-classic" className='wordle-link'>
        <div className='gameThumbnail'>
            <img src={wordle} alt="wordle" className='thumbnail'/>
            <h2>Wordle</h2>
        </div>
    </Link>
    <Link to="/wordle-hard" className='wordle-hard-link'>
        <div className='gameThumbnail'>
            <img src={hardle} alt="wordle-hard" className='thumbnail'/>
            <h2>Hardle</h2>
            <h2 style={{color: 'red'}}>Don't touch! Not ready</h2>
        </div>
    </Link>
    <Link to="/guess-my-code" className='guess-code-link'>
        <div className='gameThumbnail'>
            <img src={code} alt="guess-my-code" className='thumbnail'/>
            <h2>Crack the Code</h2>
        </div>
    </Link>

</div>
);
};

export default Home;