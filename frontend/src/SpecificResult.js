import React, { Component } from 'react';
import { Link } from 'react-router';

class SpecificResult extends Component {
    render() {

        if (!this.props.returnedBeer) {
            return (
                <h1> WAITING TO GET LOADED </h1>
            )
        }
        // console.log(this.props.returnedBeer.labels.large)

        let beerImage;
        // check if label field exists, and if it does, use the large field
        if (this.props.returnedBeer.labels && this.props.returnedBeer.labels.large) {
            beerImage = this.props.returnedBeer.labels.large
        }
        // otherwise use a default
        //     else if(this.props.returnedBeer.labels == null){
        //         this.props.getDefaultBeerImage(this.props.returnedBeer)
        // } 
        else {
            // this.props.getDefaultBeerImage(this.props.returnedBeer)
            beerImage = "bottle.jpg"
        }
        //write function to change image based on specific style beer
        // getDefaultImage(style)

        let beerName;

        if(!this.props.returnedBeer){
            alert("Unfortunately there are no available beers that fit your description. Please try again!")
        }
        else{
            beerName=this.props.returnedBeer.name
        }

        let beerStyle;

        if (this.props.returnedBeer.style.name) {
            beerStyle = this.props.returnedBeer.style.name
        }
        else {
            beerStyle = "An awesome (yet unfound) beer style!"
        }

        let beerDescription;

        if (this.props.returnedBeer.description) {
            beerDescription = this.props.returnedBeer.description
        }
        else {
            beerDescription = "A delicious beverage!"
        }
        let beerABV;

        if (this.props.returnedBeer.abv) {
            beerABV = this.props.returnedBeer.abv
        }
        else {
            beerABV = "An ABV above 0!"
        }

        let beerIBU;

        if (this.props.returnedBeer.ibu) {
            beerIBU = this.props.returnedBeer.ibu
        }
        else {
            beerIBU = "An IBU above 0!"
        }



        return (
            <div>

                <h2>Drink me: {beerName}</h2>

                <p>Style: {beerStyle}</p>

                <p>Description: {beerDescription}</p>
                <p>ABV: {beerABV}</p>
                <p>IBU: {beerIBU}</p>
                <img className="image" alt="beer result" src={beerImage} />
                <br />
                <button className="btn btn-primary" onClick={() => { this.props.clickBeer() }}> Beer me again!</button>
                <Link to="/Form"><button className="btn btn-secondary" onClick={this.props.returnForm}>Narrow my search</button></Link>
            </div>
        )
    }
}


export default SpecificResult;
