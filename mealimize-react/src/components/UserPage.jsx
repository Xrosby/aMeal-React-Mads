import React, {Component} from 'react'
import '../css/UserPage.css'
import DislikeManager from "./DislikeManager";
import AllergyManager from "./AllergyManager";
import UserInformation from "./UserInformation";
import Loading from "./Loading";

class UserPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            loaded: false
        }
    }

    componentDidMount() {

        this.getUser()
    }

    updateState = (user) => {
        this.setState({
            user: user,
            loaded: true
        })
    }

    getUser = () => {
        let url = "https://ameal.io:8080/users/byId/1?applicationToken=TOKEN@1"
        let updateStateFunc = this.updateState.bind(this)

        fetch(url).then(function (response) {
            return response.json();
        }).then(function (jsonUser) {
            updateStateFunc(jsonUser.data)
        })
    }

    updateUserDislikes = (newDislikes) => {
        let updatedUser = this.state.user
        updatedUser.dislikes = newDislikes
        this.setState({
            user: updatedUser
        }, function () {
            this.updateUser()
        })

    }

    updateUserAllergies = (newAllergies) => {
        let updatedUser = this.state.user
        updatedUser.allergies = newAllergies
        this.setState({
            user: updatedUser
        }, function () {
            this.updateUser()
        })
    }

    updateUser = () => {

        let url = "https://ameal.io:8080/users/update?applicationToken=TOKEN@1"
        fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
        })
            .then((response) => response.json())
            .catch((e) => console.log(e))
    }

    render() {

        if (this.state.loaded) {
            return (<div className="row">
                <div className="col-md-12">
                    <UserInformation user={this.state.user}/>
                </div>
                <div className="col-md-4">
                    <DislikeManager
                        updateUserDislikes={this.updateUserDislikes}
                        dislikes={this.state.user.dislikes}/>
                </div>
                <div className="col-md-4">
                    <AllergyManager
                        updateUserAllergies={this.updateUserAllergies}
                        allergies={this.state.user.allergies}/>
                </div>
            </div>)
        } else {
            return <Loading/>
        }
    }
}

export default UserPage