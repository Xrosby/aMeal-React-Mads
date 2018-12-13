import React, {Component} from 'react'
import '../css/Spinner.css'

class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: 1,
            max: this.props.max,
            min: this.props.min
        }
    }

    addToValue = () => {
        if (this.state.currentValue < this.state.max) {
            let newValue = this.state.currentValue + 1;
            this.setState({
                currentValue: newValue
            })
            this.props.updateValue(newValue)
        }
    }

    subtractFromValue = () => {
        if (this.state.currentValue > this.state.min) {
            let newValue = this.state.currentValue - 1;
            this.setState({
                currentValue: newValue
            })
            this.props.updateValue(newValue)
        }
    }

    render() {
        return (
            <div className="spinner-container">
                <button className="spinner-button spinner-subtract" onClick={() => this.subtractFromValue()}>-</button>
                <input type="number" className="spinner-input" value={this.state.currentValue} readOnly/>
                <button className="spinner-button spinner-add" onClick={() => this.addToValue()}>+</button>
            </div>
        );
    }
}


export default Spinner
