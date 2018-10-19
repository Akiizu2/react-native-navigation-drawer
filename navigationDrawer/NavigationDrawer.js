import React, { Component } from 'react'

import {
  Easing,
  Text,
  PanResponder,
  Animated,
} from 'react-native'

import { controllerListener } from './navigaitionDrawerController'
import styles from './stylesheets/navigationDrawer'

class NavigationDrawer extends Component {

  static defaultProps = {
    width: 260,
    horizontalThreadhold: 20,
    verticalThreadhold: 200,
  }

  state = {
    drawerPositon: new Animated.Value(0),
    isShowDrawer: true,
  }

  isSwipingVertical = false

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => { },
    onPanResponderMove: (evt, gestureState) => {
      const { width,
        horizontalThreadhold,
        verticalThreadhold
      } = this.props
      if (gestureState.dy > verticalThreadhold || gestureState.dy < -verticalThreadhold) {
        this.isSwipingVertical = true
        Animated.timing(this.state.drawerPositon, {
          toValue: 0,
          duration: 100,
        }).start()
      } else {
        const isHorizontalSwiping = (gestureState.dx > horizontalThreadhold || gestureState.dx < -horizontalThreadhold) && !this.isSwipingVertical
        if (isHorizontalSwiping) {
          const swiperDiff = gestureState.x0 + gestureState.dx
          const animatedPosition = swiperDiff - width
          Animated.timing(this.state.drawerPositon, {
            toValue: animatedPosition < 0 ? animatedPosition < -width ? -width : animatedPosition : 0,
            duration: 1,
          }).start()
        }
      }
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      const { width, horizontalThreadhold } = this.props
      if (gestureState.dx === 0 && gestureState.x0 > width) {
        this.closeDrawer()
      } else if (!this.isSwipingVertical) {
        const swiperDiff = gestureState.x0 + gestureState.dx
        const isSwiping = gestureState.dx > horizontalThreadhold || gestureState.dx < -horizontalThreadhold
        if (isSwiping && swiperDiff < (width / 2)) {
          this.closeDrawer()
        } else {
          this.openDrawer()
        }
      }
      this.isSwipingVertical = false
    },
    onPanResponderTerminate: (evt, gestureState) => { },
    onShouldBlockNativeResponder: (evt, gestureState) => true,
  });

  openDrawer = () => {
    this.setState({ isShowDrawer: true }, () => {
      Animated.timing(this.state.drawerPositon, {
        toValue: 0,
        duration: 240,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start()
    })
  }

  closeDrawer = () => {
    const { width } = this.props
    Animated.timing(this.state.drawerPositon, {
      toValue: -width,
      duration: 240,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    }).start(() => this.setState({ isShowDrawer: false }))
  }

  componentDidMount() {
    controllerListener(isOpen => {
      if (isOpen) {
        this.openDrawer()
      } else {
        this.closeDrawer()
      }
    })
  }

  render() {
    const { width } = this.props
    if (!this.state.isShowDrawer) {
      return null
    }
    const opacityAnimated = this.state.drawerPositon.interpolate({
      inputRange: [-width, -(width / 2), 0],
      outputRange: [0, 1, 1]
    })
    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={styles.container} >
        <Animated.View style={[styles.backdrop, { opacity: opacityAnimated }]} />
        <Animated.View style={[styles.body, { left: this.state.drawerPositon }]}>
          <Text>
            Navigation Drawer
          </Text>
        </Animated.View>
      </Animated.View>
    )
  }
}

export default NavigationDrawer