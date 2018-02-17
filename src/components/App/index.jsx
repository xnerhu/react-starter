import React from 'react'

import './style.scss'

import { FlatButton, RaisedButton } from 'nersent-ui'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <FlatButton>flat button</FlatButton>
        <RaisedButton>raised button</RaisedButton>
      </div>
    )
  }
}