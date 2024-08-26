import { View, Text, Pressable } from 'react-native';
import GoBackTopBar from '../../../components/GoBackTopBar';

import { useEffect, useRef, useState } from 'react';
import ScreenLoader from '../../../components/ScreenLoader';
import * as GlobalService from '../../../services/GlobalService';

import * as MerchantService from '../../../services/user/MerchantService';
import * as CustomerService from '../../../services/user/CustomerService';

export default function ChangePasscodeScreen({ navigation }) {
  const [keyPressed, setKeyPressed] = useState(0);
  const [errorCount, setErrorCount] = useState(1);

  const [passcode, setPasscode] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isErrorPasscode, setIsErrorPasscode] = useState(false);

  const onFocus = async () => {
    passcode.fill(0);
    setKeyPressed(0);
  };

  const keyPressedButton = async (d) => {

    if (keyPressed >= 0 && keyPressed < 6) {
    setIsErrorPasscode(false);

      passcode[keyPressed] = d;
      setKeyPressed(keyPressed + 1);
    }

    if (keyPressed == 5) {
      if (global.entityId == 1) {
        let result = await MerchantService.verifyPasscode(
          passcode.join(''),
          setIsLoading,
          navigation
        );
        if (result.Success) {
          navigation.navigate('Passcode', {
            currentPasscode: passcode.join(''),
          });
        } else {
          setIsErrorPasscode(true);

          if (errorCount >= 3) {
            await GlobalService.logout(navigation, global.entityId);
          }

          setErrorCount(errorCount + 1);
        }
      } else if (global.entityId == 2) {
        let result = await CustomerService.verifyPasscode(
          passcode.join(''),
          setIsLoading,
          navigation
        );
        if (result.Success) {
          navigation.navigate('Passcode', {
            currentPasscode: passcode.join(''),
          });
        } else {
          setIsErrorPasscode(true);

          if (errorCount >= 3) {
            await GlobalService.logout(navigation, global.entityId);
          }

          setErrorCount(errorCount + 1);
        }
      }
    }
  };

  const deleteKeyPressedButton = () => {

    if (keyPressed > 0 && keyPressed <= 6) {
    setIsErrorPasscode(false);

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
            borderColor:
              i < keyPressed && keyPressed != 6
                ? 'white'
                : isErrorPasscode
                ? '#FFBDBB'
                : 'white',
            borderWidth: 2,
            height: 15,
            width: 15,
            marginRight: i == 5 ? 0 : 20,
            backgroundColor:
              i < keyPressed && keyPressed != 6
                ? 'white'
                : isErrorPasscode
                ? '#FFBDBB'
                : 'transparent',
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
    <View>
      {!isLoading && (
        <View
          style={{
            height: '100%',
            backgroundColor: '#13150F',
          }}>
          <GoBackTopBar navigation={navigation} />
          <View style={{  marginLeft: 20, marginRight: 20 }}>
             <Text
              style={{
                textAlign: 'center',
                color: '#2a80b9',
                fontSize: 32,
                fontWeight: 'bold',
                marginBottom: 40,
              }}>
              TRANSFERUP
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 18,
              }}>
              {isErrorPasscode
                ? 'Your TransferUp account is secured.'
                : 'Enter your current passcode to change passcode'}
            </Text>
            {isErrorPasscode && (
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 18,
                  marginTop: 10,
                }}>
                Invalid PIN.
              </Text>
            )}
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
              <View style={{ flex: 1 }}>
                <Pressable
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Text
                    style={{
                      color: '#2a80b9',
                      marginLeft: 50,
                      paddingTop: 40,
                      paddingBottom: 20,
                      fontSize: 20,
                    }}>
                    Cancel
                  </Text>
                </Pressable>
              </View>
              <View style={{ flex: 1 }}>
                <Pressable
                  onPress={() => {
                    keyPressedButton(0);
                  }}>
                  <Text
                    style={{
                      color: '#2a80b9',
                      paddingTop: 40,
                      paddingBottom: 20,
                      marginLeft: 55,
                      fontSize: 20,
                    }}>
                    0
                  </Text>
                </Pressable>
              </View>
              <View style={{ flex: 1 }}>
                <Pressable onPress={deleteKeyPressedButton}>
                  <Text
                    style={{
                      color: '#2a80b9',
                      paddingTop: 40,
                      paddingBottom: 20,
                      fontSize: 20,
                      marginLeft: 20,
                    }}>
                    Delete
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
