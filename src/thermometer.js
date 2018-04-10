import React from 'react';

const alertBoilingStyle = {
  color: 'red',
  fontWeight: '600',
}

const alertFreezingStyle ={
  color: 'blue',
  fontWeight: '600',
}

const noAlertStyle ={
  color: 'black',
  fonweight: '300',
}

export default class Thermometer extends React.Component {
  constructor() {
    super()
    this.state = {
      fahrenheight: 0,
      celsius: 0,
      unit: "celsius",
      freezingThreshold: 0,
      boilingThreshold: 0,
      difference: 0,
      direction: 0
    }
    this.setFreezingThreshold.bind(this)
    this.setBoilingThreshold.bind(this)
    this.calcTemp.bind(this)
  }
  componentWillMount() {

    if(this.props.data.unit === 'celsius') {
      this.setState({
        unit: this.props.data.unit,
        celsius: this.props.data.temp
      })
    }

    else {
      this.setState({
        unit: this.props.data.unit,
        fahrenheight: this.props.data.temp
      })
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    let {freezing, boiling, direction}  = this.state
    console.log(direction)
    let {celsius,fahrenheight} = this.calcTemp(nextProps.data.unit, nextProps.data.temp);



    if(this.state.unit === 'celsius' && celsius !== this.state.celsius) {
      freezing = this.checkThreshHold(celsius, this.state.celsius, direction);
      boiling =  this.checkThreshHold(celsius, this.state.celsius, direction);
    }

    else if(this.state.unit === 'fahrenheight' && fahrenheight !== this.state.fahrenheight) {
      freezing = this.checkThreshHold(fahrenheight, this.state.fahrenheight, direction);
      boiling =  this.checkThreshHold(fahrenheight, this.state.fahrenheight, direction);
    }
      this.setState({
        celsius,
        fahrenheight,
        freezing,
        boiling
      })
  }

  calcTemp(from, temp) {
    let celsius = this.state.celsius;
    let fahrenheight = this.state.fahrenheight;
    switch (from) {
      case 'celsius':
        if(Math.abs(temp - this.state.celsius) > this.state.difference) {
          fahrenheight = temp * 9 / 5 + 32
          celsius = temp
        }
        break
      case 'fahrenheight':
        if(Math.abs(temp - this.state.fahrenheight) > this.state.difference) {
          celsius = (temp - 32) * (5 / 9)
          fahrenheight = temp
        }
        break
      default:
        console.log('Error: invalid units')
    }
    return {celsius, fahrenheight}

  }

  //function called when temperature hits a threshold
  checkThreshHold (newTemp, prevTemp, direction) {

    switch(direction){
      case 0:
        return true
      case 1:
         return (newTemp - prevTemp) >= 0
      case -1:
        return (prevTemp - newTemp) >= 0
    }

  }

  getfahrenheight = () => {
    this.setState({
      unit: 'fahrenheight'
    })
    return this.state.fahrenheight
}

  getCelsius = () =>{
    this.setState({
      unit: 'celsius'
    })
    return this.state.celsius
  }

  setFreezingThreshold = (value) => {
    this.setState({
      freezingThreshold: Number(value)
    })
}

  setBoilingThreshold = (value) => {
    this.setState({
      BoilingThreshold: Number(value)
    })
  }

  handleFreezingChange = (event) => {
    this.setState({
      freezingThreshold: Number(event.target.value),
    })
  }

  handleBoilingChange = (event) => {
    this.setState({
      boilingThreshold: Number(event.target.value),

    })
  }

  handleDifference = (event) => {
    this.setState({
      difference: Number(event.target.value),
    })
  }

  toggleUnits = () => {
    this.setState({
      unit: this.state.unit === 'celsius'? 'fahrenheight' : 'celsius'
    })
  }

  render () {
    return (
      <div style={{width: '100%'}}>
        <div className={'displayTemp'} style={{width: "100%", textAlign: "center"}}>
          {this.state.unit === 'celsius' ? `The Temperature is ${this.state.celsius} Degrees Celsius`:
            `The Temperature is ${this.state.fahrenheight} Degrees Fahrenheight`
          }</div>
        <div style={{textAlign: "center"}}>
          <div style={this.state.boiling? alertBoilingStyle : noAlertStyle}>
            Boiling - {this.state.boiling ? 'Yes' : "No"}
          </div>
          <div style={this.state.freezing ? alertFreezingStyle : noAlertStyle}>
            Freezing - {this.state.freezing ? 'Yes' : "No"}
          </div>
        </div>

        <div style={{width: '100%'}}>
          <button onClick={this.props.handleStart}>Start</button>
          <button onClick={this.getfahrenheight}>Show Fahrenheight</button>
          <button onClick={this.getCelsius}>Show Celsius</button>
          <button onClick={this.props.handleStop}>Stop</button>
        </div>

        <div style={{width: '100%'}}>
            <div>
              <span style={{marginRight: "30px"}}> Set Freezing Point</span>
              <input type='number' onChange={this.handleFreezingChange} value={this.state.freezingThreshold}/>
              <button onClick={this.toggleUnits}>{this.state.unit}</button>
            </div>
            <div>
              <span style={{marginRight: "30px"}}> Set Boiling Point</span>
              <input type='number' onChange={this.handleBoilingChange} value={this.state.BoilingThreshold}/>
            </div>
        </div>
        <div style={{width: '100%'}}>
          <div>
            <span style={{marginRight: "30px"}}> Ignore +/- </span>
            <input type='number' onChange={this.handleDifference} value={this.state.difference}/>
            <span style={{marginRight: "30px"}}> changes</span>

          </div>
        </div>


      </div>



    )



  }




}

module.export = Thermometer;