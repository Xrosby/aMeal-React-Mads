import React, {Component} from 'react'
import MealplanRecipes from "./MealplanRecipes";
import '../css/Mealplan.css'
import Loading from "./Loading";

class Mealplan extends Component {
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
        return (
            <div className="mealplan-recipes">
                <MealplanRecipes
                    key={this.props.mealplan.id}
                    handleRecipeClick={this.props.handleRecipeClick}
                    mealplan={this.props.mealplan}/>
            </div>
        )
    }

    deleteMealplan = () => {

        let mealplan = this.props.mealplan;
        let confirmValue = window.confirm("Er du sikker på at du vil slette madplanen?")

        if(confirmValue) {
            let url = "https://ameal.io:8080/mealplans/removeMealplan?applicationToken=TOKEN@1"
            fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(mealplan)
            })
                .then(response => response.json())
                .then(() => this.props.handleUpdate()).catch((e) => console.log(e));
        }

    }

    render() {

        if (this.state.loading) {
            return <Loading/>
        } else {
            return (
                <div className="col-md-2 col-lg-4 mealplan-container" >
                    <div className="mealplan-header row">
                        <div className="mealplanName col-md-10">{this.props.mealplan.name}</div>
                        <button className="btn-delete-mealplan col-md-2"
                                onClick={() => this.deleteMealplan()}>X</button>
                    </div>
                    {this.renderRecipeList()}
                </div>
            );
        }
    }
}

export default Mealplan
