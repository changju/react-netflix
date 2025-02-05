import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchPage.css';
import useDebounce from '../../hooks/useDebounce';
const SearchPage = () => {
    const navigate = useNavigate();
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    let query = useQuery();
    // const searchTerm = query.get('q');
    const debouncedSearchTerm = useDebounce(query.get('q'), 500);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            console.log('debouncedSearchTerm', debouncedSearchTerm);
            fetchSearchMovie(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const fetchSearchMovie = async (searchTerm) => {
        try {
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            );
            console.log('SearchPage -> fetchSearchMovie', request);
            setSearchResults(request.data.results);
        } catch (e) {
            console.log('error', e);
        }
    };
    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className="search-container">
                {searchResults.map((movie) => {
                    if (movie.backdrop_path !== null && movie.media_type !== 'pserson') {
                        const movieImageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
                        return (
                            <div className="movie">
                                <div
                                    onClick={() => {
                                        navigate(`/${movie.id}`);
                                    }}
                                    className="movie__column-poster"
                                >
                                    <img src={movieImageUrl} alt="" className="movie__poster" />
                                </div>
                            </div>
                        );
                    }
                })}
            </section>
        ) : (
            <section className="no-results">
                <div className="no-results__text">
                    <p>Your search for "${debouncedSearchTerm}" did not have any matches.</p>
                    <p>Suggestions:</p>
                    <ul>
                        <li>Try different keywords</li>
                    </ul>
                </div>
            </section>
        );
    };

    return renderSearchResults();
};

export default SearchPage;
