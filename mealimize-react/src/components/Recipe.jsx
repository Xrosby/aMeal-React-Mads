import React, {Component} from 'react'
import '../css/Recipe.css'

class Recipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            style: this.props.style,
            handleRecipeClick: this.props.handleRecipeClick
        }
    }

    updateCurrentRecipe = (currentRecipe) => {
        if(this.state.handleRecipeClick) {
            this.state.handleRecipeClick(currentRecipe)
        }
    }

    openRecipePage = (e) => {
        this.fetchRecipe(e)
    }

    fetchRecipe = (e) => {
        let id = e.target.id;
        let url = 'https://ameal.io:8080/recipes/byId/' + id + '?applicationToken=TOKEN@1'
        let updateCurrentRecipeFunc = this.updateCurrentRecipe.bind(this);

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                updateCurrentRecipeFunc(myJson.data)
            }).catch("Unable to get recipe by id:" + id)

    }
    createRecipeElement = (recipe) => {
        let name = recipe.name;
        let id = recipe.id;

        return (

            <div className='recipe' onClick={(e) => this.openRecipePage(e)} id={id} style={this.props.style}>
                <div className='recipeName'>{name}
                </div>
            </div>
        )
    }

    render() {

        return (
            this.createRecipeElement(this.props.recipe)
        );
    }
}

export default Recipe
