import React, {Component} from 'react'
import '../css/SearchForm.css'

class SearchForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchFunction: this.props.searchFunction,
            query: ''
        }
    }

    handleInputChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.state.searchFunction(this.state.query)
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="wrap">
                    <input type="text" name="name" placeholder="Søg..."
                           onChange={this.handleInputChange} onKeyUp={(e) => {
                        this.handleKeyPress(e)
                    }}
                    />
                    <button className="btn btn-success" id="searchButton"
                            onClick={(e) => {
                                this.state.searchFunction(this.state.query)
                            }}>Søg
                    </button>
                </div>
            </div>

        )
    }
}

export default SearchForm;


