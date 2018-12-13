import React, {Component} from 'react'
import '../css/Loading.css'

class Loading extends Component {
    render() {
        return (
            <div className="loading-spinner-container">
                <img
                    className="loading-image"
                    src="https://loading.io/spinners/spin/lg.ajax-spinner-gif.gif"
                    alt="Loading"
                />
            </div>
        );
    }
}
export default Loading
