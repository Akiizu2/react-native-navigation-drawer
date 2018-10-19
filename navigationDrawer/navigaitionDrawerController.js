import { EventEmitter } from 'events'

const navigationDrawerChannel = 'DRAWER_CONTROLLER'
const controller = new EventEmitter()

export const controllerListener = (callback) => {
  controller.on(navigationDrawerChannel, callback)
}

export const openDrawer = () => {
  controller.emit(navigationDrawerChannel, true)
}

export const closeDrawer = () => {
  controller.emit(navigationDrawerChannel, false)
}