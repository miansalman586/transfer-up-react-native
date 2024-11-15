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
import SettingsScreen from '../screens/manage/SettingsScreen';
import PrivacySecurityScreen from '../screens/manage/PrivacySecurityScreen';
import ChangePasswordScreen from '../screens/manage/ChangePasswordScreen';
import FindMeByScreen from '../screens/manage/FindMeByScreen';
import ChangeEmailAddressScreen from '../screens/manage/ChangeEmailAddressScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ChangePhoneNumberScreen from '../screens/profile/ChangePhoneNumberScreen';
import ChangePhoneNumberOTPScreen from '../screens/profile/ChangePhoneNumberOTPScreen';
import LoginScreen from '../screens/LoginScreen';
import StartScreen from '../screens/StartScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import EmailAddressRegisterScreen from  '../screens/register/EmailAddressRegisterScreen';
import PhoneNumberRegisterScreen from '../screens/register/PhoneNumberRegisterScreen';
import PersonalDetailRegisterScreen from '../screens/register/PersonalDetailRegisterScreen';
import AddressDetailRegisterScreen from '../screens/register/AddressDetailRegisterScreen';
import RegisterSuccessScreen from '../screens/register/RegisterSuccessScreen';

import OTPVerificationRegisterScreen from '../screens/register/OTPVerificationRegisterScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
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

<Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="PrivacySecurity"
          component={PrivacySecurityScreen}
          options={{
            headerShown: false,
          }}
        />

        
<Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="FindMeBy"
          component={FindMeByScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangeEmailAddress"
          component={ChangeEmailAddressScreen}
          options={{
            headerShown: false,
          }}
        />
            <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />

      
<Stack.Screen
          name="ChangePhoneNumber"
          component={ChangePhoneNumberScreen}
          options={{
            headerShown: false,
          }}
        />

    
<Stack.Screen
          name="ChangePhoneNumberOTP"
          component={ChangePhoneNumberOTPScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            gestureEnabled: false

          }}
        />


<Stack.Screen
          name="Start"
          component={StartScreen}
          options={{
            headerShown: false,
            
          }}
        />

<Stack.Screen
          name="OnBoarding"
          component={OnBoardingScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />


<Stack.Screen
          name="EmailAddressRegister"
          component={EmailAddressRegisterScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="PhoneNumberRegister"
          component={PhoneNumberRegisterScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="PersonalDetailRegister"
          component={PersonalDetailRegisterScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="AddressDetailRegister"
          component={AddressDetailRegisterScreen}
          options={{
            headerShown: false,
          }}
        />


<Stack.Screen
          name="OTPVerificationRegister"
          component={OTPVerificationRegisterScreen}
          options={{
            headerShown: false,
          }}
        />



<Stack.Screen
          name="RegisterSuccess"
          component={RegisterSuccessScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
