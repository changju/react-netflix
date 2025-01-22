import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
    const { movieId } = useParams();
    const [movies, setMovices] = useState();
    const fetchData = async (mId) => {
        const request = await axios.get(`https://api.themoviedb.org/3/movie/${mId}`);
        console.log('request.data', request.data);
        setMovices(request.data);
    };
    useEffect(() => {
        fetchData(movieId);
    }, [movieId]);
    return (
        <section>
            <img
                className="modal__poster-img"
                src={`https://image.tmdb.org/t/p/original/${movies?.backdrop_path || ''}`}
                alt="modal__poster-img"
            />
        </section>
    );
};

export default DetailPage;
