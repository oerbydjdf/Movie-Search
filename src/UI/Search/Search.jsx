import React, { useState } from 'react';
import './styleSearch.css';

const Search = (props) => {
    const [inputvalue, setInputValue] = useState('');
    const [inpuYeartvalue, setInputYearValue] = useState(undefined);

    const handleValue = (e) => {
        setInputValue(e.target.value);
    };
    const handleYearValue = (e) => {
        setInputYearValue(e.target.value);
    };
    const getsValue = (e) => {
        e.preventDefault();
        (inputvalue === '')? props.searchMov('man'): props.searchMov(inputvalue, 1, inpuYeartvalue);
    };
    return (
        <for>
            <input className='nameMovie' type="text" value={inputvalue}
             onChange={handleValue} placeholder='Название фильма на английском языке'/>
            <input className='yearMovi' type='number' value={inpuYeartvalue}
             onChange={handleYearValue} placeholder='Год выхода'/>
            <button onClick={getsValue} className='searchMovie'>Искать</button>
        </for>
    );
};

export default Search;