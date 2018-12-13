import React, {Component} from 'react'
import '../css/IngredientList.css'
import Ingredient from "./Ingredient";

class IngredientList extends Component {

    renderList = () => {

        let ingredientList = [];
        for (let ingredientItem of this.props.ingredients) {
            let ingredient = ingredientItem.ingredient
            let amount = ingredientItem.amount
            //let measurementUnit = ingredientItem.measurementUnit
            let style = {
                backgroundColor: 'rgba(0,0,0,0)',
                color: 'black',
                padding: '0px',
                fontSize: '100%'
            }

            ingredientList.push(
                <div className="ingredient-item" key={ingredient.id}>
                    <Ingredient
                        ingredient={ingredient}
                        style={style}
                        key={ingredient.id}
                        handleIngredientClick={this.props.handleIngredientClick}/>
                    <p className="amount-span">{amount}g</p>
                </div>)
        }

        return ingredientList
    }


    render() {
        return (
            <div className="ingredientList">{this.renderList()}</div>
        );
    }
}

export default IngredientList
