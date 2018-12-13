import React, {Component} from 'react'
import '../css/Ingredient.css'

class Ingredient extends Component {
    updateCurrentIngredient = (currentIngredient) => {
        console.log("CUrrent ingedint i INGREDIENT: ", currentIngredient)
        this.props.handleIngredientClick(currentIngredient)
    }

    openIngredientPage = (e) => {
        this.fetchIngredient(e)
    }

    fetchIngredient = (e) => {
        let id = e.target.id;
        let url = 'https://ameal.io:8080/ingredients/byId/' + id + '?applicationToken=TOKEN@1'
        let updateCurrentIngredientFunc = this.updateCurrentIngredient.bind(this);

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                updateCurrentIngredientFunc(myJson.data)
            }).catch("Unable to get ingredient by id:" + id)

    }
    createIngredientElement = (ingredient) => {
        let name = ingredient.name;
        let id = ingredient.id;
        return (
            <div
                style={this.props.style}
                className='ingredient'
                onClick={(e) => this.openIngredientPage(e)}
                id={id}>{name}
            </div>
        )
    }

    render() {

        return (
            this.createIngredientElement(this.props.ingredient)
        );
    }
}


export default Ingredient
