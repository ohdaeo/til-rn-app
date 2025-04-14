# Navigator

## 네비게이션 (라우터 처럼 생각하기)

[React Navigation](https://reactnavigation.org/docs/getting-started)
[Navigating Between Screens](https://reactnative.dev/docs/navigation)

- 위의 내용으로는 어려움이 있습니다.
  [React-native navigation 이용하여 개발하기](https://velog.io/@slobber/React-native-navigation-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0)

### 1. 환경 셋팅

[React Navigation](https://reactnavigation.org/)

[stack-navigator](https://reactnavigation.org/docs/stack-navigator)

```bash
npm install @react-navigation/native@6.1.18
npm install @react-navigation/stack@6.4.1
npm install @react-native-masked-view/masked-view@0.3.1
npm install react-native-gesture-handler@2.20.0
npm install react-native-safe-area-context@4.11.0
npm install react-native-screens@3.34.0
```

## MainActivity.java 수정

- android/app/src/main/java/com/프로젝트명/MainActivity.java 수정
- 샘플 work 프로젝트
  - `android/app/src/main/java/com/work/MainActivity.java` 수정

```java
package com.tilapp;


import com.facebook.react.ReactActivity;
// 추가
import android.os.Bundle;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "work";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }

// 추가
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
}
```

## Screen 구성하기

- src\screens\HomeScreen.tsx

```tsx
import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Button} from 'react-native';

const HomeScreen = ({navigation}: {navigation: any}): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home Screen</Text>
        <Button
          title={'상세화면 이동'}
          onPress={() => navigation.navigate('Detail')}
        />
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

export default HomeScreen;
```

- src\screens\DetailScreen.tsx

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

function DetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>DetailScreen</Text>
      </View>
    </SafeAreaView>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
```

## Navigation 연결하기

1. App.tsx

```tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DetailScreen from './src/screens/DetailScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
```

1. NavigationContainer

- 애플리케이션의 전체 네비게이션 상태를 관리하는 최상위 컨테이너입니다
- 모든 네비게이터 컴포넌트는 반드시 NavigationContainer 내부에 위치해야 합니다
- 네비게이션 상태와 테마를 전역적으로 관리합니다

2. Stack.Navigator

- 스택 기반 네비게이션을 제공하는 네비게이터 컴포넌트입니다
- 각 스크린은 스택 구조로 관리되어 순차적으로 화면 전환이 이루어집니다
- iOS에서는 UINavigationController, Android에서는 Fragment를 활용하여 네이티브 성능을 제공합니다

```tsx
// 헤더 관련 옵션
<Stack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
/>
```

3. Stack.Screen

- 실제 화면을 렌더링하는 컴포넌트입니다
- name과 component props를 통해 특정 이름으로 스크린을 정의하고 연결합니다
- 각 스크린별로 독립적인 옵션을 설정할 수 있습니다

```tsx
// 기본 옵션
<Stack.Screen name="Home" component={HomeScreen}
  options={{
    title: '홈화면', // 헤더 제목
    headerStyle: {
    backgroundColor: '#f4511e', // 헤더 배경 색상
    },
    headerTintColor: '#fff', // 헤더 글자 색상
    headerTitleStyle: {
    // 제목 스타일
    fontWeight: 'bold',
    },
    headerTitleAlign: 'center', // 제목 가운데 정렬
    // headerShown: false, // 헤더 숨기기
    gestureEnabled: true, // 제스처 활성화
  }}
/>

// 프레젠테이션 모드
<Stack.Screen
  name="ModalScreen"
  component={ModalScreen}
  options={{
    presentation: 'modal',         // 모달 형태로 표시
    animationTypeForReplace: 'push', // replace 애니메이션 유형
  }}
/>

// 폼 시트(Bottom Sheet)
<Stack.Screen
  name="BottomSheet"
  component={BottomSheetScreen}
  options={{
    presentation: 'formSheet',
    headerShown: false,
    sheetAllowedDetents: [0.2, 0.5, 0.8], // 높이 조절
  }}
/>

<Stack.Screen
  name="Detail"
  component={DetailScreen}
  options={{
    title: '상세 화면',
    headerStyle: {backgroundColor: 'hotpink'},
    headerTintColor: '#fff',
    headerTitleAlign: 'left',
    headerShown: true,
    gestureEnabled: true,
    animationEnabled: true, // 애니메이션 활성화
    animationTypeForReplace: 'push', // 애니메이션 종류
    headerRight: () => (
      // 오른쪽 버튼
      <Button
        title="Info"
        color={'blue'}
        onPress={() => Alert.alert('안녕')}
      />
    ),
    headerLeft: () => (
      // 왼쪽 버튼
      <Button
        title="Info"
        color={'red'}
        onPress={() => Alert.alert('반가워')}
      />
    ),
  }}
/>

// navigation prop을 사용하여 뒤로가기 버튼 추가
<Stack.Screen
  name="Detail"
  component={DetailScreen}
  options={({navigation}) => ({
    title: '상세화면',
    headerStyle: {backgroundColor: 'hotpink'},
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerLeft: () => (
      <Button
        title="뒤로가기"
        color={'red'}
        onPress={() => navigation.goBack()}
      />
    ),
  })}
/>
```

**headerRight props 데이터 전달하기**

- App.tsx

```tsx
<Stack.Screen
  name="Detail"
  component={DetailScreen}
  options={({navigation}) => ({
    // navigation prop을 사용하여 뒤로가기 버튼 추가
    title: '상세화면',
    headerStyle: {backgroundColor: 'hotpink'},
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerLeft: () => (
      <Button
        title="뒤로가기"
        color={'red'}
        onPress={() => navigation.goBack()}
      />
    ),
  })}
/>
```

- src\screens\DetailScreen.tsx

```tsx
import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

// route 에 추가적으로 우리가 만든 prop 전달하기
type RootStackParamList = {
  Details: {userId: number};
};
type DetailRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailScreen = () => {
  const route = useRoute<DetailRouteProp>();
  const {userId} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{userId} 상세화면입니다.</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default DetailScreen;
```

## Tab Navigation

```bash
npm install @react-navigation/bottom-tabs@^6.x
```

- App.tsx

```tsx
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import DetailScreen from './src/screens/DetailScreen';
import HomeScreen from './src/screens/HomeScreen';

const Tab = createBottomTabNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{title: '홈화면'}}
        />
        <Tab.Screen
          name="Details"
          component={DetailScreen}
          options={{title: '상세화면'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
```

```bash
npm install react-native-vector-icons
npm install -D @types/react-native-vector-icons
```

- android\app\build.gradle

```java
apply from: file ("../../node_modules/react-native-vector-icons/fonts.gradle")
// add this line
```

[react-native-vector-icons directory](https://oblador.github.io/react-native-vector-icons/)

- App.tsx

```tsx
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailScreen from './src/screens/DetailScreen';
import HomeScreen from './src/screens/HomeScreen';

const Tab = createBottomTabNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈화면',
            headerStyle: {backgroundColor: '#f4511e'},
            headerTintColor: '#fff',
            tabBarLabel: '홈입니다', // 탭에 표시될 제목
            tabBarIcon: ({focused, color, size}) => {
              let iconName = '';
              iconName = focused ? 'heart-sharp' : 'heart-outline';
              // 아이콘 반환
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: 'skyblue',
              height: 70,
            },
            tabBarBadge: 'message',
            tabBarShowLabel: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
```

## Drawer Navigation

- babel.config.js 수정

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

```bash
npm i react-native-reanimated@3.5.4
npm install @react-navigation/drawer@6.6.9
```

- 디버깅 1. (문제발생시)

```bash
cd android
./gradlew clean
cd ..
npm start
a
```

- 디버깅 2. (문제발생시)

```bash
# 1. 캐시 및 빌드 폴더 삭제
rm -rf node_modules android/app/build android/.gradle

# 2. 패키지 재설치
npm install

# 3. Metro 번들러 캐시 초기화
npx react-native start --reset-cache
```

- App.tsx

```tsx
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import DetailScreen from './src/screens/DetailScreen';
import HomeScreen from './src/screens/HomeScreen';
// 아이콘
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();
const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerType: 'front', // 메뉴 보여주는 옵션
        }}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
            drawerLabel: '나의 홈',
            drawerIcon: ({color, size}) => (
              <Icon name="person-outline" size={size} color={color} />
            ),
            drawerActiveTintColor: 'red',
            drawerInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: 'skyblue',
            },
            headerTintColor: 'white',
            // headerShown: false,
          }}
        />
        <Drawer.Screen name="Details" component={DetailScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
```
