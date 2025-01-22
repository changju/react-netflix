import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import './Row.css';
import MovieModal from './MovieModal';
const Row = (props) => {
    const { title, fetchUrl, isLargeRow, id } = props;
    console.log('props', props);
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelection] = useState({});
    useEffect(() => {
        fetchMovieData();
    }, [fetchUrl]);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;
    };
    const handleClick = (movie) => {
        console.log('movie', movie);
        setModalOpen(true);
        setMovieSelection(movie);
    };
    return (
        <section className="row">
            <h2>{title}</h2>
            <div className="slider">
                <div className="slider__arrow-left">
                    <div
                        className="arrow"
                        onClick={() => {
                            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                        }}
                    >
                        {'<'}
                    </div>
                </div>
                <div id={id} className="row__posters">
                    {/** Serveral ROW_POSTER */}
                    {movies.map((movie) => {
                        return (
                            <img
                                key={movie.id}
                                onClick={() => handleClick(movie)}
                                className={`row__poster ${isLargeRow && 'row_posterLarge'}`}
                                src={`${BASE_URL}${
                                    isLargeRow ? movie.poster_path : movie.backdrop_path
                                }`}
                                alt={movie.name}
                            />
                        );
                    })}
                </div>
                <div className="slider__arrow-right">
                    <div
                        className="arrow"
                        onClick={() => {
                            document.getElementById(id).scrollLeft += window.innerWidth + 80;
                        }}
                    >
                        {'>'}
                    </div>
                </div>
            </div>

            {modalOpen && (
                <MovieModal
                    {...movieSelected}
                    setModalVisibility={setModalOpen}
                    base_url={BASE_URL}
                />
            )}
        </section>
    );
};

export default Row;
