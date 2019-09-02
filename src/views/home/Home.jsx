import React from 'react';
import { authenticationService } from '../../services/authentication.service';
import { userService } from '../../services/user.service';
import { postedService } from '../../services/posted.service';

import { Posted } from '../../components/posted/Posted';
import { FormPosted } from '../../components/form/FormPosted';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            loading: true,
            postedFromApi: null,
            lastIdPosted: null
        };
    }

    async componentDidMount() {
        const { currentUser } = this.state;
        await userService
            .getById(currentUser.id)
            .then(userFromApi => this.setState({ userFromApi }));

        this.setState({ loading: true });

        await postedService.getAllPosted().then(data => {
            this.setState({
                loading: false,
                postedFromApi: data,
                lastIdPosted: data == undefined ? data.slice(-1)[0].id : ''
            });
        });
    }

    callbackFunction = childData => {
        this.setState({
            postedFromApi: childData,
            lastIdPosted: childData.slice(-1)[0].id
        });
    };

    render() {
        const { currentUser, userFromApi, postedFromApi } = this.state;
        if (this.state.loading) {
            return <div> Loading . . .</div>;
        } else {
            return (
                <div className="Home">
                    <div className="Home-Aside">
                        <div className="Home-Aside-Presentation">
                            <h1>SAGWARE (🇧🇷)</h1>
                            <p>You're logged in with React & JWT!!</p>
                            <p>
                                Your role is:{' '}
                                <strong>{currentUser.role}</strong>.
                            </p>
                            <p>
                                This page can be accessed by all authenticated
                                users.
                            </p>
                            <div className="Home-Aside-User">
                                Current user from secure api end point:
                                {userFromApi && (
                                    <ul>
                                        <li>
                                            {userFromApi.firstName}{' '}
                                            {userFromApi.lastName}
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="Home-Aside-FormPosted">
                            <FormPosted
                                parentCallback={this.callbackFunction}
                                lastId={this.state.lastIdPosted}
                            />
                        </div>
                    </div>
                    <div className="Home-Posteds">
                        {postedFromApi.map(posted => (
                            <Posted key={posted.id} posted={posted} />
                        ))}
                    </div>
                </div>
            );
        }
    }
}

export { Home };
