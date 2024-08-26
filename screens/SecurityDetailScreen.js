import {
  View,
  Image,
  Text,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import GoBackTopBar from '../components/GoBackTopBar';
import ScreenLoader from '../components/ScreenLoader';

import formateFullDate from '../utils/formateFullDate';

import { useState, useEffect } from 'react';

import httpRequest from '../utils/httpRequest';

import FilterView from '../components/FilterView';

export default function SecurityDetailScreen({ route, navigation }) {
  const { merchantSecurityDocumentId } = route.params;

  const { height, width } = useWindowDimensions();

  const [imageUri, setImageUri] = useState(null);
  const [securityData, setSecurityData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const onFocus = () => {
    httpRequest(
      'get-merchant-security-detail',
      'post',
      {
        MerchantSecurityDocumentId: merchantSecurityDocumentId,
      },
      setIsLoading,
      true,
      navigation
    ).then((data) => {
      setSecurityData(data.Data);
      httpRequest(
        'get-merchant-security-document',
        'post',
        {
          MerchantSecurityId: data.Data?.MerchantSecurityId,
          DocumentName: data.Data?.DocumentName,
        },
        null,
        true,
        navigation
      ).then((data) => {
        if (data.Data) setImageUri(data.Data.SecurityDocument);
        else setImageUri(null);
      });
    });
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
            backgroundColor: '#2A2C29',
          }}>
          <GoBackTopBar backgroundColor="#13150F" navigation={navigation} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ height: '100%' }}>
              <View
                style={{
                  alignItems: 'center',
                  height: height * 0.25,
                  backgroundColor: '#2A2C29',
                }}>
                <Image
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 32.5,
                  }}
                  source={{
                    uri: global.currencies?.find(
                      (e) => e.CurrencyId == securityData?.CurrencyId
                    )?.Image,
                  }}
                />
                <Text
                  style={{
                    marginTop: 15,
                    color:
                      securityData?.MerchantSecurityStatusId == 4
                        ? '#9EE6A8'
                        : 'white',
                    fontSize: 28,
                    fontWeight: 'bold',
                  }}>
                  {securityData?.MerchantSecurityStatusId == 4 ? '+' : ''}
                  {securityData?.Security} {securityData?.Currency}
                </Text>
                <Text style={{ color: 'white', marginTop: 10, fontSize: 16 }}>
                  {securityData?.Description}
                </Text>
                <View style={{ marginLeft: 25 }}>
                  <FilterView
                    filterName={securityData?.MerchantSecurityStatus}
                    disabled={true}
                    color={
                      securityData?.MerchantSecurityStatusId == 4
                        ? '#9EE6A8'
                        : 'white'
                    }
                    textColor={
                      securityData?.MerchantSecurityStatusId == 4
                        ? 'black'
                        : 'white'
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  height: '100%',
                  backgroundColor: '#13150F',
                }}>
                <Text
                  style={{
                    color: 'white',
                    marginTop: 30,
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}>
                  Security Details
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    Security ID
                  </Text>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    #{securityData?.MerchantSecurityId}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    Created Date
                  </Text>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    {formateFullDate(new Date(securityData?.CreatedDate))}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    Updated Date
                  </Text>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    {formateFullDate(new Date(securityData?.UpdatedDate))}
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      marginTop: 20,
                      marginBottom: 15,
                      borderWidth: 1,
                      borderColor: '#2A2C29',
                    }}></View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 22,
                      fontWeight: 'bold',
                    }}>
                    Bank Information
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                      Bank Name
                    </Text>
                    <Text
                      style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                      {securityData?.BankName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                      Account Title
                    </Text>
                    <Text
                      style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                      {securityData?.AccountTitle}
                    </Text>
                  </View>
                  {securityData?.BankAccountNumberTypeId == 1 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        IBAN
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        {securityData?.IBAN}
                      </Text>
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                      Origin of Bank
                    </Text>
                    <Text
                      style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                      {securityData?.CountryName}
                    </Text>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      marginTop: 20,
                      marginBottom: 15,
                      borderWidth: 1,
                      borderColor: '#2A2C29',
                    }}></View>

                  <Image
                    style={{ width: '100%', height: '100%' }}
                    src={imageUri}
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
