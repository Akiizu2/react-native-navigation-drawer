import React, { Component } from 'react'

import { View, Button } from 'react-native'
import { Actions } from 'react-native-router-flux';

class Home extends Component {
  render() {
    console.log('this.props', this.props)
    return (
      <View>

        <Button title='Home' onPress={() => this.props.navigation.openDrawer()} />
        {/* <Button title='Home' onPress={() => ()} /> */}
      </View>
    )
  }
}

export default Home