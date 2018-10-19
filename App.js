/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import NavigationDrawer, { Controller } from './navigationDrawer'

export default class App extends Component {

  state = {
    drawerStatus: false
  }

  _onToggleDrawer = () => {
    Controller.openDrawer()
  }

  componentDidMount() {
    Controller.setNavigationDrawerContentComponent(<View><Text>Test</Text></View>)
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <TouchableOpacity onPress={this._onToggleDrawer} >
            <Text>Open Drawer</Text>
          </TouchableOpacity>
        </View>
        <NavigationDrawer />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
