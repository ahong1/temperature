import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Thermometer from './thermometer.js';
import {test1data} from './test1.js';

class App extends Component {

  constructor(){
    super()
    this.state =
      {
        currentData: {},
        dataPoint: 0
      }
  }

  handleStart = () => {
    console.log('start')

    this.setState({
      simulation: setInterval(function () {
        console.log(this.state.currentData)
        if(!test1data[this.state.dataPoint]) {clearInterval(this.state.simulation); return;}
        const currentData = test1data[this.state.dataPoint]
        this.setState({
          currentData,
          dataPoint: this.state.dataPoint + 1
        })
      }.bind(this), 1000)
    })
  }





  render() {
    return (
      <div className="App">
        <Thermometer data={this.state.currentData} handleStart={this.handleStart}/>
      </div>
    );
  }
}

export default App;
