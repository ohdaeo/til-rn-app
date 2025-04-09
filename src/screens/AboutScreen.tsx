import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

const AboutScreen = (): JSX.Element => {
  const data = [
    {id: 1, title: '사과'},
    {id: 2, title: '딸기'},
    {id: 3, title: '배'},
    {id: 4, title: '체리'},
    {id: 5, title: '포도'},
    {id: 6, title: '복숭아'},
    {id: 7, title: '귤'},
  ];

  // 초기 선택 된 목록 관련 state
  const [selected, setSelected] = useState<string>('lemon');
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Choose your fruit</Text>
        <View>
          <Picker
            selectedValue={selected}
            onValueChange={itemValue => setSelected(itemValue)}
            mode="dialog">
            <Picker.Item label="Strawberry" value={'strawberry'} />
            <Picker.Item label="Lemon" value={'lemon'} />
            <Picker.Item label="Mango" value={'mango'} />
            <Picker.Item label="Banana" value={'banana'} />
          </Picker>
        </View>
        <Text style={{color: 'red'}}>my fruit: {selected}</Text>
      </View>
    </SafeAreaView>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AboutScreen;
