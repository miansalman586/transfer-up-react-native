import { View, ScrollView, Text, Switch } from 'react-native';
import GoBackTopBar from '../../components/GoBackTopBar';

import { useState, useEffect } from 'react';
import ScreenLoader from '../../components/ScreenLoader';

import { getSetting, updateSetting } from '../../utils/common';
import httpRequest from '../../utils/httpRequest';

export default function FindMeByScreen({ navigation }) {
  const [isEmailAddressSearchable, setIsEmailAddressSearchable] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const onFocus = async () => {
    let setting=  await getSetting('Setting');
    setIsEmailAddressSearchable(setting?.isFindMeByEmailAddress);
  };

  useEffect(() => {
    navigation.addListener('focus', onFocus);
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
          <Text
            style={{
              color: 'white',
              paddingLeft: 20,
              paddingRight: 20,
              marginBottom: 10,
              fontSize: 28,
              marginTop: 10,
              fontWeight: 'bold',
            }}>
            Find me by
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginLeft: 20, marginRight: 20 }}>
              <Text style={{ color: 'white', fontSize: 18, marginBottom: 40 }}>
              Set how people on TransferUp can find you to send money.
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={{ fontSize: 18, color: 'white' }}>
                    Email Address
                  </Text>
                  <Text style={{ marginTop: 10, fontSize: 14, color: 'white' }}>
                    {global.user?.emailAddress}
                  </Text>
                </View>
                <View style={{ marginTop: 15 }}>
                  <Switch
                    trackColor={{ false: '#2A2C29', true: '#2a80b9' }}
                    thumbColor={
                      isEmailAddressSearchable ? '#13150F' : '#13150F'
                    }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={async () => {

                      setIsEmailAddressSearchable(!isEmailAddressSearchable);
                      let result = await httpRequest(
                        'customer/update-is-find-me-by-email-address',
                        'put',
                        {
                          isFindMeByEmailAddress: !isEmailAddressSearchable,
                        },
                        true,
                        setIsLoading
                      );
                    if (result.status == 200) {
                      let setting =  await getSetting();
                      setting.isFindMeByEmailAddress = !isEmailAddressSearchable;
                      await updateSetting(setting);
                      setIsEmailAddressSearchable(!isEmailAddressSearchable);
                    }
                    }}
                    value={isEmailAddressSearchable}
                  />
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
