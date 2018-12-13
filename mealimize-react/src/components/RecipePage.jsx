import React, {Component} from 'react'
import SearchForm from "./SearchForm";
import '../css/RecipePage.css'
import RecipeResults from './RecipeResults'
import CurrentRecipePage from "./CurrentRecipePage";
import Loading from "./Loading";

class RecipePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: [],
            currentRecipe: null,
            loading: true
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    updateState = (data) => {
        this.setState({
            recipes: data
        })
    }

    handleRecipeClick = (clickedRecipe) => {
        this.setState({
            currentRecipe: clickedRecipe
        })
    }

    searchRecipes = (query) => {
        this.setState({
            currentRecipe: null
        })
        let updateStateFunc = this.updateState.bind(this);
        let url = 'https://ameal.io:8080/recipes/byName/' + query + '?applicationToken=TOKEN@1'


        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                updateStateFunc(myJson.data)
            }).catch("Unable to fetch recipes");
    }

    handleClickBack = () =>{
        this.setState({
            currentRecipe: null
        })
    }

    handleBackgroundClick = ()=> {
        this.setState({
            currentRecipe: null
        })
    }

    render() {

        let containerName = "container-fluid recipe-container"


        if(this.state.loading) {
            return <Loading/>
        }
        else if (!this.state.currentRecipe) {
            return (
                <div className={containerName}>
                    <h1>Opskrifter</h1>
                    <SearchForm searchFunction={this.searchRecipes}/>
                    <RecipeResults handleRecipeClick={this.handleRecipeClick}
                                   recipes={this.state.recipes}></RecipeResults>
                </div>
            )
        } else {
            return (
                <div className={containerName}>
                    <h1>Opskrifter</h1>
                    <SearchForm searchFunction={this.searchRecipes}/>
                    <button className="btn btn-success btn-large back-button" onClick={() => this.handleClickBack()}>Tilbage</button>
                    <CurrentRecipePage
                        handleCloseRecipe={this.handleBackgroundClick}
                        recipe={this.state.currentRecipe}
                        handleBackgroundClick={this.handleBackgroundClick}/>
                </div>
            )
        }
    }
}

export default RecipePage
