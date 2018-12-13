import React, {Component} from 'react'
import '../css/CurrentIngredientPage.css'
import NutritionGraph from "./NutritionGraph";

class CurrentIngredientPage extends Component {

    renderNutritionInformation = () => {
        let protein = this.props.ingredient.protein;
        let carbohydrates = this.props.ingredient.carbohydrates;
        let fat = this.props.ingredient.fat;
        let fibers = this.props.ingredient.fibers;

        return (
            <div className="nutrition-information col-md-12"><p>Fedt: {fat}</p><p>Protein: {protein}</p>
                <p>Kulhydrater: {carbohydrates}</p><p>Fibre: {fibers}</p></div>
        )
    }
    renderNutritionGraph = () => {
        return (
            <div className="nutrition-graph col-md-12"><NutritionGraph ingredient={this.props.ingredient}/></div>
        )
    }

    handleInnerIngredientClick = (e) => {
        console.log("INNER INGREDIENT CLICK")
        if (e) {
            e.stopPropagation()
        }
    }

    render() {
        let ingredientName = this.props.ingredient.name;
        return (
            <div className="current-ingredient-background" onClick={() => this.props.handleBackgroundClick()}>
                <div className="row current-ingredient" onClick={this.handleInnerIngredientClick}>
                    <div className="header-wrapper">
                        <div className="row current-ingredient-header">
                            <h1 className="currentIngredientName col-xs-11 col-md-11">{ingredientName}
                            </h1>
                            <button className="back-button-ingredient col-xs-1 col-md-1"
                                    onClick={() => this.props.handleClickBack()}>X
                            </button>
                        </div>
                    </div>
                        <div className="current-ingredient-information">
                            {this.renderNutritionInformation()}
                            {this.renderNutritionGraph()}
                        </div>
                    </div>
                </div>

        );
    }
}

export default CurrentIngredientPage
