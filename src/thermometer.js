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
      freezing: false,
      boiling: false
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
    const {settings} = nextProps
    const {boilingPoint, freezingPoint, direction} = settings;
    //ignore new data if the tempurature is within +/- difference
    if(Math.abs(nextProps.data.temp - this.state[nextProps.data.unit]) <= this.state.difference) return;

    // check to see if it crosses threshold
    let {freezing, boiling}  = this.state
    let oldCelsius = this.state.celsius;
    let oldFar = this.state.fahrenheight;
    let {celsius,fahrenheight} = this.calcTemp(nextProps.data.unit, nextProps.data.temp);
    console.log(celsius, fahrenheight,direction)
    let freezingStatus, boilingStatus;

    switch(direction) {
      case 1:
        freezingStatus = freezingPoint <= celsius;
        boilingStatus = boilingPoint <= celsius;
        if(this.state.freezing !== freezingStatus) {
          console.log('crossed freezing threshold')
          this.setState({
            freezing: freezingStatus
          })
        }

        if(this.state.boiling !== boilingStatus) {
          console.log('crossed boiling threshold')
          this.setState({
            boiling: boilingStatus
          })
        }
        break;
      case -1:
        freezingStatus = freezingPoint >= celsius;
        boilingStatus = boilingPoint >= celsius;
        if(this.state.freezing !== freezingStatus) {
          console.log('crossed freezing threshold')
          this.setState({
            freezing: freezingStatus
          })
        }

        if(this.state.boiling !== boilingStatus) {
          console.log('crossed boiling threshold')
          this.setState({
            boiling: boilingStatus
          })
        }


        break;
      case 0:
        break;



    }
    this.setState({
      celsius,
      fahrenheight,
    })


    if(Math.abs(nextProps.data.temp - this.state[nextProps.data.unit]) <= this.state.difference) return;
  }

  calcTemp(from, temp) {
    let {difference} = this.props.settings
    let celsius = this.state.celsius;
    let fahrenheight = this.state.fahrenheight;
    switch (from) {
      case 'celsius':
        if(Math.abs(temp - this.state.celsius) > difference) {
          fahrenheight = temp * 9 / 5 + 32
          celsius = temp
        }
        break
      case 'fahrenheight':
        if(Math.abs(temp - this.state.fahrenheight) > difference) {
          celsius = (temp - 32) * (5 / 9)
          fahrenheight = temp
        }
        break
      default:
        console.log('Error: invalid units')
    }
    return {celsius, fahrenheight}

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


  render () {
    return (
      <div style={{width: '100%'}}>
        <div className={'displayTemp'} style={{width: "100%", textAlign: "center"}}>
          {this.props.units === 'celsius' ? `The Temperature is ${this.state.celsius} Degrees Celsius`:
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

      </div>



    )



  }




}

module.export = Thermometer;