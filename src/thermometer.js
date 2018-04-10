import React from 'react';

const alertBoilingStyle = {
  color: 'red',
  fontWeight: '600',
  width: "50%"
}

const alertFreezingStyle ={
  color: 'blue',
  fontWeight: '600',
  width: "50%"
}

const noAlertStyle ={
  color: 'black',
  fonweight: '300',
  width: '50%'
}

export default class Thermometer extends React.Component {
  constructor() {
    super()
    this.state = {
      fahrenheight: 0,
      celsius: 0,
      unit: "celsius",
      freezingThreshold: 0,
      boilingThreshold: 0
    }
    this.setFreezingThreshold.bind(this)
    this.setBoilingThreshold.bind(this)
    this.calcTemp.bind(this)
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps')
    console.log(nextProps)
    let {celsius,fahrenheight} = this.calcTemp(nextProps.data.unit, nextProps.data.temp);

    this.setState({
        celsius,
        fahrenheight,
        freezing: (nextProps.data.temp < this.state.freezingThreshold),
        boiling: (nextProps.data.temp > this.state.boilingThreshold)
    })


  }

  calcTemp(from, temp) {
    let celsius, fahrenheight;
    switch (from) {
      case 'celsius':
        fahrenheight = temp * 9/5 + 32
        celsius = temp
        break
      case 'fahrenheight':
        celsius = (temp - 32) * (5/9)
        fahrenheight = temp
        break
      default:
        console.log('Error: invalid units')
    }

    return {celsius, fahrenheight}

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

  render () {
    return (
      <div style={{width: '100%'}}>
        <div className={'displayTemp'} style={{width: "100%", textAlign: "center"}}>
          {this.state.unit === 'celsius' ? `The Temperature is ${this.state.celsius} Degrees Celsius`:
            `The Temperature is ${this.state.fahrenheight} Degrees Fahrenheight`
          }</div>
        <div style={this.state.boiling? alertBoilingStyle : noAlertStyle}>
          Boiling - {this.state.boiling ? 'Yes' : "No"}
        </div>
        <div style={this.state.freezing ? alertFreezingStyle : noAlertStyle}>
          Freezing - {this.state.freezing ? 'Yes' : "No"}
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
            </div>
            <div>
              <span style={{marginRight: "30px"}}> Set Boiling Point</span>
              <input type='number' onChange={this.handleBoilingChange} value={this.state.BoilingThreshold}/>
            </div>
        </div>
      </div>



    )



  }




}

module.export = Thermometer;