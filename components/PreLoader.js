import { StyleSheet } from 'react-native';

const PreLoader = StyleSheet.create({
  preloader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 60,
    height: 60,
    marginLeft: -25,
    marginTop: -25,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: '#2a80b9',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#2a80b9',
    borderBottomColor: '#2a80b9',
  },
});

export default PreLoader;
