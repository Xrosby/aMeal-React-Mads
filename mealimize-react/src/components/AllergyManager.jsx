import React, {Component} from 'react'
import '../css/AllergyManager.css'

class AllergyManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allergies: this.props.allergies,
            selectableAllergies: []
        }
    }

    componentWillMount() {
        this.addSelectableAllergies()
    }

    setAllergies = (allergies) => {

        let filteredArray = allergies
        for (let existingAllergy of this.state.allergies) {
            filteredArray.filter(selectableAllergy => selectableAllergy.id != existingAllergy.id)
        }

        this.setState({
                selectableAllergies: filteredArray
            }
        )
    }

    removeAllergyFromSelectables = (toRemove) => {
        let filteredArray = this.state.selectableAllergies.filter(allergy=> allergy.id != toRemove.id)
        this.setState({
            selectableAllergies: filteredArray
        }, function () {
        })
    }

    allergyAlreadyPresent = (allergyToCheck) => {
        for (let allergy of this.state.allergies) {
            if (allergy.id === allergyToCheck.id) {
                return true
            }
        }
        return false

    }

    removeAllergy = (e) => {
        let idToRemove = e.target.id
        let removedAllergy = this.state.allergies.filter(allergy => allergy.id == idToRemove)[0]
        let filteredArray = this.state.allergies.filter(allergy => allergy.id != idToRemove)
        this.setState({
            allergies: filteredArray
        }, function () {
            this.addAllergyToSelectables(removedAllergy)
            this.props.updateUserAllergies(this.state.allergies)
        })
    }

    addAllergyToSelectables = (allergyToAdd) => {
        let updatedSelectables = this.state.selectableAllergies
        updatedSelectables.push(allergyToAdd)
        this.setState({
            selectableAllergies: updatedSelectables
        })
    }

    addAllergy = (e) => {

        let newAllergy = this.state.selectableAllergies.filter(allergy => allergy.id == e.target.id)[0]
        this.removeAllergyFromSelectables(newAllergy)
        if(!this.allergyAlreadyPresent(newAllergy)) {
            let updatedAllergies = this.state.allergies
            updatedAllergies.push(newAllergy)
            this.setState({
                allergies: updatedAllergies
            }, function () {
                this.props.updateUserAllergies(this.state.allergies)
            })
        }


    }

    addSelectableAllergies = () => {

        let url = "https://ameal.io:8080/data/getAllAllergies?applicationToken=TOKEN@1"

        let setAllergiesFunc = this.setAllergies.bind(this)

        fetch(url, {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (result) {
            console.log(result.data)
            setAllergiesFunc(result.data)
        }).catch((e) => console.log(e))

    }
    renderAllergySelection = () => {

        let selectableAllergies = []
        for (let selectableAllergy of this.state.selectableAllergies) {
            console.log(selectableAllergy)
            selectableAllergies.push(
                <div
                    className="allergy"
                    onClick={(e) => this.addAllergy(e)}
                    id={selectableAllergy.id}
                    key={selectableAllergy.id}
                >{selectableAllergy.allergy}
                </div>)
        }

        return (
            <div className="selectable-allergy-container col-md-2">
                <div className="selectable-allergy-header">Mulige allergier</div>
                {selectableAllergies}
                </div>)
    }

    renderExistingAllergies = () => {
        let existingAllergies = []
        for (let existingAllergy of this.state.allergies) {
            existingAllergies.push(
                <div
                    className="allergy"
                    onClick={(e) => this.removeAllergy(e)}
                    id={existingAllergy.id}
                    key={existingAllergy.id}
                >{existingAllergy.allergy}
                </div>
            )
        }

        return (<div
                className='existing-allergy-container col-md-2'>
                <div
                    className="existing-allergy-header">Tilføjede allergier
                </div>
                <div className="existing-allergy-list">{existingAllergies}
                </div>
            </div>
        )
    }


    render() {
        return (
            <div>
                <div className="allergy-manager-container">
                    {this.renderExistingAllergies()}
                    {this.renderAllergySelection()}
                </div>
            </div>
        );
    }
}

export default AllergyManager
