import React, { Component } from 'react'

import {
  View,
  Text,
  PanResponder,
  Animated,
} from 'react-native'

class NavigationDrawer extends Component {

  state = {
    drawerPositon: new Animated.Value(0)
  }

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => { },
    onPanResponderMove: (evt, gestureState) => {
      const movedPosition = gestureState.dx * 1.5 > 0
        ? 0
        : gestureState.dx * 1.5
      if (movedPosition < -200) {
        Animated.timing(this.state.drawerPositon, {
          toValue: -260,
        }).start()
      }
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -200) {
        Animated.timing(this.state.drawerPositon, {
          toValue: -260,
        }).start()
      } else {
        Animated.timing(this.state.drawerPositon, {
          toValue: 0,
        }).start()
      }
    },
    onPanResponderTerminate: (evt, gestureState) => { },
    onShouldBlockNativeResponder: (evt, gestureState) => true,
  });

  render() {
    console.log('drawerPositon', this.state.drawerPositon)
    return (
      <View
        {...this._panResponder.panHandlers}
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,.24)',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 999,
        }} >
        <Animated.View style={{
          width: 260,
          height: '100%',
          position: 'absolute',
          top: 0,
          left: this.state.drawerPositon,
          backgroundColor: 'white',
        }}>
          <Text>
            Navigation Drawer
            </Text>
        </Animated.View>
      </View>
    )
  }
}

export default NavigationDrawer