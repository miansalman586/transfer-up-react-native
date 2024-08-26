import { Pressable, View, Image, Text } from "react-native";

import RadioButton from "./RadionButton";

export default function PayPalTransactionTypeItem(
    {paypalTransactionTypeId, paypalTransactionTypeData, callback}
) {
return(
    <Pressable
    style={{
      paddingLeft: 20,
      paddingTop: 15,
      paddingBottom: 20,
      paddingRight: 20,
      backgroundColor: '#2A2C29',
    }}
    onPress={() => {
      callback();
    }}>
    <View style={{ flexDirection: 'row' }}>
   
      <View style={{ marginTop: 3, flex: 1 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
          }}>
          {paypalTransactionTypeData.transactionType}
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            marginTop: 10,
          }}>
          {paypalTransactionTypeData.payPalTransactionTypeDescription}
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            marginTop: 10,
          }}>
          {paypalTransactionTypeData.payPalTransactionTypeDescription2}
        </Text>
      </View>
        <View style={{ marginTop: 15 }}>
          <RadioButton selected={paypalTransactionTypeId == paypalTransactionTypeData.payPalTransactionTypeId} />
        </View>
    </View>
  </Pressable>
);
}