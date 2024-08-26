import { View, Text, Pressable } from 'react-native';
import GoBackTopBar from '../../../components/GoBackTopBar';

import { useEffect, useRef, useState } from 'react';

export default function PasscodeScreen({ route, navigation }) {
  const [keyPressed, setKeyPressed] = useState(0);

  const [passcode, setPasscode] = useState([]);

  const { currentPasscode } = route.params;

  const onFocus = async () => {
    passcode.fill(0);
    setKeyPressed(0);
  };

  const keyPressedButton = (d) => {
    if (keyPressed >= 0 && keyPressed < 6) {
      passcode[keyPressed] = d;
      setKeyPressed(keyPressed + 1);
    }

    if (keyPressed == 5) {
      navigation.navigate('ConfirmPasscode', {
        passcode: passcode.join(''),
        currentPasscode,
      });
    }
  };

  const deleteKeyPressedButton = () => {
    if (keyPressed > 0 && keyPressed <= 6) {
      setKeyPressed(keyPressed - 1);
    }
  };

  const renderPinCodeInputs = () => {
    const pinCodeInputs = [];

    for (let i = 0; i < 6; i++) {
      pinCodeInputs.push(
        <View
          key={i}
          style={{
            borderRadius: '50%',
            borderColor: 'white',
            borderWidth: 2,
            height: 15,
            width: 15,
            marginRight: i == 5 ? 0 : 20,
            backgroundColor: i + 1 <= keyPressed ? 'white' : 'transparent',
          }}
        />
      );
    }

    return pinCodeInputs;
  };

  useEffect(() => {
    const onFocusListener = navigation.addListener('focus', onFocus);

    return () => {
      onFocusListener()?.remove();
    };
  }, []);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#13150F',
      }}>
      <GoBackTopBar navigation={navigation} />
      <Text
        style={{
          marginLeft: 20,
          marginRight: 20,
          color: 'white',
          fontSize: 28,
          fontWeight: 'bold',
          marginTop: 10,
          marginBottom: 10,
        }}>
        Set Passcode
      </Text>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <Text style={{ color: 'white', fontSize: 18, marginBottom: 20 }}>
          Passcode is required if you don't use this app for 5 minutes.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          {renderPinCodeInputs()}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          <View>
            <Pressable
              onPress={() => {
                keyPressedButton(1);
              }}>
              <Text
                style={{
                  color: '#2a80b9',
                  paddingLeft: 40,
                  paddingTop: 40,
                  paddingBottom: 20,
                  paddingRight: 60,
                  fontSize: 20,
                }}>
                1
              </Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => {
                keyPressedButton(2);
              }}>
              <Text
                style={{
                  color: '#2a80b9',
                  paddingLeft: 40,
                  paddingTop: 40,
                  paddingBottom: 20,
                  paddingRight: 60,
                  fontSize: 20,
                }}>
                2
              </Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => {
                keyPressedButton(3);
              }}>
              <Text
                style={{
                  color: '#2a80b9',
                  paddingLeft: 40,
                  paddingTop: 40,
                  paddingBottom: 20,
                  paddingRight: 40,
                  fontSize: 20,
                }}>
                3
              </Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          <View>
            <Pressable
              onPress={() => {
                keyPressedButton(4);
              }}>
              <Text
                style={{
                  color: '#2a80b9',
                  paddingLeft: 40,
                  paddingTop: 40,
                  paddingBottom: 20,
                  paddingRight: 60,
                  fontSize: 20,
                }}>
                4
              </Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => {
                keyPressedButton(5);
              }}>
              <Text
                style={{
                  color: '#2a80b9',
                  paddingLeft: 40,
                  paddingTop: 40,
                  paddingBottom: 20,
                  paddingRight: 60,
                  fontSize: 20,
                }}>
                5
              </Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => {
                keyPressedButton(6);
              }}>
              <Text
                style={{
                  color: '#2a80b9',
                  paddingLeft: 40,
                  paddingTop: 40,
                  paddingBottom: 20,
                  paddingRight: 40,
                  fontSize: 20,
                }}>
                6
              </Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          <View>
            <Pressable
              onPress={() => {
                keyPressedButton(7);
              }}>
              <Text
                style={{
                  color: '#2a80b9',
                  paddingLeft: 40,
                  paddingTop: 40,
                  paddingBottom: 20,
                  paddingRight: 60,
                  fontSize: 20,
                }}>
                7
              </Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => {
                keyPressedButton(8);
              }}>
              <Text
                style={{
                  color: '#2a80b9',
                  paddingLeft: 40,
                  paddingTop: 40,
                  paddingBottom: 20,
                  paddingRight: 60,
                  fontSize: 20,
                }}>
                8
              </Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => {
                keyPressedButton(9);
              }}>
              <Text
                style={{
                  color: '#2a80b9',
                  paddingLeft: 40,
                  paddingTop: 40,
                  paddingBottom: 20,
                  paddingRight: 40,
                  fontSize: 20,
                }}>
                9
              </Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          <View>
            <Text
              style={{
                color: '#2a80b9',
                paddingLeft: 40,
                paddingTop: 40,
                paddingBottom: 20,
                paddingRight: 60,
                fontSize: 20,
              }}>
              {' '}
            </Text>
          </View>
          <View>
            <Pressable
              onPress={() => {
                keyPressedButton(0);
              }}>
              <Text
                style={{
                  color: '#2a80b9',
                  paddingLeft: 40,
                  paddingTop: 40,
                  paddingBottom: 20,
                  paddingRight: 60,
                  marginLeft: 25,
                  fontSize: 20,
                }}>
                0
              </Text>
            </Pressable>
          </View>
          <View>
            <Pressable onPress={deleteKeyPressedButton}>
              <Text
                style={{
                  color: '#2a80b9',
                  paddingLeft: 40,
                  paddingTop: 40,
                  paddingBottom: 20,
                  paddingRight: 40,
                  fontSize: 20,
                  marginLeft: -22,
                }}>
                Delete
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
