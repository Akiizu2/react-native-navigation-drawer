import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 999,
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,.54)'
  },
  body: {
    width: 260,
    height: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    zIndex: 1001,
  }
})