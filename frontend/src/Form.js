import React, { Component } from 'react';
import { Link } from 'react-router';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            formValues: {
                beerType: '',
                abv: '',
                ibu: ''
            }

        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    //orginal, works for one entry
    // getValues(event){
    //     let selectValue = event.target.value;
    //     // let selectAbv = event.target.abv;
    //     this.props.handleChange(selectValue);
    // }

    //second attempt
    getValues(event) {
        let questionClicked = event.target.dataset.question;
        console.log(questionClicked);
        let value = event.target.value;
        this.handleChange(questionClicked, value);
    }

    //handling form attempt 2

    handleChange(questionClicked, value) {
        //this.state...this.props...
        if (this.state.formValues === undefined) {
            //unsure about this line
            this.setState({ formValues: { [questionClicked]: value } })
            console.log('new state below')
            console.log(this.state.formValues)
        }
        else {
            let prevFormVals = this.state.formValues;
            prevFormVals[questionClicked] = value;
            this.setState({ formValues: prevFormVals });
            console.log(this.state.formValues)
        }
    }

    onSubmit(e){
        e.preventDefault();
        let valuesToUse = this.state.formValues;
        this.props.passStateUp(valuesToUse);
        // console.log(valuesToUse);
    }
    render() {
        return (
            <div>
                <form className="form" onSubmit={(e) => {this.onSubmit(e)}}>
                    <div className="form-group">
                        Select your style of beer:
                            <br />
                        {/* error for value when changed */}
                        <select data-question="beerType" name="type" onChange={(e) => { this.getValues(e) }}>
                            <option value="" defaultValue>Surprise me!</option>
                            <option value="ale">Ale</option>
                            <option value="lager">Lager</option>
                            <option value="pilsner">Pilsner</option>
                            <option value="stout">Stout</option>
                            <option value="ipa">Indian Pale Ale</option>
                            <option value="wheat">Wheat Beer</option>
                            <option value="porter">Porter</option>
                            <option value="saison">Saison</option>
                            <option value="apa">American Pale Ale</option>
                            <option value="sour">Sour Beer</option>
                        </select>
                    </div>
                    <div className="form-group" onChange={(e) => { this.getValues(e) }}>
                        <br />ABV%
                        <div>
                            <label className="radio">
                                <input id="anyabv" data-question="abv" type="radio" name="abv" value="" />
                                Any</label>
                            <label className="radio">
                                <input id="-4" data-question="abv" type="radio" name="abv" value="-4"/>
                                Less than 4%</label>
                            <label className="radio">
                                <input id="4,6" data-question="abv" type="radio" name="abv" value="4,6" />
                                Between 4% and 6%</label>
                            <label className="radio">
                                <input id="+6" data-question="abv" type="radio" name="abv" value="+6" />
                                More than 6%</label>
                        </div>
                    </div>

                    <div className="form-group" onChange={(e) => { this.getValues(e) }}>
                        IBU
                        <br />
                        <label className="radio">
                            <input id="anyibu" data-question="ibu" type="radio" name="ibu" value="" />
                            Any IBU</label>
                        <label className="radio">
                            <input id="less25" data-question="ibu" type="radio" name="ibu" value="-25" />
                            Less than 25 IBU</label>
                        <label className="radio">
                            <input id="26to70" data-question="ibu" type="radio" name="ibu" value="26,70" />
                            Between 26 and 70 IBU</label>
                        <label className="radio">
                            <input id="71to120" data-question="ibu" type="radio" name="ibu" value="71,120" />
                            Between 71 and 120 IBU</label>
                        <label className="radio">
                            <input id="more121" data-question="ibu" type="radio" name="ibu" value="+121" />
                            More than 121 IBU</label>
                    </div>
                    <div>
                    {/* <Link to="/specificBeer"> */}
                    <input className="btn btn-primary" type="submit" value="Beer Me!" />
                    </div>
                </form>
            </div>
        )
    }
}


export default Form;