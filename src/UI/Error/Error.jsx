import React from 'react';

let textEror = ["Произошла ошибка! Попробуйте позже", "Уточните запрос!", "Такой фильм еще не сняли :)"];
const Error = ({text}) => {
    // debugger

    if(text === 'Too many results.') return <div>{textEror[1]}</div>
    if("Movie not found!" === text) return <div>{textEror[2]}</div>
    if("Error" === text) return <div>{textEror[0]}</div>
};

export default Error;