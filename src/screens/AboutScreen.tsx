import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const AboutScreen = (): JSX.Element => {
  // 초기 선택된 목록관련 state
  const [selected, setSelected] = useState<string>('banana');
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>목록에서 선택하시오.</Text>
        <View>
          <Picker
            selectedValue={selected}
            onValueChange={itemValue => setSelected(itemValue)}
            mode="dialog">
            <Picker.Item label="사과" value={'apple'} />
            <Picker.Item label="바나나" value={'banana'} />
            <Picker.Item label="배" value={'bae'} />
            <Picker.Item label="참외" value={'melon'} />
          </Picker>
        </View>
        <Text style={{color: 'red'}}>선택한 과일: {selected}</Text>
      </View>
    </SafeAreaView>
  );
};
// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default AboutScreen;
