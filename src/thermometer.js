import React from 'react';



export default class Thermometer extends React.Component {
  constructor() {
    super()
    this.state = {
      fahrenheight: 0,
      celsius: 0,
      freezing: false,
      boiling: false,
      unit: "celsius",
      freezingThreshold: 0,
      boilingThreshold: 0
    }
    this.setFreezingThreshold.bind(this)
    this.setBoilingThreshold.bind(this)
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps')
    console.log(nextProps)
    this.calcTemp(nextProps.data.unit, nextProps.data.temp);
  }

  calcTemp(from, temp) {
    switch (from) {
      case 'celsius':
        let fahrenheight = temp * 9/5 + 32
        this.setState({
          fahrenheight,
          celsius: temp
        })
        break
      case 'fahrenheight':
        let celsius = (temp - 32) * (5/9)
        this.setState({
          celsius,
          fahrenheight: temp
        })
        break
      default:
        console.log('Error: invalid units')
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
      freezingThreshold: event.target.value,
    })
  }

  handleBoilingChange = (event) => {
    this.setState({
      BoilingThreshold: event.target.value,

    })
  }

  render () {
    return (
      <div style={{width: '100%'}}>
        <div className={'displayTemp'} style={{width: "100%", textAlign: "center"}}>
          {this.state.unit === 'celsius' ? `The Temperature is ${this.state.celsius} Degrees Celsius`:
            `The Temperature is ${this.state.fahrenheight} Degrees Fahrenheight`
          }</div>
        <div style={{width: "50%"}}>
          Boiling - {this.state.boiling ? 'Yes' : "No"}
        </div>
        <div style={{width: "50%"}}>
          Freezing - {this.state.freezing ? 'Yes' : "No"}
        </div>

        <div style={{width: '100%'}}>
          <button onClick={this.props.handleStart}>Start</button>
          <button onClick={this.getfahrenheight}>Show Fahrenheight</button>
          <button onClick={this.getCelsius}>Show Celsius</button>
        </div>

        <div style={{width: '100%'}}>
            <div>
              <span style={{marginRight: "30px"}}> Set Freezing point</span>
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