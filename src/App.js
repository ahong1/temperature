import React, { Component } from 'react'
import './App.css'
import Thermometer from './thermometer.js'
import { test1data, test2data, test3data, test4data, test5data, test6data, test7data} from './test1.js'

const testData = test1data

class App extends Component {

  constructor () {
    super()
    this.state =
      {
        currentData: testData[0] || null,
        dataPoint: 0,
        freezingPoint: null,
        boilingPoint: null,
        difference: 0,
        direction: 0,
        units: (testData[0] && testData[0].unit) || 'celsius',
        log: ''

      }
    this.addToLog.bind(this)
  }

  handleStart = () => {
    this.setState({
      simulation: setInterval(function () {
        if(testData.length === 0){this.addToLog('No Data!'); clearInterval(this.state.simulation); return}
        if (!testData[this.state.dataPoint]) {
          this.addToLog('End of data')
          clearInterval(this.state.simulation)
          return
        }
        const currentData = testData[this.state.dataPoint]
        this.setState({
          currentData,
          dataPoint: this.state.dataPoint + 1
        })
      }.bind(this), 100)
    })
  }

  handleStop = () => {
    clearInterval(this.state.simulation)
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
      units: this.state.units === 'celsius' ? 'fahrenheit' : 'celsius'
    })
  }

  getfahrenheit = () => {
    this.setState({
      units: 'fahrenheit'
    })
    return this.state.fahrenheit
  }

  getCelsius = () => {
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

  addToLog = (value) => {
    if (value !== '') {
      this.setState({
        log: this.state.log.concat(value)
      })
    }
  }

  render () {
    const {freezingPoint, boilingPoint, difference, direction} = this.state
    const settings = {
      freezingPoint,
      boilingPoint,
      difference,
      direction
    }

    return (
      <div className="App">
        <Thermometer data={this.state.currentData} settings={settings} handleStart={this.handleStart}
                     handleStop={this.handleStop} units={this.state.units} addToLog={this.addToLog}/>

        <div style={{width: '100%'}}>
          <button onClick={this.handleStart}>Start</button>
          <button onClick={this.getfahrenheit}>Show fahrenheit</button>
          <button onClick={this.getCelsius}>Show Celsius</button>
          <button onClick={this.handleStop}>Stop</button>
        </div>

        <div style={{width: '100%'}}>
          <div>
            <span style={{marginRight: '30px'}}> Set Freezing Point</span>
            <input type='number' onChange={this.handleFreezingChange} value={this.state.freezingPoint}/>
            <button onClick={this.toggleUnits}>{this.state.units}</button>
          </div>
          <div>
            <span style={{marginRight: '30px'}}> Set Boiling Point</span>
            <input type='number' onChange={this.handleBoilingChange} value={this.state.boilingPoint}/>
          </div>
        </div>
        <div style={{width: '100%'}}>
          <div>
            <span style={{marginRight: '30px'}}> Ignore +/- </span>
            <input type='number' onChange={this.handleDifference} value={this.state.difference}/>
            <span style={{marginRight: '30px'}}> changes</span>
          </div>

          <div>
            <span style={{marginRight: '30px'}}> Direction </span>
            <button id={1} onClick={() => this.handleDirection(1)}>Ascending</button>
            <button id={2} onClick={() => this.handleDirection(-1)}>Decending</button>
            <button id={3} onClick={() => this.handleDirection(0)}>None</button>
          </div>
        </div>

        <div style={{width: '100%'}}>
          <textarea value={this.state.log} style={{width: '50%', height: '200px'}}/>
        </div>

      </div>
    )
  }
}

export default App
