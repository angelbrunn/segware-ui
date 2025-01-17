import React from 'react';

import { userService } from '../../services/user.service';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { users } = this.state;
        return (
            <div className="Admin">
                <h1>Admin</h1>
                <p>This page can only be accessed by administrators.</p>
                <div>
                    All users from secure (admin only) api end point:
                    {users && (
                        <ul>
                            {users.map(user => (
                                <li key={user.id}>
                                    {user.firstName} {user.lastName}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        );
    }
}

export { Admin };