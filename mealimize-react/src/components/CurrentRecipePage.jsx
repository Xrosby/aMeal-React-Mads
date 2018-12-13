import React, {Component} from 'react'
import '../css/CurrentRecipePage.css'
import NutritionGraph from "./NutritionGraph";
import IngredientList from './IngredientList'
import CurrentIngredientPage from "./CurrentIngredientPage";
import Loading from './Loading'


class CurrentRecipePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipe: this.props.recipe,
            showingIngredient: false
        }
    }

    renderRecipeText = () => {
        let recipeGuideString = ""

        for (let guideStep of this.state.recipe.recipeGuide.guideSteps) {
            recipeGuideString += guideStep.text_content
        }
        return (
            <div className="currentRecipeText">{recipeGuideString}</div>
        )
    }
    renderRecipeImage = (imageUrl) => {
        return (<img className="col-md-12 currentRecipeImage" src={imageUrl} alt={this.state.recipe.name}/>)
    }

    renderNutritionGraph = () => {
        return (
            <div className="col-md-6"><NutritionGraph recipe={this.state.recipe}/></div>
        )
    }

    handleIngredientClick = (currentIngredient) => {
        this.setState({
            showingIngredient: true,
            currentIngredient: currentIngredient
        })
    }

    renderIngredients = () => {
        let ingredientItems = this.state.recipe.ingredientList
        return (
            <IngredientList handleIngredientClick={this.handleIngredientClick} ingredients={ingredientItems}/>
        )

    }

    handleClickBack = () => {
        this.setState({
            showingIngredient: false,
            currentIngredient: null
        })
    }

    handleInnerRecipeClick = (e) => {
        if (e) {
            e.stopPropagation()
        }
    }
    renderRecipePage = () => {
        let name = this.state.recipe.name;
        let imageUrl = this.state.recipe.image_url_large;
        let recipeText = this.state.recipe.recipe_text;

        return (<div className="recipe-background" onClick={this.props.handleBackgroundClick}>
                <div className="recipeContainer" onClick={this.handleInnerRecipeClick}>
                    <div class="current-recipe-header row">
                        <div className="current-recipe-name col-md-11"><h1>{name}</h1></div>
                            <button className="back-button-recipe col-xs-1 col-md-1"
                                    onClick={() => this.props.handleCloseRecipe()}>X
                            </button>

                    </div>
                    <div className="recipe-content-container">
                        <div className="row heading-content">
                            <div className="col-md-5">
                                {this.renderRecipeImage(imageUrl)}
                            </div>
                            <div className="col-md-7">
                                {recipeText}
                            </div>
                        </div>
                        <div className="row current-recipe-info">
                            <div className="nut-graph">
                                {this.renderNutritionGraph()}
                            </div>
                            <div className="col-lg-6 current-recipe-ingredients">
                                {this.renderIngredients()}
                            </div>
                            <div className="text-content-container">
                                <div className="col-md-12">
                                    {this.renderRecipeText()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if (!this.state.showingIngredient) {
            return (
                this.renderRecipePage()
            )
        } else if (this.state.showingIngredient) {
            return (<div>
                    <CurrentIngredientPage
                        handleClickBack={this.handleClickBack}
                        handleBackgroundClick={this.props.handleBackgroundClick}
                        ingredient={this.state.currentIngredient}/>
                </div>
            )
        } else {
            return <Loading/>
        }

    }
}

export default CurrentRecipePage
