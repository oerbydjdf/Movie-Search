import React from 'react';
import { useState, useEffect } from 'react';
import './styleListFilms.css';

const ListFilms = (props) => {
    let [numPage, changingPage] = useState(1);
    let [remains, getremainder] = useState(props.state.totalMovies);

    useEffect (() => {
        getremainder(props.state.totalMovies);
    }, [props.state.totalMovies]);
    
    let switchesPages = () => {
        getremainder(remains - 10);
        changingPage(++numPage);        
        props.addPage(props.state.searchable, numPage, props.state.yearRelize);
    };

    
    return (
        <>
        <div className='filmList'>
            {props.state.movies.map(e => {
                return (
                    <div className='filmItem'>
                        <div className='filmName'>{e.Title}</div>
                        <img className='filmPoster' src={e.Poster} alt="" />
                        <div className='filmYear'>{e.Year}</div>
                    </div>
                )
            })}
        </div>
        {(remains > 10)? <button onClick={switchesPages} className='addFilms'>Ещё</button>:
        <button disabled onClick={switchesPages} className='addFilms addFilmsDis'>Поиск окончен</button> }
        </>
    );
};

export default ListFilms;