import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

export default function InputSearch({ borderColor, searchData }) {
  const [searchText, setSearchText] = useState(null);

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleFocus = () => {
    setIsSearchFocused(true);
  };

  const handleBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <View
      style={{
        height: 50,
        paddingLeft: 20,
        color: 'white',
        paddingRight: 20,
        borderRadius: 50,
        backgroundColor: '#2A2C29',
        borderWidth: 2,
        marginLeft: 15,
        marginTop: 10,
        marginRight: 15,
        borderColor: isSearchFocused
          ? '#2a80b9'
          : borderColor
          ? borderColor
          : '#2A2C29',
        fontSize: 18,
        flexDirection: 'row',
      }}>
      <View style={{ paddingTop: 12 }}>
        <Icon
          name="search"
          size={22}
          color={isSearchFocused ? '#2a80b9' : 'white'}
        />
      </View>
      <TextInput
        style={{
          color: 'white',
          fontSize: 18,
          flex: 10,
          marginLeft: 15,
        }}
        value={searchText}
        placeholderTextColor="white"
        onChangeText={(value) => {
          if (searchData) searchData(value);

          setSearchText(value);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={isSearchFocused ? '' : 'Search'}
        selectionColor="#2a80b9"
      />
      {searchText && (
        <TouchableOpacity
          style={{ paddingTop: 10, paddingLeft: 13 }}
          onPress={() => {
            if (searchData) searchData(null);

            setSearchText(null);
          }}>
          <FontAwesome
            name="close"
            size={25}
            color={isSearchFocused ? '#2a80b9' : 'white'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
