import React, { Component } from 'react';
import './App.css';

import { Link } from 'react-router';
import axios from 'axios';
import {browserHistory} from 'react-router';
import DialogBox from './DialogBox'

//default beer images for each style
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
      returnedBeer: "",
      open: false,
      printAvailability: ""
    }
    this.clickBeer = this.clickBeer.bind(this);
    this.returnForm = this.returnForm.bind(this);
    this.getRandomBeer = this.getRandomBeer.bind(this);
    this.passStateUp = this.passStateUp.bind(this);
    this.getDefaultBeerImage = this.getDefaultBeerImage.bind(this);

    // this.getRandomBeer();
   // this.getSpecificBeer(); 

  }
  //alert for when the beer is not available
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    browserHistory.push("/form")
  };

  //getting a random beer 
  getRandomBeer() {
    console.log("get random beer ran")
    this.setState({
      hasBeer: false
    })
    axios.get("/randombeer")
      .then(res => {

        let randomBeer = res.data.breweryDB;
        let availability = res.data.lcbo;
        if (availability.pager && availability.pager.total_record_count === 0){
          console.log("try "+ availability.suggestion + " instead")
          this.setState({
            printAvailability: "I'm sorry but your beer is not available at the LCBO. You should try the beer *"+ availability.suggestion +"* instead!"
          })
      }
      else {
        this.setState({
          printAvailability: "This beer is available at the LCBO!"
        })
          
      }
        console.log("availability", availability.total_record_count)
        console.log(randomBeer);
        this.setState({
          returnedBeer: randomBeer,
          hasBeer: true,
        })
      })

      .catch(error => {
        console.log(error);
      })
  }

  getSpecificBeer(valuesToUse) {
    //trying to console.log to see when beer is retrieved
    
    axios.post("/specificbeer", {formResults: valuesToUse})
      .then(res=>{

        let specificBeer = res.data.filter((beer) => {
          console.log("RES", beer)
          if(!beer || !(beer.style) || !(beer.style.category) || !(beer.style.name)){
            return false
          }
          console.log("comparing ", beer.style.name.toLowerCase(), "to", valuesToUse.beerType)
          return beer.style.name.toLowerCase().includes( valuesToUse.beerType );
          //return true if it goes in specificBeer
        });
        let oneBeer = specificBeer[Math.floor(Math.random()*specificBeer.length)];
        this.setState({
          returnedBeer: oneBeer,
          hasBeer: true
        })
        console.log("last", this.state.returnedBeer)
        if (this.state.returnedBeer===undefined && !this.state.open){
          this.handleOpen()
        }
          
      })
      .catch(error=>{
        console.log(error);
      })
      browserHistory.push("/specificResult")
  }

  passStateUp(valuesToUse) {
    console.log("called")
    this.setState({ formResults: valuesToUse })
    this.getSpecificBeer(valuesToUse)
  }

  clickBeer() {
    console.log("clicked")
  }
  //onclick "Narrow my search" button, pop up form
  returnForm() {
    console.log("clicked")
  }

  getDefaultBeerImage(beer) {
    if(!beer.style){
      return beerImage.wheat;
    }
    let beerStyle = beer.style.name;
    let beerNames = Object.keys(beerImage);
    console.log(beerNames);
    console.log(beerStyle);

    for (var i = 0; i < beerNames.length; i++) {
      if (beerStyle.toLowerCase().includes(beerNames[i])){
        return beerImage[beerNames[i]]
      }
      }
      return beerImage.wheat;
    }

  render() {
    let box;
    if(this.state.open){
      box= <DialogBox handleClose={this.handleClose} open={this.state.open}/>
    }
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
        {box}
  <div className="mainHeader">     
  <div id="pour"></div>
  <div id="beaker">
    <div className="beer-foam">
      <div className="foam-1"></div>
      <div className="foam-2"></div>
      <div className="foam-3"></div>
      <div className="foam-4"></div>
      <div className="foam-5"></div>
      <div className="foam-6"></div>
      <div className="foam-7"></div>
      <div className="foam-8"></div>
      <div className="foam-9"></div>
      <div className="foam-10"></div>
      <div className="foam-11"></div>
      <div className="foam-12"></div>
      <div className="foam-13"></div>
      <div className="foam-14"></div>
      <div className="foam-15"></div>
       <div className="foam-16"></div>
       <div className="foam-17"></div>
       <div className="foam-18"></div>
       <div className="foam-19"></div>
       <div className="foam-20"></div>
       <div className="foam-21"></div>
       <div className="foam-22"></div>
       <div className="foam-23"></div>
       <div className="foam-24"></div>
       <div className="foam-25"></div>
       <div className="foam-26"></div>
       <div className="foam-27"></div>
       <div className="foam-28"></div>
       <div className="foam-29"></div>
       <div className="foam-30"></div>
       <div className="foam-31"></div>
       <div className="foam-32"></div>
       <div className="foam-33"></div>
       <div className="foam-34"></div>
    </div>
    
    <div id="liquid">
      
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
      <div className="bubble bubble4"></div>
      <div className="bubble bubble5"></div>
      <div className="bubble bubble6"></div>
      <div className="bubble bubble7"></div>
      <div className="bubble bubble8"></div>
      <div className="bubble bubble9"></div>
      <div className="bubble bubble10"></div>
      <div className="bubble bubble11"></div>
      <div className="bubble bubble12"></div>
      <div className="bubble bubble13"></div>
      <div className="bubble bubble14"></div>
      <div className="bubble bubble15"></div>
      <div className="bubble bubble16"></div>
      <div className="bubble bubble17"></div>
      <div className="bubble bubble18"></div>
      <div className="bubble bubble19"></div>
      <div className="bubble bubble20"></div>
      <div className="bubble bubble21"></div>
      <div className="bubble bubble22"></div>
    </div>
    <div className="App-header jumbotron" id="header">
          <h1>Porter Me Another</h1>
          <p>Don't Wine, Have a Beer</p>
        </div>
  </div>
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
            "specificBeer": this.getSpecificBeer,
            printAvailability: this.state.printAvailability
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
