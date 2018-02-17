import React from 'react'

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