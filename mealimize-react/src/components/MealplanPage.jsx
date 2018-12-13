import React, {Component} from 'react'
import CurrentRecipePage from "./CurrentRecipePage";
import Mealplan from "./Mealplan";
import NewMealplanForm from "./NewMealplanForm";
import '../css/MealplanPage.css'
import Loading from "./Loading";

class MealplanPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            mealplans: [],
            currentRecipe: null,
            creatingMealplan: false
        }
    }

    componentWillMount() {
        this.setMealplans()
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    updateState = (mealplans) => {
        this.setState({
            mealplans: mealplans,
            loaded: true
        });
    };


    setMealplans = () => {
        let updateStateFunc = this.updateState.bind(this)
        let url = "https://ameal.io:8080/mealplans/getUserMealplans?applicationToken=TOKEN@1";
        fetch(url).then(function (response) {
            return response.json()
        }).then(function (response) {
            updateStateFunc(response.data)
        })

    }
    handleRecipeClick = (currentRecipe) => {
        this.setState({
            currentRecipe: currentRecipe
        })
    }
    renderMealplans = () => {
        let mealplans = []
        for (let mealplan of this.state.mealplans) {
            if (mealplan.recipes.length !== 0) {
                mealplans.push(
                    <div className="mealplan-wrapper col-md-6" key={mealplan.id}>
                        <Mealplan
                            handleUpdate={this.setMealplans}
                            className="mealplan-item"
                            key={mealplan.id}
                            handleRecipeClick={this.handleRecipeClick}
                            mealplan={mealplan}
                        />
                    </div>)
            }
        }
        return (mealplans)
    }
    handleCreateMealplan = () => {
        this.setState({
            currentRecipe: null,
            creatingMealplan: true
        })
    }
    handleBackgroundClick = () => {

        console.log("CLICKED BACJGROUND")

        this.setState({
            currentRecipe: null,
            creatingMealplan: false
        })
    }


    render() {
        if (this.state.loading) {
            return <Loading/>
        } else if (!this.state.currentRecipe && !this.state.creatingMealplan) {
            return (
                <div>
                    <h1>Madplaner</h1>
                    <button className="btn-create-mealplan" onClick={() => this.handleCreateMealplan()}><i
                        className="material-icons md-48">add_circle</i></button>
                    <div className="mealplans-container">
                        <div className="row">{this.renderMealplans()}</div>
                    </div>
                </div>
            )
        } else if (this.state.currentRecipe) {
            return (
                <div>
                    <h1>Madplaner</h1>
                    <CurrentRecipePage
                        handleCloseRecipe={this.handleBackgroundClick}
                        handleIngredientClick={this.handleIngredientClick} recipe={this.state.currentRecipe}
                        handleBackgroundClick={this.handleBackgroundClick}
                    />
                </div>
            )
        } else if (this.state.creatingMealplan) {
            return (
                <div>
                    <NewMealplanForm handleMealplanGenerated={this.setMealplans} handleBackgroundClick={this.handleBackgroundClick}/>
                </div>
            )
        }

    }
}

export default MealplanPage