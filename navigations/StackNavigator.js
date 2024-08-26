import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTabNavigator from '../navigations/tabs/HomeTabNavigator';
import TransactionScreen from '../screens/TransactionScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import BalanceScreen from '../screens/BalanceScreen';
import AddBalanceScreen from '../screens/AddBalanceScreen';
import ConvertBalanceScreen from '../screens/ConvertBalanceScreen';
import SendMoneyScreen from '../screens/SendMoneyScreen';
import AutoWithdrawalRecipientScreen from '../screens/AutoWithdrawalRecipientScreen';
import AddRecipientScreen from '../screens/recipient/AddRecipientScreen';
import RecipientDetailScreen from '../screens/recipient/RecipientDetailScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTab">
        <Stack.Screen
          name="HomeTab"
          component={HomeTabNavigator}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Transaction"
          component={TransactionScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Balance"
          component={BalanceScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddBalance"
          component={AddBalanceScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ConvertBalance"
          component={ConvertBalanceScreen}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="SendMoney"
          component={SendMoneyScreen}
          options={{
            headerShown: false,
          }}
        />
           <Stack.Screen
          name="AutoWithdrawalRecipient"
          component={AutoWithdrawalRecipientScreen}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="AddRecipient"
          component={AddRecipientScreen}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="RecipientDetail"
          component={RecipientDetailScreen}
          options={{
            headerShown: false,
          }}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
