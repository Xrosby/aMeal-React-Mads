import React, {Component} from 'react'

class UserInformation extends Component {
    render() {

        let userName = this.props.user.name
        let email = this.props.user.email

        return (
            <div>
                <h1>{userName} : {email}</h1>
            </div>
        );
    }
}


export default UserInformation