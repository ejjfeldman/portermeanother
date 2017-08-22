import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import BeerButton from './BeerButton';
import About from './About';
import User from './User';
import BeerResult from './BeerResult';
import SpecificResult from './SpecificResult';
import Form from './Form';

import { Router, Route, browserHistory, IndexRoute} from 'react-router';


ReactDOM.render(<Router history={browserHistory}>
    <Route path='/' component={App}>
        <IndexRoute component={BeerButton}/>
        <Route path="about" component={About} />
        <Route path="user" component={User} />
        <Route path="beerResult" component={BeerResult} />
        <Route path="form" component={Form} />
        <Route path="specificResult" component={SpecificResult} />
    </Route>
</Router>, document.getElementById('root'));
registerServiceWorker();
