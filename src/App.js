import React, { useEffect, createContext, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { initialState, reducer } from './reducer';

import ErrorPage from './pages/ErrorPage/ErrorPage';
import Homepage from './pages/Homepage/Homepage';
import Footer from './components/Footer/Footer';
import TopArrow from './components/TopArrow/TopArrow';


// Creating context for global state management
export const Store = createContext();


const App = () => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const abortController = new AbortController();

  useEffect(() => {
    // Getting IDs of all top stories
    fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`, {signal: abortController.signal})
    .then(response => response.json())
    .then(data => {

      let total = data.length;
      dispatch({type: 'SET_STORIES_ID', stories: data, total: total});
    })
    
    return () => {
      abortController.abort()
    }

    // eslint-disable-next-line
  },[])

  return (
    <Router>
      <Store.Provider value={{store: store, dispatch: dispatch}}>
        <div className="App">
          <Switch>
            <Route path='/' exact component={Homepage} />
            <Route path='/news' component={Homepage} />
            <Route component={ErrorPage} />
          </Switch>
          <Footer />
          <TopArrow />
        </div>
      </Store.Provider>
    </Router>
  );
}

export default App;
