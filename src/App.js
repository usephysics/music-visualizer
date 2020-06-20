import React from 'react';
import LandingPage from './components/LandingPage.js';
import './css/App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <LandingPage/>
      </>
    )
  }
}