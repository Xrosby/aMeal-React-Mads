import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import '../css/Main.css'
import FrontPage from './FrontPage'
import MealplanPage from './MealplanPage'
import RecipePage from './RecipePage'
import IngredientPage from './IngredientPage'
import UserPage from './UserPage'
import AboutPage from './AboutPage'
import CurrentRecipePage from './CurrentRecipePage'


class Main extends Component {


    render() {
        return (
            <div className="container-fluid">
            <main>
                <Switch>
                    <Route exact path='/frontpage' component={ FrontPage } />
                    <Route exact path='/mealplans' component={ MealplanPage } />
                    <Route exact path="/recipes" component= { RecipePage }/>
                    <Route exact path="/ingredients" component= { IngredientPage }/>
                    <Route exact path="/user" component= { UserPage }/>
                    <Route exact path="/about" component= { AboutPage }/>
                    <Route exact path="/currentRecipe" component={CurrentRecipePage}/>
                </Switch>
            </main>
            </div>
        );
    }

}

export default Main