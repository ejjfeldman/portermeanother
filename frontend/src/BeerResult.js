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

    

    return(
            <div>

    <h2>Drink me: {this.props.returnedBeer.name}</h2>
    <p>Style: {this.props.returnedBeer.style.name}</p>
    <p>Description: {this.props.returnedBeer.description}</p>
    <p>ABV: {this.props.returnedBeer.abv}</p>
    <p>IBU: {this.props.returnedBeer.ibu}</p>
    <img className="image" alt="beer result" src={beerImage} />
    <br/>
    <button className="btn btn-primary" onClick={() => { this.props.clickBeer() }}> Beer me again!</button>
</div>
        )
    }
}


export default BeerResult;