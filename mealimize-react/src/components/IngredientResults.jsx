import React, {Component} from 'react'
import '../css/IngredientResults.css'
import Ingredient from './Ingredient'
import Loading from "./Loading";

class IngredientResults extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loading: true
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }


    renderIngredients = () => {
        let ingredients = this.props.ingredients;
        let ingredientArray = []
        const rowLength = 5;

        if(ingredients !== undefined) {

            for (let i = 0; i < ingredients.length; i += rowLength) {
                let currIngredientRow = ingredients.slice(i, i + rowLength);
                ingredientArray.push(
                    <IngredientRow
                        key={i}
                        handleIngredientClick={this.props.handleIngredientClick}
                        ingredients={currIngredientRow}
                    />
                )
            }
        }

        return ingredientArray
    }

    render() {

        if(this.state.loading){
            return <Loading/>
        }else {
            return (
                <div className='ingredient-results'>{this.renderIngredients()}</div>
            )
        }
    }
}

export default IngredientResults

function IngredientRow(props) {

    let row = [];
    for (let ingredient of props.ingredients) {
        let id = ingredient.id
        row.push(<div className="col-md-2 panel"><Ingredient handleIngredientClick={props.handleIngredientClick} key={id} ingredient={ingredient}/></div>)
    }
    return (
        <div className="row">{row}</div>
    )

}
