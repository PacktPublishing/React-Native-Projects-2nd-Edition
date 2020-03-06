import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  colHeight: {
    height: 3096,
  },
  col: {
    backgroundColor: '#FFFDD0',
    height: 3096,
    borderRightColor: 'black',
    borderRightWidth: 2,
  },
  timeLinePointSpacing: {
    marginTop: 40,
    marginBottom: 40,
  },
  evenBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'black',
  },
  oddBadge: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
  },
  blackText: {
    color: 'black',
  },
  whiteText: {
    color: 'white',
  },
  roundedRadius: {
    borderRadius: 100,
  },
  oddBackground: {
    backgroundColor: 'black',
  },
  name: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
