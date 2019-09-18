import React from 'react';
import './App.css';

import PackagesForm from './components/PackagesForm.jsx'
import Statistics from './components/Statistics.jsx'

import { parse } from 'query-string';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: parse(window.location.search),
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <PackagesForm package={this.state.query.package} range={this.state.query.range} />
        <Statistics package={this.state.query.package} range={this.state.query.range} />
        </header>
      </div>
    );
  }
}
