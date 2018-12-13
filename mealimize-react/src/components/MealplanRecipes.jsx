import React, {Component} from 'react'
import Recipe from "./Recipe";
import '../css/MealplanRecipes.css'
import Loading from "./Loading";

class MealplanRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    renderRecipeList = () => {
        let recipes = []
        for (let recipe of this.props.mealplan.recipes) {
            let imageUrl = recipe.image_url_large
            let recipeStyle = {
                backgroundImage: 'url(' + imageUrl + ')',
                width: '100%',
                marginBottom: '1%'
            }
            recipes.push(
                <div key={recipe.id} className="col-md-4">
                    <Recipe style={recipeStyle}
                            key={recipe.id}
                            recipe={recipe}
                            handleRecipeClick={this.props.handleRecipeClick}/>
                </div>)
        }
        return recipes
    }

    render() {

        if(this.state.loading) {
            return <Loading/>
        }else {
            return (
                <div className="row recipe-list">
                    {this.renderRecipeList()}
                </div>
            );
        }
    }
}

export default MealplanRecipes
