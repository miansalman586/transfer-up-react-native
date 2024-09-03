import * as SecureStore from 'expo-secure-store';

export const updateSetting =  async (setting) => {
    await SecureStore.setItemAsync('Setting', JSON.stringify(setting));
};

export const getSetting = async () => {
    let setting =  await SecureStore.getItemAsync('Setting');
    return JSON.parse(setting);
};