import React, { Component } from 'react';
import cap from './cap.png';
import { Link } from 'react-router';

class BeerButton extends Component {
    render() {
        return (

            // create onclick for <a> tag that will call the randomBeer function which will call gain access of the beer API data, which will call the beerRandomizer function, which will return a random beer image and details, which will display the image
            <div className="main">
                <div className="wholeButton">
                    <div>
                        <Link to="/beerResult" > <img alt="beercap" src={cap} className="App-logo beerCap " alt="logo" onClick={() => { this.props.clickBeer() }} /></Link>
                    </div>
                    <h2 className="buttonTitle">Beer Me</h2>
                </div>
                <Link to="/Form"><button className="btn btn-secondary clickButton" onClick={this.props.returnForm}>Narrow my search</button>
                </Link>
            </div>
        )
    }
}


export default BeerButton;