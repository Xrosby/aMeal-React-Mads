import React, {Component} from 'react'
import '../css/DislikeManager.css'

class DislikeManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dislikes: this.props.dislikes,
            searchedDislikes: []
        }
    }

    emptySearch = () => {
        this.setState({
            searchedDislikes: []
        })
    }

    handleInputChange = (e) => {

        let query = e.target.value
        let url = "https://ameal.io:8080/ingredients/byName/" + query + "?applicationToken=TOKEN@1"
        let updateSearchFunc = this.updateSearchedDislikes.bind(this)
        if( query === ""){
            this.emptySearch()
        }

        if (query !== "") {
            fetch(url).then(function (response) {
                return response.json()
            }).then(function (json) {
                updateSearchFunc(json.data)
            })
        }
    }

    updateSearchedDislikes = (searchedDislikes) => {

        if (searchedDislikes !== undefined) {
            for (let dislike of this.state.dislikes) {
                searchedDislikes = searchedDislikes.filter(searchedDislike => searchedDislike.id !== dislike.id)
            }
        }
        this.setState({
            searchedDislikes: searchedDislikes
        })


    }

    removeDislikeFromSearch = (toRemove) => {
        let filteredArray = this.state.searchedDislikes.filter(searchedDislike => searchedDislike.id != toRemove.id)
        this.setState({
            searchedDislikes: filteredArray
        })
    }

    handleAddNewDislike = (e) => {

        let newDislike = this.state.searchedDislikes.filter(dislike => dislike.id == e.target.id)[0]
        this.removeDislikeFromSearch(newDislike)

        if (!this.dislikeAlreadyPresent(newDislike)) {
            let updatedDislikes = this.state.dislikes
            updatedDislikes.push(newDislike)
            this.setState({
                dislikes: updatedDislikes
            }, function(){
                this.props.updateUserDislikes(this.state.dislikes)
            })
        }
    }

    handleRemoveDislike = (e) => {

        let idToRemove = e.target.id
        let filteredArray = this.state.dislikes.filter(dislike => dislike.id != idToRemove);
        this.setState({
            dislikes: filteredArray
        }, function() {
            this.props.updateUserDislikes(this.state.dislikes)
        })

    }


    dislikeAlreadyPresent = (dislikeToTest) => {
        for (let dislike of this.state.dislikes) {
            if (dislike.id === dislikeToTest.id) {
                return true
            }
        }
        return false
    }


    renderSearchForDislikes = () => {
        let searchDislikeElements = []
        if (this.state.searchedDislikes) {
            for (let dislike of this.state.searchedDislikes) {
                searchDislikeElements.push(<div
                    key={dislike.id}
                    id={dislike.id}
                    onClick={(e) => this.handleAddNewDislike(e)}
                    className="dislike">{dislike.name}</div>)
            }
        }
        return (
            <div className="dislike-search-container col-md-2">
                <input
                    onChange={(e) => this.handleInputChange(e)}
                    placeholder="Tilføj dislikes.."
                    className="search-dislike-ingredient"
                    type="text"/>
                <div className="elements-container">
                    {searchDislikeElements}
                </div>
            </div>)
    }

    renderDislikes = () => {
        let dislikeArray = []
        for (let dislike of this.state.dislikes) {
            dislikeArray.push(
                <div
                    id={dislike.id}
                    key={dislike.id}
                    className="dislike"
                    onClick={(e) => this.handleRemoveDislike(e)}
                >{dislike.name}
                </div>)
        }
        return (<div
            className='dislike-container col-md-2'>
            <div
                className="existing-dislike-header">Dislikes
            </div>
            <div
                className="elements-container">{dislikeArray}
            </div>
        </div>)
    }


    render() {
        return (
            <div className="dislike-manager-container">
                {this.renderDislikes()}
                {this.renderSearchForDislikes()}
            </div>
        );
    }
}

export default DislikeManager
