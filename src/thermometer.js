import React from 'react'

export default class Thermometer extends React.Component {
  constructor () {
    super()
    this.state = {
      fahrenheit: 0,
      celsius: 0,
      unit: 'celsius',
      freezing: false,
      boiling: false
    }
  }

  componentWillMount () {
    if(this.props.data) {

      if (this.props.data.unit === 'celsius') {
        this.setState({
          unit: this.props.data.unit,
          celsius: this.props.data.temp
        })
      }
      else {
        this.setState({
          unit: this.props.data.unit,
          fahrenheit: this.props.data.temp
        })
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const {settings} = nextProps
    const {direction, difference} = settings
    const freezingPoint = Number(settings.freezingPoint) || 0
    const boilingPoint = Number(settings.boilingPoint) || 0
    const date = new Date()
    let {boiling, freezing} = this.state;
    let newTemp, oldTemp
    let newLogEntries = ''

    //ignore new data if the tempurature is within +/- difference
    if (this.validateProps(nextProps) && (!nextProps.data || Math.abs(nextProps.data.temp - this.state[nextProps.data.unit]) <= difference)) return

    // check to see if it crosses threshold
    let {celsius, fahrenheit} = this.calcTemp(nextProps.data.unit, nextProps.data.temp)
    if (this.props.units === 'celsius') {
      newTemp = celsius
      oldTemp = this.state.celsius
    }
    else {
      newTemp = fahrenheit
      oldTemp = this.state.fahrenheit
    }

    if (this.didCrossThreshold(newTemp, oldTemp, freezingPoint, direction)) {
      newLogEntries = newLogEntries + date.toDateString() + ' ' + date.toTimeString() + ': crossed freezing threshold \n'
      freezing = true
    }
    if (this.didCrossThreshold(newTemp, oldTemp, boilingPoint, direction)) {
      newLogEntries = newLogEntries + date.toDateString() + ' ' + date.toTimeString() + ': crossed boiling threshold \n'
      boiling = true
    }
    this.setState({
        celsius,
        fahrenheit,
        freezing,
        boiling
      })
    this.props.addToLog(newLogEntries)
  }

  validateProps = (nextProps) => {
    return (nextProps.data && nextProps.data.unit && nextProps.data.temp)
  }

  didCrossThreshold = (newTemp, oldTemp, threshold, direction) => {
    if(newTemp > oldTemp && direction >= 0) return threshold > oldTemp && threshold <= newTemp;
    else if( newTemp < oldTemp && direction <= 0 )  return threshold >= newTemp && threshold < oldTemp;
  }

  calcTemp (from, temp) {
    let celsius = this.state.celsius
    let fahrenheit = this.state.fahrenheit

    if(!temp) return {celsius, fahrenheit}
    switch (from) {
      case 'celsius':
        fahrenheit = temp * 9 / 5 + 32
        celsius = temp
        break
      case 'fahrenheit':
        celsius = (temp - 32) * (5 / 9)
        fahrenheit = temp
        break
      default:
        celsius = null;
        fahrenheit = null;
        break;
    }
    return {celsius, fahrenheit}

  }

  render () {
    return (
      <div style={{width: '100%'}}>
        <div className={'displayTemp'} style={{width: '100%', textAlign: 'center'}}>
          {this.props.units === 'celsius' ? `The Temperature is ${this.state.celsius} Degrees Celsius` : `The Temperature is ${this.state.fahrenheit} Degrees fahrenheit`
          }</div>
      </div>

    )
  }
}

module.export = Thermometer