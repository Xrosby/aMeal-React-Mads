import React, {Component} from 'react'
import '../css/NutritionGraph.css'
import AmCharts from "@amcharts/amcharts3-react";
import Loading from "./Loading";

class NutritionGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredient: this.props.ingredient,
            recipe: this.props.recipe,
            loading: true
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    makeIngredientData = () => {
        let data = [
            {
                name: "Protein",
                value: this.state.ingredient.protein
            },
            {
                name: "Kulhydrater",
                value: this.state.ingredient.carbohydrates
            },
            {
                name: "Fedt",
                value: this.state.ingredient.fat
            }
        ]

        return data;

    }

    makeRecipeData = () => {

        let protein = 0;
        let carbohydrates = 0;
        let fat = 0;

        for(let ingredient of this.state.recipe.ingredientList) {
                protein += ingredient.ingredient.protein;
                carbohydrates += ingredient.ingredient.carbohydrates;
                fat += ingredient.ingredient.fat;
            }


        let data = [
            {
                name: "Protein",
                value: protein
            },
            {
                name: "Kulhydrater",
                value: carbohydrates
            },
            {
                name: "Fedt",
                value: fat
            }
        ]

        return data;

    }


    renderGraph = () => {

        let data = []
        if(this.state.ingredient !== undefined){
            data = this.makeIngredientData();
        } else if(this.state.recipe !== undefined) {
           data = this.makeRecipeData()
        }


        let reactChart = (
            <AmCharts.React
                className="my-class"
                style={{
                    width: "100%",
                    height: "500px"
                }}
                options={{
                    "type": "pie",
                    "theme": "light",
                    "dataProvider": data,
                    "valueField": "value",
                    "titleField": "name",
                    "balloon": {
                        "fixedPosition": true
                    },
                    "export": {
                        "enabled": true,
                        "menu": []
                    }
                }} />
        )


        return(
            <div className="graph">{reactChart}</div>
        )
    }

    render() {
        if(this.state.loading) {
            return <Loading/>
        } else {
            return (
                <div>
                    {this.renderGraph()}
                </div>
            );
        }
    }
}

export default NutritionGraph

