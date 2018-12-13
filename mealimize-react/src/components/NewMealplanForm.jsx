import React, {Component} from 'react'
import '../css/NewMealplanForm.css'
import Mealplan from "./Mealplan";
import Loading from "./Loading";
import CurrentRecipePage from "./CurrentRecipePage";
import Spinner from './Spinner'

class NewMealplanForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMealplan: null,
            currentRecipe: null,
            numberOfDays: 1,
            loading: true,
            saved: false,
            generatingMealplan: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    updateState = (newMealplan) => {
        this.setState({
            currentMealplan: newMealplan
        })
    }
    handleGenerateRandomMealplan = () => {
        this.setState({
            generatingMealplan: true
        })
        let updateStateFunc = this.updateState.bind(this)
        let url = "https://ameal.io:8080/mealplans/generateRandomMealplan?numberOfDays=" + this.state.numberOfDays + "&applicationToken=TOKEN@1"
        fetch(url).then(function (response) {
            return response.json()
        }).then(function (responseData) {
            updateStateFunc(responseData.data)
        }).then(this.setState({
            generatingMealplan: false
        }))
    }

    handleNoDaysChange = (e) => {
        let value = e.target.value
        this.setState({
            numberOfDays: value
        })
    }

    handleInnerDivClick = (e) => {
        if (e) {
            e.stopPropagation()
        }
    }

    handleRecipeClick = (clickedRecipe) => {
        this.setState({
            currentRecipe: clickedRecipe
        })
    }

    handleCloseRecipe = () => {
        this.setState({
            currentRecipe: null
        })
    }

    mealplanSaved = () => {
        this.setState({
            saved: true
        })
    }

    handleSaveMealplan = () => {
        let url = "https://ameal.io:8080/mealplans/saveMealplan?applicationToken=TOKEN@1"
        let name = prompt("Hvad skal madplanen hedde?");

        let updatedMealplan = this.state.currentMealplan
        updatedMealplan.name = name;

        this.setState({
            currentMealplan: updatedMealplan
        })

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.currentMealplan)
        }).then(response => response.json())
            .then(() => this.props.handleMealplanGenerated())
            .then(() => this.mealplanSaved())
            .catch((e) => console.log(e));
    }

    createMealplanElement = () => {
        return (
            <div className="generated-mealplan-container">
                <Mealplan
                    handleRecipeClick={this.handleRecipeClick}
                    mealplan={this.state.currentMealplan}/>
            </div>
        )
    }

    createSaveButton = () => {
        return (
            <div className="save-btn-wrapper">
                <img
                    className="btn-save-mealplan"
                    src="https://png2.kisspng.com/sh/a81c7e4f879c5861dd0f2960dd9e8dcf/L0KzQYm3VMAyN5J9fZH0aYP2gLBuTfNpbZRwRd9qcnuwc7nsgBtjd6kye95ycD3kgsW0mfV0NWZme6MCY0a5RYG7hsM5NmI4TKk9M0izQYa5UsYzQWg4TKU7OT7zfri=/kisspng-check-mark-checkbox-clip-art-yes-5ac17c66504f38.134743801522629734329.png"
                    alt="Gem"
                    onClick={this.handleSaveMealplan}
                />
            </div>
        )
    }

    updateValue = (newValue) => {
        this.setState({
            numberOfDays: newValue
        })
    }

    createFormHeader = () => {
        return (
            <div className="new-mealplan-form-header row">

                <img className="dice-img" onClick={() => this.handleGenerateRandomMealplan()}
                     src="https://dumielauxepices.net/sites/default/files/drawn-dice-one-532106-7173741.png"
                     alt="Generer madplan"/>
                <Spinner updateValue={this.updateValue} max="20" min="1"/>
            </div>)
    }

    createSuccessImage = () => {
        return (
            <div className="success-container-cat" onClick={this.props.handleBackgroundClick}>
                <img
                    className="success-img-cat"
                    src="https://68.media.tumblr.com/bada7917bbd624d02be6fa053484a6d5/tumblr_op9coqSdZz1vbdodoo1_400.gif"
                    alt="SUCCESS!"
                />
                <div className="mealplan-saved-message"><h1>{this.state.currentMealplan.name} er gemt!</h1></div>
            </div>
        )
    }

    render() {
        if (this.state.loading) {
            return <Loading/>
        } else if (this.state.generatingMealplan) {
            return (
                <div className="background-create-mealplan" onClick={this.props.handleBackgroundClick}>
                    <div className="new-mealplan-form-container container-fluid" onClick={this.handleInnerDivClick}>
                        {this.createFormHeader()}
                        <Loading/>
                        )
                    </div>
                </div>)
        } else if (this.state.saved) {
            return <div>{this.createSuccessImage()}</div>
        } else if (this.state.currentRecipe) {
            return <CurrentRecipePage handleCloseRecipe={this.handleCloseRecipe} recipe={this.state.currentRecipe}/>
        } else if (this.state.currentMealplan) {
            return (
                <div className="background-create-mealplan" onClick={this.props.handleBackgroundClick}>
                    <div className="new-mealplan-form-container container-fluid" onClick={this.handleInnerDivClick}>
                        {this.createFormHeader()}
                        {this.createSaveButton()}
                        {this.createMealplanElement()}
                    </div>
                </div>
            )

        } else {
            return (
                <div className="background-create-mealplan" onClick={() => this.props.handleBackgroundClick()}>
                    <div className="new-mealplan-form-container container-fluid" onClick={this.handleInnerDivClick}>
                        {this.createFormHeader()}
                    </div>
                </div>
            );
        }
    }
}

export default NewMealplanForm
