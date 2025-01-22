import React from 'react';
import Row from '../../components/Row';
import Banner from '../../components/Banner';
import requests from '../../api/requests';

const MainPage = () => {
    return (
        <div>
            <Banner />
            <Row
                title="NETFLIX ORIGINALS"
                id="NO"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow
            />
            <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
        </div>
    );
};

export default MainPage;
