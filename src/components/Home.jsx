import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
return (
<div className='homepage'>
    <h2>PLAY</h2>

    <Link to="/wordle-classic" className='wordle-link'>
        <div className='gameThumbnail'>
            <img src="../images/wordle.jpg" alt="wordle" />
        </div>
    </Link>
    <Link to="/wordle-hard" className='wordle-hard-link'>
        <div className='gameThumbnail'>
            <img src="" alt="wordle-hard" />
        </div>
    </Link>
    <Link to="/guess-my-code" className='guess-code-link'>
        <div className='gameThumbnail'>
            <img src="" alt="guess-my-code" />

        </div>
    </Link>

</div>
);
};

export default Home;