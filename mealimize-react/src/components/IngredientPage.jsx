import React, {Component} from 'react'
import SearchForm from "./SearchForm";
import IngredientResults from "./IngredientResults";
import '../css/IngredientPage.css'
import CurrentIngredientPage from './CurrentIngredientPage'
import Loading from "./Loading";


class IngredientPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIngredient: null,
            ingredients: []
        }
    }

    handleIngredientClick = (clickedIngredient) => {
        this.setState({
            currentIngredient: clickedIngredient
        })
    }

    updateState = (data) => {
        this.setState({
            ingredients: data
        })
    }
    searchIngredients = (query) => {
        this.setState({
            currentIngredient: null
        })

        let updateStateFunc = this.updateState.bind(this);
        let url = 'https://ameal.io:8080/ingredients/byName/' + query + '?applicationToken=TOKEN@1'

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                updateStateFunc(myJson.data)
            }).catch("Unable to fetch recipes");
    }

    handleClickBack = () => {
        console.log("CLICK BACK")
        this.setState({
            currentIngredient: null
        })
    }


    render() {
        let containerName = "container-fluid ingredientPage"
        if (!this.state.currentIngredient) {
            return (
                <div className={containerName}>
                    <h1>Ingredienser</h1>
                    <SearchForm searchFunction={this.searchIngredients}/>
                    <div className="ingredient-results">
                    <IngredientResults handleIngredientClick={this.handleIngredientClick}
                                       ingredients={this.state.ingredients}></IngredientResults>
                    </div>
                </div>
            )
        } else if(this.state.currentIngredient){
            return (
                <div className={containerName}>
                    <h1>Ingredienser</h1>
                    <SearchForm searchFunction={this.searchIngredients}/>
                    <button
                        className="btn btn-success btn-large back-button"
                        onClick={() => this.handleClickBack()}>Tilbage til søgning
                    </button>
                    <CurrentIngredientPage
                        handleClickBack={this.handleClickBack}
                        ingredient={this.state.currentIngredient}
                        handleBackgroundClick={this.handleClickBack}/>
                </div>
            )
        } else {
            return(<Loading/>)
        }
    }
}

export default IngredientPage