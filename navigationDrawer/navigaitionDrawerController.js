import { EventEmitter } from 'events'

export const ControllerType = {
  display: 'DISPLAYING',
  setContent: 'SET_CONTENT',
}

const navigationDrawerChannel = 'DRAWER_CONTROLLER'
const controller = new EventEmitter()

export const controllerListener = (callback) => {
  controller.on(navigationDrawerChannel, callback)
}

export const openDrawer = () => {
  controller.emit(navigationDrawerChannel, { type: ControllerType.display, status: true })
}

export const closeDrawer = () => {
  controller.emit(navigationDrawerChannel, { type: ControllerType.display, status: false })
}

export const setNavigationDrawerContentComponent = (contentComponent) => {
  controller.emit(navigationDrawerChannel, { type: ControllerType.setContent, contentComponent })
}

export const removeControllerListener = () => {
  controller.removeAllListeners([navigationDrawerChannel])
}