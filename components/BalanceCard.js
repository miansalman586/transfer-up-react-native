import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function BalanceCard({ navigation, balanceData }) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        navigation.navigate('Balance', { currencyId: balanceData.currencyId });
      }}
      style={{
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 25,
        height: 220,
        width: 220,
        marginRight: 20,
        borderRadius: 25,
        backgroundColor: '#2A2C29',
        justifyContent: 'space-between',
      }}>
      <Image
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={{
          uri: balanceData.image,
        }}
      />
      <View>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 22,
          }}>
          {balanceData.totalBalance.toFixed(2)} {balanceData.currency}
        </Text>
        <Text style={{ color: 'white', fontSize: 14, marginTop: 5 }}>
          {balanceData.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
