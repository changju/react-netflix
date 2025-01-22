import React, { useEffect, useState } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const [show, handleShow] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    };
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        });

        return () => {
            window.removeEventListener('scroll', () => {});
        };
    }, []);
    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <nav className="nav-container">
                <img
                    alt="Netflix logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png?20190206123158"
                    className="nav-container__logo"
                    onClick={() => window.location.reload()}
                />

                <input
                    value={searchValue}
                    onChange={handleChange}
                    className="nav__input"
                    type="text"
                    placeholder="영화를 검색해주세요"
                />

                <img
                    alt="Use logged"
                    src="https://i.pinimg.com/474x/0a/a8/58/0aa8581c2cb0aa948d63ce3ddad90c81.jpg"
                    className="nav-container__avatar"
                />
            </nav>
        </div>
    );
};

export default Nav;
