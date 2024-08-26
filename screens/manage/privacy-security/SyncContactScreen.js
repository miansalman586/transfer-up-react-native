import { View, ScrollView, Text, Switch } from 'react-native';
import GoBackTopBar from '../../../components/GoBackTopBar';

import { useState, useEffect } from 'react';
import ScreenLoader from '../../../components/ScreenLoader';

import * as CustomerSettingService from '../../../services/settings/CustomerSettingService';
import * as MerchantSettingService from '../../../services/settings/MerchantSettingService';

export default function SyncContactScreen({ navigation }) {
  const [isEmailAddressSearchable, setIsEmailAddressSearchable] = useState(
    global.settings.IsEmailAddressSearchable
  );
  const [isPhoneNumberSearchable, setIsPhoneNumberSearchable] = useState(
    global.settings.IsPhoneNumberSearchable
  );
  const [isSyncContact, setIsSyncContact] = useState(
    global.settings.IsSyncContact
  );
  const [isLoading, setIsLoading] = useState(false);

  const onFocus = () => {};

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
            Contacts on TransferUp
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginLeft: 20, marginRight: 20 }}>
              <Text style={{ color: 'white', fontSize: 18, marginBottom: 40 }}>
                People you know can send money directly to your balances--- just
                let them find you first.
              </Text>
              {global.entityId == 2 && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ fontSize: 18, color: 'white' }}>
                    Sync your contacts
                  </Text>
                  <Switch
                    trackColor={{ false: '#2A2C29', true: '#2a80b9' }}
                    thumbColor={isSyncContact ? '#13150F' : '#13150F'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={async () => {
                      global.settings.IsSyncContact = !isSyncContact;
                      setIsSyncContact(!isSyncContact);

                      if (global.entityId == 1) {
                        await MerchantSettingService.syncContact(
                          !isSyncContact,
                          setIsLoading,
                          navigation
                        );
                      } else if (global.entityId == 2) {
                        await CustomerSettingService.syncContact(
                          !isSyncContact,
                          setIsLoading,
                          navigation
                        );
                      }
                    }}
                    value={isSyncContact}
                  />
                </View>
              )}
              <View
                style={{
                  marginTop:
                    global.entityId == 1 ? 0 : global.entityId == 2 ? 40 : 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={{ fontSize: 18, color: 'white' }}>
                    Email Address
                  </Text>
                  <Text style={{ marginTop: 10, fontSize: 14, color: 'white' }}>
                    {global.emailAddress}
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
                      global.settings.IsEmailAddressSearchable =
                        !isEmailAddressSearchable;
                      setIsEmailAddressSearchable(!isEmailAddressSearchable);

                      if (global.entityId == 1) {
                        await MerchantSettingService.emailAddressSearchable(
                          !isEmailAddressSearchable,
                          setIsLoading,
                          navigation
                        );
                      } else if (global.entityId == 2) {
                        await CustomerSettingService.emailAddressSearchable(
                          !isEmailAddressSearchable,
                          setIsLoading,
                          navigation
                        );
                      }
                    }}
                    value={isEmailAddressSearchable}
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: 40,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={{ fontSize: 18, color: 'white' }}>
                    Phone Number
                  </Text>
                  <Text style={{ marginTop: 10, fontSize: 14, color: 'white' }}>
                    {global.countryCode + global.phoneNumber}
                  </Text>
                </View>
                <View style={{ marginTop: 15 }}>
                  <Switch
                    trackColor={{ false: '#2A2C29', true: '#2a80b9' }}
                    thumbColor={isPhoneNumberSearchable ? '#13150F' : '#13150F'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={async () => {
                      global.settings.IsPhoneNumberSearchable =
                        !isPhoneNumberSearchable;
                      setIsPhoneNumberSearchable(!isPhoneNumberSearchable);

                      if (global.entityId == 1) {
                        await MerchantSettingService.phoneNumberSearchable(
                          !isPhoneNumberSearchable,
                          setIsLoading,
                          navigation
                        );
                      } else if (global.entityId == 2) {
                        await CustomerSettingService.phoneNumberSearchable(
                          !isPhoneNumberSearchable,
                          setIsLoading,
                          navigation
                        );
                      }
                    }}
                    value={isPhoneNumberSearchable}
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
