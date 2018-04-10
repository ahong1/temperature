import React, { Component } from 'react';
import './App.css';
import Thermometer from './thermometer.js';
import {test1data} from './test1.js';

class App extends Component {

  constructor(){
    super()
    this.state =
      {
        currentData: test1data[0],
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

  handleStop = () => {
    clearInterval(this.state.simulation);
  }





  render() {
    return (
      <div className="App">
        <Thermometer data={this.state.currentData} handleStart={this.handleStart} handleStop={this.handleStop}/>
      </div>
    );
  }
}

export default App;
