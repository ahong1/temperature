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
        dataPoint: 0,
        freezingPoint: 0,
        boilingPoint: 0,
        difference: 0,
        direction: 0,
        units: 'celsius'

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
      }.bind(this), 100)
    })
  }

  handleStop = () => {
    clearInterval(this.state.simulation);
  }

  handleDifference = (event) => {
    this.setState({
      difference: Number(event.target.value),
    })
  }

  handleFreezingChange = (event) => {
    this.setState({
      freezingPoint: Number(event.target.value),
    })
  }

  handleBoilingChange = (event) => {
    this.setState({
      boilingPoint: Number(event.target.value),

    })
  }

  toggleUnits = () => {
    this.setState({
      units: this.state.unit === 'celsius'? 'fahrenheight' : 'celsius'
    })
  }

  getfahrenheight = () => {
    this.setState({
      units: 'fahrenheight'
    })
    return this.state.fahrenheight
  }

  getCelsius = () =>{
    this.setState({
      units: 'celsius'
    })
    return this.state.celsius
  }

  handleDirection = (id) => {
    this.setState({
      direction: id
    })
}

  render() {
    const {freezingPoint, boilingPoint, difference, direction} = this.state;

    const settings = {
      freezingPoint,
      boilingPoint,
      difference,
      direction
    }

    return (
      <div className="App">
        <Thermometer data={this.state.currentData} settings={settings} handleStart={this.handleStart} handleStop={this.handleStop} units={this.state.units}/>

        <div style={{width: '100%'}}>
          <button onClick={this.handleStart}>Start</button>
          <button onClick={this.getfahrenheight}>Show Fahrenheight</button>
          <button onClick={this.getCelsius}>Show Celsius</button>
          <button onClick={this.handleStop}>Stop</button>
        </div>

        <div style={{width: '100%'}}>
          <div>
            <span style={{marginRight: "30px"}}> Set Freezing Point</span>
            <input type='number' onChange={this.handleFreezingChange} value={this.state.freezingPoint}/>
            <button onClick={this.toggleUnits}>{this.state.unit}</button>
          </div>
          <div>
            <span style={{marginRight: "30px"}}> Set Boiling Point</span>
            <input type='number' onChange={this.handleBoilingChange} value={this.state.boilingPoint}/>
          </div>
        </div>
        <div style={{width: '100%'}}>
          <div>
            <span style={{marginRight: "30px"}}> Ignore +/- </span>
            <input type='number' onChange={this.handleDifference} value={this.state.difference}/>
            <span style={{marginRight: "30px"}}> changes</span>
          </div>

          <div>
            <span style={{marginRight: "30px"}}> Direction </span>
            <button id={1} onClick={(event) => this.handleDirection(1)}>Ascending</button>
            <button id={2} onClick={(event) => this.handleDirection(-1)}>Decending</button>
            <button id={3} onClick={(event) => this.handleDirection(0)}>None</button>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
