import React, { Component } from 'react'
import {
  Easing,
  PanResponder,
  Animated,
} from 'react-native'
import PropTypes from 'prop-types'

import {
  controllerListener,
  removeControllerListener,
  setNavigationDrawerContentComponent,
  ControllerType,
} from './navigaitionDrawerController'
import styles from './stylesheets/navigationDrawer'

class NavigationDrawer extends Component {

  static defaultProps = {
    width: 260,
    horizontalThreadhold: 20,
    verticalThreadhold: 200,
  }

  static propTypes = {
    width: PropTypes.number,
    horizontalThreadhold: PropTypes.number,
    verticalThreadhold: PropTypes.number,
  }

  state = {
    drawerPositon: new Animated.Value(-this.props.width),
    isShowDrawer: false,
    contentComponent: null,
  }

  /**
   * Flag
   */
  isSwipingVertical = false

  /**
   * _panResponder
   * @description -- panResponse Handler for Navigation Drawer Component
   */
  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => { },
    onPanResponderMove: (evt, gestureState) => {
      const {
        width,
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
        const { isShowDrawer } = this.state
        const isHorizontalSwiping = (gestureState.dx > horizontalThreadhold || gestureState.dx < -horizontalThreadhold) && !this.isSwipingVertical
        if (isHorizontalSwiping) {
          const swiperDiff = gestureState.x0 + gestureState.dx
          const animatedPosition = swiperDiff - width
          if (isShowDrawer && gestureState.dx < 0)
            Animated.timing(this.state.drawerPositon, {
              toValue:
                animatedPosition < 0
                  ? (
                    animatedPosition < -width
                      ? -width
                      : animatedPosition
                  )
                  : 0,
              duration: 1,
            }).start()
        }
      }
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      const { width, horizontalThreadhold } = this.props
      if (gestureState.dx === 0 && gestureState.x0 > width) {
        this._closeDrawer()
      } else if (!this.isSwipingVertical) {
        const swiperDiff = gestureState.x0 + gestureState.dx
        const isSwiping = gestureState.dx > horizontalThreadhold || gestureState.dx < -horizontalThreadhold
        if (isSwiping && swiperDiff < (width / 2)) {
          this._closeDrawer()
        } else {
          this._openDrawer()
        }
      }
      this.isSwipingVertical = false
    },
    onPanResponderTerminate: (evt, gestureState) => { },
    onShouldBlockNativeResponder: (evt, gestureState) => true,
  });

  /**
   * _openDrawer
   * @description -- open the drawer with animation
   */
  _openDrawer = () => {
    this.setState({ isShowDrawer: true }, () => {
      Animated.timing(this.state.drawerPositon, {
        toValue: 0,
        duration: 240,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start()
    })
  }

  /**
   * _closeDrawer
   * @description -- close the drawer with animation
   */
  _closeDrawer = () => {
    const { width } = this.props
    Animated.timing(this.state.drawerPositon, {
      toValue: -width,
      duration: 240,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    }).start(() => this.setState({ isShowDrawer: false }))
  }

  /**
   * initializeNavigationDrawerController
   * @description -- initial listener for navigation drawer's controller
   */
  initializeNavigationDrawerController = () => {
    controllerListener(controller => {
      if (controller.type === ControllerType.display) {
        if (controller.status) {
          this._openDrawer()
        } else {
          this._closeDrawer()
        }
      } else if (controller.type === ControllerType.setContent) {
        this.setState({
          contentComponent: controller.contentComponent
        })
      }
    })
  }

  componentDidMount() {
    this.initializeNavigationDrawerController()
  }

  componentWillUnmount() {
    setNavigationDrawerContentComponent(null)
    removeControllerListener()
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
          {this.state.contentComponent}
        </Animated.View>
      </Animated.View>
    )
  }
}

export default NavigationDrawer