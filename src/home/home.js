import React from 'react';

import BackgroundImg from '../commons/images/maxresdefault.jpg';

import {Button, Container, Jumbotron} from 'reactstrap';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundColor: '#696969'
};
const textStyle = {color: 'white', };

class Home extends React.Component {
    render() {
        return (
            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        <h1 className="display-3" style={textStyle}><center>Online Energy Utility Platform</center></h1>
                    </Container>
                </Jumbotron>
            </div>
        )
    };
}

export default Home
