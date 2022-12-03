import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import PersonContainer from './person/person-container'
import DeviceContainer from './device/device-container'
import UserContainer from './user/user-container'
import ClientContainer from './client/client-container'
import LoginContainer from './login/login-container'
import UserDeviceContainer from './device/user-device-container'

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import ConsumptionContainer from './consumption/consumption-container';

class App extends React.Component {

    constructor() {
        super();

        this.onLoginSuccessful = this.onLoginSuccessful.bind(this);
        this.onLogout = this.onLogout.bind(this);

        const localStorageUser = localStorage.getItem("electricity-user");
        let currentUser = {
            id: null,
            username: null,
            role: 'UNKNOWN'
        };
        if (localStorageUser) {
            currentUser = JSON.parse(localStorageUser);
        }

        this.state = {
            user: currentUser
        }
    }

    onLoginSuccessful = (user) => {
        if (!user) {
            return;
        }

        localStorage.setItem("electricity-user", JSON.stringify(user));
        this.setState({
            user: user
        });
    }

    onLogout() {
        localStorage.removeItem("electricity-user");
        this.setState({
            user: {
                id: null,
                username: null,
                role: 'UNKNOWN'
            }
        });
    }




    render() {
        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBar username={this.state.user.username} onLogout={this.onLogout}/>
                    <Switch>
                        <Route
                            exact
                            path='/auth'
                            render={() => <LoginContainer onSuccess={this.onLoginSuccessful}/>}
                        />

                        <Route
                            exact
                            path='/auth'
                            render={() => <Home onSuccess={this.onLogout}/>}
                        />
                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />
                        <Route
                            exact
                            path='/person'
                            render={() => <PersonContainer/>}
                        />
                        <Route
                            exact
                            path='/user'
                            render={() => <UserContainer/>}
                        />
                        <Route
                            exact
                            path='/client'
                            render={() => <ClientContainer/>}
                        />
                        <Route
                            exact
                            path='/device'
                            render={() => <DeviceContainer/>}
                        />
                        <Route
                            exact
                            path='/userDevice'
                            render={() => <UserDeviceContainer/>}
                        />
                        <Route
                            exact
                            path='/consumption'
                            render={() => <ConsumptionContainer/>}
                        />
                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />
                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
