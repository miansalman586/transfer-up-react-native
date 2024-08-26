import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';

const CustomToast = ({ message, visible, duration = 2000, onClose }) => {
  const [isVisible, setIsVisible] = useState(visible);

  React.useEffect(() => {
    setIsVisible(visible);
    if (visible) {
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, duration);
    }
  }, [visible]);

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        setIsVisible(false);
        onClose();
      }}>
      <View style={styles.container}>
        <View style={styles.toast}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  toast: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: '50%',
    alignItems: 'center',
    marginBottom: 60,
  },
  message: {
    fontSize: 16,
  },
});

export default CustomToast;
