import React from 'react';
import LandingPage from './components/LandingPage.js';

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