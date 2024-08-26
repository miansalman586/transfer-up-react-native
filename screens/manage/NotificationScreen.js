import { View, ScrollView, Text } from 'react-native';
import GoBackTopBar from '../../components/GoBackTopBar';

import { useState, useEffect } from 'react';

import NotificationLoader from '../../components/NotificationLoader';

import NotificationItem from '../../components/NotificationItem';

import httpRequest from '../../utils/httpRequest';

export default function NotificationScreen({ navigation }) {
  const [notifications, setNorifications] = useState(null);

  const onFocus = () => {
    setNorifications(null);
    httpRequest('get-notification', 'get', null, null, true, navigation).then(
      (data) => {
        if (data.Data) setNorifications(data.Data);
        else setNorifications([]);
      }
    );
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
          color: 'white',
          paddingLeft: 20,
          paddingRight: 20,
          marginBottom: 20,
          fontSize: 28,
          marginTop: 10,
          fontWeight: 'bold',
        }}>
        Inbox
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginLeft: 20, marginTop: 20 }}>
          <Text style={{ color: 'white' }}>Notifications</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            borderWidth: 1,
            marginLeft: 20,
            marginRight: 20,
            borderColor: '#2A2C29',
          }}></View>
        <View style={{}}>
          {!notifications && (
            <View style={{ flex: 'row' }}>
              <NotificationLoader count={10} />
            </View>
          )}
          {notifications?.map((notificationData, index) => (
            <NotificationItem
              key={index}
              notificationData={notificationData}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
