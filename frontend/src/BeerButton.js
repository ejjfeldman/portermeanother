import React, { Component } from 'react';
import cap from './cap.png';
import {Link} from 'react-router';

class BeerButton extends Component {
    render() {
        return (

            // create onclick for <a> tag that will call the randomBeer function which will call gain access of the beer API data, which will call the beerRandomizer function, which will return a random beer image and details, which will display the image
            <div>
            <div>
               <Link to="/beerResult"> <img alt="beercap" onClick ={ () => {this.props.clickBeer} }src={cap} className="App-logo beerCap " alt="logo" /></Link>
            </div>
                <h2>Beer Me</h2>
                <Link to="/Form"><button className="btn btn-secondary" onClick={this.props.returnForm}>Narrow my search</button>
                </Link>
            </div>
        )
    }
}


export default BeerButton;