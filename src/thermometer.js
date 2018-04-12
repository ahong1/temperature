import React from 'react'

export default class Thermometer extends React.Component {
  constructor () {
    super()
    this.state = {
      fahrenheight: 0,
      celsius: 0,
      unit: 'celsius',
      freezing: false,
      boiling: false
    }
  }

  componentWillMount () {
    if (this.props.data.unit === 'celsius') {
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

  componentWillReceiveProps (nextProps) {
    const {settings} = nextProps
    const {direction, difference} = settings
    const freezingPoint = settings.freezingPoint || 0
    const boilingPoint = settings.boilingPoint || 0
    const date = new Date()
    let newTemp, oldTemp
    let newLogEntries = ' '

    if (this.state.boiling) this.setState({boiling: false})
    if (this.state.freezing) this.setState({freezing: false})
    //ignore new data if the tempurature is within +/- difference
    if (Math.abs(nextProps.data.temp - this.state[nextProps.data.unit]) <= difference) return

    // check to see if it crosses threshold
    let {celsius, fahrenheight} = this.calcTemp(nextProps.data.unit, nextProps.data.temp)
    if (this.props.units === 'celsius') {
      newTemp = celsius
      oldTemp = this.state.celsius
    }
    else {
      newTemp = fahrenheight
      oldTemp = this.state.fahrenheight
    }

    /* crossing the threshold:
        crosses when threshold temp is between the prev and next temps

        case 0: doesn't matter if prev or next is greater
        case 1: if next is greater than prev
        case -1: if prev is greater than next


        check 1 - Direction: if next > prev => case 1
                             if next < prev => case -1

    */
    switch (direction) {
      case 1:
        if (newTemp > oldTemp && this.didCrossThreshold(newTemp, oldTemp, freezingPoint)) {
          newLogEntries = newLogEntries + date.toDateString() + ' ' + date.toTimeString() + ': crossed freezing threshold \n'
          this.setState({freezing: true})
        }
        if (newTemp > oldTemp && this.didCrossThreshold(newTemp, oldTemp, boilingPoint)) {
          newLogEntries = newLogEntries + date.toDateString() + ' ' + date.toTimeString() + ': crossed boiling threshold \n'
          this.setState({boiling: true})
        }
        break
      case -1:
        if (newTemp < oldTemp && this.didCrossThreshold(oldTemp, newTemp, freezingPoint)) {
          newLogEntries = newLogEntries + date.toDateString() + ' ' + date.toTimeString() + ': crossed freezing threshold \n'
          this.setState({freezing: true})
        }
        if (newTemp < oldTemp && this.didCrossThreshold(oldTemp, newTemp, boilingPoint)) {
          newLogEntries = newLogEntries + date.toDateString() + ' ' + date.toTimeString() + ': crossed boiling threshold \n'
          this.setState({boiling: true})
        }
        break
      default:
        if (this.didCrossThreshold(oldTemp, newTemp, freezingPoint) || this.didCrossThreshold(newTemp, oldTemp, freezingPoint)) {
          newLogEntries = newLogEntries + date.toDateString() + ' ' + date.toTimeString() + ': crossed freezing threshold \n'
          this.setState({freezing: true})
        }
        if (this.didCrossThreshold(oldTemp, newTemp, boilingPoint) || this.didCrossThreshold(newTemp, oldTemp, boilingPoint)) {
          newLogEntries = newLogEntries + date.toDateString() + ' ' + date.toTimeString() + ': crossed boiling threshold \n'
          this.setState({boiling: true})
        }
        break
    }

    this.setState({
      celsius,
      fahrenheight,
    })
    this.props.addToLog(newLogEntries)

  }

  didCrossThreshold = (higherTemp, lowerTemp, threshold) => {
    return threshold >= lowerTemp && threshold < higherTemp
  }

  calcTemp (from, temp) {
    let celsius = this.state.celsius
    let fahrenheight = this.state.fahrenheight
    switch (from) {
      case 'celsius':
        fahrenheight = temp * 9 / 5 + 32
        celsius = temp
        break
      case 'fahrenheight':
        celsius = (temp - 32) * (5 / 9)
        fahrenheight = temp
        break
      default:
        console.log('Error: invalid units')
    }
    return {celsius, fahrenheight}

  }

  render () {
    return (
      <div style={{width: '100%'}}>
        <div className={'displayTemp'} style={{width: '100%', textAlign: 'center'}}>
          {this.props.units === 'celsius' ? `The Temperature is ${this.state.celsius} Degrees Celsius` : `The Temperature is ${this.state.fahrenheight} Degrees Fahrenheight`
          }</div>
      </div>

    )
  }
}

module.export = Thermometer