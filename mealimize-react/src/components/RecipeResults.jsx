import React, {Component} from 'react'
import Recipe from './Recipe'
import '../css/RecipeResults.css'

class RecipeResults extends Component {


    renderRecipes = () => {

        let recipeArray = []
        if (this.props.recipes !== undefined) {
            for (let recipe of this.props.recipes) {
                let id = recipe.id
                let imageUrl = recipe.image_url_large
                let style = {
                    backgroundImage: 'url(' + imageUrl + ')'
                }
                recipeArray.push(
                    <div className="recipe-wrapper col-md-3">
                        <Recipe
                            style={style}
                            handleRecipeClick={this.props.handleRecipeClick}
                            key={id} recipe={recipe}/></div>)
            }
        }
        return recipeArray
    }

    render() {
        return (
            <div className='recipe-results'>
                <div className="row">{this.renderRecipes()}</div>
            </div>
        )
    }
}

export default RecipeResults



