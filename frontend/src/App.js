import React, { Component } from 'react';
import './App.css';

import { Link } from 'react-router';
import axios from 'axios';
import {browserHistory} from 'react-router';

let beerImage = {
  default: "bottle.jpg",
  ale: 'ale.png',
  apa: "ale.png",
  lager: "lager.png",
  pilsner: 'lager.png',
  stout: "dark.png",
  porter: "dark.png",
  ipa: "wheat.png",
  wheat: "wheat.png",
  sour: "wheat.png",
  saison:"wheat.png",
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      searched: false,
      returnedBeer: null,
      hasBeer: false,
      formResults: {},
      currentBeer: "default",
      returnedBeer: ""
    }
    this.clickBeer = this.clickBeer.bind(this);
    this.returnForm = this.returnForm.bind(this);
    this.getRandomBeer = this.getRandomBeer.bind(this);

    this.passStateUp = this.passStateUp.bind(this);

    this.getDefaultBeerImage = this.getDefaultBeerImage.bind(this);
    //randomBeer contains obtained random beer..need to put in function to refresh/call it

    this.getRandomBeer();
   // this.getSpecificBeer(); // ?
  }
  //getting random beer from onClick (accessing results from brewerydb api)
  getRandomBeer() {
    console.log("get random beer ran")
    this.setState({
      hasBeer: false
    })
    axios.get("/randombeer")
      .then(res => {

        let randomBeer = res.data;
        console.log(randomBeer);
        this.setState({
          returnedBeer: randomBeer,
          hasBeer: true
        })
      })
      // .then(respons=>{
      //   let beerAvailability = respons.body;
      //   console.log(beerAvailability)
      // })
      .catch(error => {
        console.log(error);
      })
  }
  //FIX ME!!
//getting specific beer from form input
  getSpecificBeer(valuesToUse) {
    //trying to console.log to see when beer is retrieved
    
    axios.post("/specificbeer", {formResults: valuesToUse})
      .then(res=>{
        let specificBeer = res.data.filter((beer) => {
          if(!beer || !beer.style.category || !beer.style.name){
            return false
          }
          console.log("comparing ", beer.style.name.toLowerCase(), "to", valuesToUse.beerType)
          return beer.style.name.toLowerCase().includes( valuesToUse.beerType );
          //return true if it goes in specificBeer
        });
        console.log("specific beer", specificBeer);
        console.log("values:", valuesToUse);
        
        // function filterItems(specificBeer) {
        //     return newBeer.filter(function(el) {
        //         return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
        //     })
        //   }

        let oneBeer = specificBeer[Math.floor(Math.random()*specificBeer.length)];
        // console.log(oneBeer);
        this.setState({
          returnedBeer: oneBeer,
          hasBeer: true
        })
        console.log(this.state.returnedBeer)
      })
      .catch(error=>{
        console.log(error);
      })
      browserHistory.push("/specificResult")
  }

  //not setting state...
  passStateUp(valuesToUse) {
    console.log("called")
    this.setState({ formResults: valuesToUse })
    // console.log(this.state.formResults)
    // getRandomBeer()
    this.getSpecificBeer(valuesToUse)
  }

  // getAvailablity(){
  //   axios.get('/availability')
  //   .then(res=>{
  //     let availableBeer = res.data;
  //     console.log(availableBeer)
  //   })
  // }


  //randomBeer function
  clickBeer() {
    console.log("clicked")
  }
  //onclick "Narrow my search" button, pop up form
  returnForm() {
    console.log("clicked")
  }
//FIXXXXXXXX
  //setting default image
  getDefaultBeerImage(beer) {
    let beerStyle = beer.style.name;
    // beerImage[beerStyle]
    let beerNames = Object.keys(beerImage);
    console.log(beerNames);
    console.log(beerStyle);

    for (var i = 0; i < beerNames.length; i++) {
      if (beerStyle.toLowerCase().includes(beerNames[i])){
        let beerImage = beerImage[beerNames[i]]
        return beerImage;
      }
      }
      return beerImage.default;
    }
    // if ((beerStyle.search(/ale/i)) > -1) {
    //   this.setState({beerImage: "ale"})
    // }
    
    // else {
    //   beerImage = "bottle.jpg"
  //   // }
  // }

  // getDefaultBeerImage(beer){
  //   let specificImage = res.data.filter((beer) => {
  //     // if(!beer || !beer.style.category || !beer.style.name){
  //     //   return false
  //     // }
  //     console.log("comparing ", beer.style.name.toLowerCase(), "to", valuesToUse.beerType)
  //     return beer.style.name.toLowerCase().includes( valuesToUse.beerType );
  //     //return true if it goes in specificBeer
  //   });
  //   if(specificImage)
  // }
  // <img src={beerImage[this.props.beerType]}>

  render() {
    // console.log(this.props.children);
    return (
      <div className="App container">
        <div className="navbar navbar-right navbar-static-top">
          <nav>
            <button ><Link to="/"> Home </Link></button>
            <button><Link to="/about"> About </Link></button>
            <button><Link to="/user"> User Login </Link></button>
          </nav>
        </div>
        <br />
        <div className="App-header jumbotron">
          <h1>Porter Me Another</h1>
          <p>Don't Wine, Have a Beer</p>
        </div>
        <div className="mainContent">
          {React.cloneElement(this.props.children, {
            "returnForm": this.returnForm,
            "clickBeer": this.getRandomBeer,
            "searched": this.state.searched,
            "returnedBeer": this.state.returnedBeer,
            "hasBeer": this.state.hasBeer,
            handleSubmit: this.handleSubmit,
            passStateUp: this.passStateUp,
            "getDefaultBeerImage": this.getDefaultBeerImage,
            "specificBeer": this.getSpecificBeer

          })}

          <footer className="App-intro">
            powered by BreweryDB
        </footer>
        </div>
      </div>
    );
  }
}

export default App;
