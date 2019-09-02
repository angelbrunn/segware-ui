import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history } from '../../helpers/history';
import { Role } from '../../helpers/role';

import { authenticationService } from '../../services/authentication.service';

import { PrivateRoute } from '../../components/route/PrivateRoute';
import { Home } from '../home/Home';
import { Admin } from '../admin/Admin';
import { Login } from '../login/Login';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x =>
            this.setState({
                currentUser: x,
                isAdmin: x && x.role === Role.Admin
            })
        );
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser && (
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">
                                    Home
                                </Link>
                                {isAdmin && (
                                    <Link
                                        to="/admin"
                                        className="nav-item nav-link"
                                    >
                                        Admin
                                    </Link>
                                )}
                                <a
                                    onClick={this.logout}
                                    className="nav-item nav-link"
                                >
                                    Logout
                                </a>
                            </div>
                        </nav>
                    )}
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <PrivateRoute exact path="/" component={Home} />
                                <PrivateRoute
                                    path="/admin"
                                    roles={[Role.Admin]}
                                    component={Admin}
                                />
                                <Route path="/login" component={Login} />
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App };
