import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Button} from 'react-native';

const HomeScreen = ({navigation}: {navigation: any}): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home Screen</Text>
        <Button
          title={'About 이동'}
          onPress={() => navigation.navigate('About')}
        />
        <Button
          title={'WebView 이동'}
          onPress={() => navigation.navigate('WebView')}
        />
      </View>
    </SafeAreaView>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default HomeScreen;
