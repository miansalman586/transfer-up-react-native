import {View, ScrollView, Text, TextInput} from 'react-native';
import ScreenLoader from '../../components/ScreenLoader';

import {useState} from 'react';
import GoBackTopBar from '../../components/GoBackTopBar';

export default function PersonalDetailRegisterScreen({navigation, route}) {
  const [isLoading, setIsLoading] = useState(false);

  const [isFirstNameInputFocused, setIsFirstNameInputFocused] =
  useState(false);

  const handleFirstNameFocus = () => setIsFirstNameInputFocused(true);
  const handleFirstNameBlur = async () => {
    setIsFirstNameInputFocused(false);
  };

    return(
        <View>
        {!isLoading && (
          <View
            style={{
              height: '100%',
              backgroundColor: '#13150F',
            }}>
            <GoBackTopBar navigation={navigation}  />
            <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{  paddingHorizontal: 20 }}>
        <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 28,
                    fontWeight: 'bold',
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                 Personal details
                </Text>
              </View>
              <View style={{ }}>
                  <View style={{  }}>
                    <Text style={{ color: 'white' }}>First Name</Text>
                    <View
                      style={{
                        height: 50,
                        paddingLeft: 5,
                        color: 'white',
                        paddingRight: 20,
                        backgroundColor: '#2A2C29',
                        borderWidth: 2,
                        marginTop: 10,
                        borderColor:
                          isFirstNameInputFocused
                            ? '#2a80b9'
                            : '#2A2C29',
                        fontSize: 18,
                        flexDirection: 'row',
                      }}>
                      <TextInput
                        style={{
                          color: 'white',
                          fontSize: 18,
                          flex: 10,
                          marginLeft: 15,
                        }}
                        onChangeText={(value) => {
                       
                        }}
                        onFocus={handleFirstNameFocus}
                        onBlur={handleFirstNameBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'white' }}>Last Name</Text>
                    <View
                      style={{
                        height: 50,
                        paddingLeft: 5,
                        color: 'white',
                        paddingRight: 20,
                        backgroundColor: '#2A2C29',
                        borderWidth: 2,
                        marginTop: 10,
                        borderColor:
                          isFirstNameInputFocused
                            ? '#2a80b9'
                            : '#2A2C29',
                        fontSize: 18,
                        flexDirection: 'row',
                      }}>
                      <TextInput
                        style={{
                          color: 'white',
                          fontSize: 18,
                          flex: 10,
                          marginLeft: 15,
                        }}
                        onChangeText={(value) => {
                       
                        }}
                        onFocus={handleFirstNameFocus}
                        onBlur={handleFirstNameBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'white' }}>Date of Birth</Text>
                    <View
                      style={{
                        height: 50,
                        paddingLeft: 5,
                        color: 'white',
                        paddingRight: 20,
                        backgroundColor: '#2A2C29',
                        borderWidth: 2,
                        marginTop: 10,
                        borderColor:
                          isFirstNameInputFocused
                            ? '#2a80b9'
                            : '#2A2C29',
                        fontSize: 18,
                        flexDirection: 'row',
                      }}>
                      <TextInput
                        style={{
                          color: 'white',
                          fontSize: 18,
                          flex: 10,
                          marginLeft: 15,
                        }}
                        onChangeText={(value) => {
                       
                        }}
                        onFocus={handleFirstNameFocus}
                        onBlur={handleFirstNameBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'white' }}>Gender</Text>
                    <View
                      style={{
                        height: 50,
                        paddingLeft: 5,
                        color: 'white',
                        paddingRight: 20,
                        backgroundColor: '#2A2C29',
                        borderWidth: 2,
                        marginTop: 10,
                        borderColor:
                          isFirstNameInputFocused
                            ? '#2a80b9'
                            : '#2A2C29',
                        fontSize: 18,
                        flexDirection: 'row',
                      }}>
                      <TextInput
                        style={{
                          color: 'white',
                          fontSize: 18,
                          flex: 10,
                          marginLeft: 15,
                        }}
                        onChangeText={(value) => {
                       
                        }}
                        onFocus={handleFirstNameFocus}
                        onBlur={handleFirstNameBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'white' }}>ID Type</Text>
                    <View
                      style={{
                        height: 50,
                        paddingLeft: 5,
                        color: 'white',
                        paddingRight: 20,
                        backgroundColor: '#2A2C29',
                        borderWidth: 2,
                        marginTop: 10,
                        borderColor:
                          isFirstNameInputFocused
                            ? '#2a80b9'
                            : '#2A2C29',
                        fontSize: 18,
                        flexDirection: 'row',
                      }}>
                      <TextInput
                        style={{
                          color: 'white',
                          fontSize: 18,
                          flex: 10,
                          marginLeft: 15,
                        }}
                        onChangeText={(value) => {
                       
                        }}
                        onFocus={handleFirstNameFocus}
                        onBlur={handleFirstNameBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'white' }}>ID Expiry Date</Text>
                    <View
                      style={{
                        height: 50,
                        paddingLeft: 5,
                        color: 'white',
                        paddingRight: 20,
                        backgroundColor: '#2A2C29',
                        borderWidth: 2,
                        marginTop: 10,
                        borderColor:
                          isFirstNameInputFocused
                            ? '#2a80b9'
                            : '#2A2C29',
                        fontSize: 18,
                        flexDirection: 'row',
                      }}>
                      <TextInput
                        style={{
                          color: 'white',
                          fontSize: 18,
                          flex: 10,
                          marginLeft: 15,
                        }}
                        onChangeText={(value) => {
                       
                        }}
                        onFocus={handleFirstNameFocus}
                        onBlur={handleFirstNameBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'white' }}>Nationality</Text>
                    <View
                      style={{
                        height: 50,
                        paddingLeft: 5,
                        color: 'white',
                        paddingRight: 20,
                        backgroundColor: '#2A2C29',
                        borderWidth: 2,
                        marginTop: 10,
                        borderColor:
                          isFirstNameInputFocused
                            ? '#2a80b9'
                            : '#2A2C29',
                        fontSize: 18,
                        flexDirection: 'row',
                      }}>
                      <TextInput
                        style={{
                          color: 'white',
                          fontSize: 18,
                          flex: 10,
                          marginLeft: 15,
                        }}
                        onChangeText={(value) => {
                       
                        }}
                        onFocus={handleFirstNameFocus}
                        onBlur={handleFirstNameBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>
                </View>
              </View>
</ScrollView>
            </View>
                )}
                {isLoading && <ScreenLoader />}
              </View>
    );
}