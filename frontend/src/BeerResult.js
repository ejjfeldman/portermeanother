import React, { Component } from 'react';
import { Link } from 'react-router';

class BeerResult extends Component {
    render() {

        if (!this.props.hasBeer) {
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
        else if(!this.props.returnedBeer.labels){
               beerImage= this.props.getDefaultBeerImage(this.props.returnedBeer)
        } 

        let beerStyle;

        if (this.props.returnedBeer.style.category.name) {
            beerStyle = this.props.returnedBeer.style.category.name
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

                <h2><b>Drink me:</b> {this.props.returnedBeer.name}</h2>

                <p><b>Style:</b> {beerStyle}</p>

                <p><b>Description:</b> {beerDescription}</p>
                <p><b>ABV:</b> {beerABV}</p>
                <p><b>IBU:</b> {beerIBU}</p>
                <img className="image" alt="beer result" src={beerImage} />
                <br />
                <p><b>{this.props.printAvailability}</b></p>
                <button className="btn btn-primary result-button" onClick={() => { this.props.clickBeer() }}> Beer me again!</button>
                <Link to="/Form"><button className="btn btn-secondary result-button" onClick={this.props.returnForm}>Narrow my search</button></Link>
            </div>
        )
    }
}


export default BeerResult;