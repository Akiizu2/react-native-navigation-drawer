/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PanResponder
} from 'react-native';
import { Router, Scene, Drawer } from 'react-native-router-flux'

import NavigationDrawer from './navigationDrawer/NavigationDrawer'
import { openDrawer, closeDrawer } from './navigationDrawer/navigaitionDrawerController'
import Home from './Home'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {

  state = {
    drawerStatus: true
  }

  _onToggleDrawer = () => {
    openDrawer()
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <TouchableOpacity onPress={this._onToggleDrawer} >
            <Text> Open Drawer</Text>
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
