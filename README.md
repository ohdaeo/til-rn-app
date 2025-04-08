# React Native

### 1. 프로젝트 폴더 구성

**1. 상위폴더**

- `yarn.lock 파일 삭제`
- `/src 폴더` 생성
- `/assets 폴더` 생성
- `/utils 폴더` 생성
- `/api 폴더` 생성

**2. 하위폴더**

- `/src/components 폴더` 생성
- `/src/screens 폴더` 생성
- `/src/navigations 폴더` 생성

### 2. 라우터 설정하기(Screen)

[React Navigation](https://reactnavigation.org/docs/getting-started/)
[React-native navigation 이용하여 개발하기](https://velog.io/@slobber/React-native-navigation-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0)
[React Native](https://reactnative.dev/docs/navigation)

1. 라우터 npm 설치하기
   **주의사항**
   > 버전을 반드시 맞춰주어야한다.

```bash
npm install @react-navigation/native@6.1.18
npm install @react-navigation/stack@6.4.1
npm install @react-native-masked-view/masked-view@0.3.1
npm install react-native-gesture-handler@2.20.0
npm install react-native-safe-area-context@4.11.0
npm install react-native-screens@3.34.0
```

### 3. Java 수정하기

- android\app\src\main\java\com\폴더명\MainActivity.java

```java
import android.os.Bundle;// 추가

// 추가
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
```

```bash
cd android
↓
./gradlew clean
↓
cd ..
```

### 4. Screen 구성하기

- src\screens\HomeScreen.tsx
- src\screens\AboutScreen.tsx
- src\screens\WebViewScreen.tsx

```tsx
import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

const HomeScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});

export default HomeScreen;
```

### 5. Navigation 설정하기

- src\navigations\ScreenStackNavigator.tsx

```tsx
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import WebViewScreen from '../screens/WebViewScreen';

const ScreenStackNavigator = (): JSX.Element => {
  /*
   *screen 스택에 대한 정보관리
   *변수명을 Stack으로 설정
   */
  const stack = createStackNavigator();

  return (
    <stack.Navigator>
      <stack.Screen name="Home" component={HomeScreen} />
      <stack.Screen name="About" component={AboutScreen} />
      <stack.Screen name="WebView" component={WebViewScreen} />
    </stack.Navigator>
  );
};

export default ScreenStackNavigator;
```

- index.js

```js
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
/**네비게이터 추가 */
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
```

- App.tsx 수정하기

```tsx
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import ScreenStackNavigator from './src/navigations/ScreenStackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <ScreenStackNavigator />
    </NavigationContainer>
  );
};

export default App;
```

### 6. 시작하기

```bash
npm start
```

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
```

### 7. WebView 적용하기

[React Native WebView](https://www.npmjs.com/package/react-native-webview)

```bash
npm i react-native-webview
```

- src\screens\WebViewScreen.tsx

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

const WebViewScreen = (): JSX.Element => {
  const webUrl = 'http://192.168.0.76:3000';
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{uri: webUrl}} />
    </SafeAreaView>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default WebViewScreen;
```

### 8. 로딩 설정하기

[데이터 로딩 UI를 자연스럽게 구성해보자](https://velog.io/@ttoottie/RN-데이터-로딩-UI를-자연스럽게-구성해보자)

- src\screens\WebViewScreen.tsx

```tsx
import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';

const WebViewScreen = (): JSX.Element => {
  const webUrl = 'http://192.168.0.76:3000';
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{uri: webUrl}} // 웹뷰에서 보여줄 url
        startInLoadingState={true} // 로딩중일때 로딩화면을 보여준다.
        renderLoading={() => (
          <View>
            {/* 로딩중일때 보여줄 화면 */}
            <ActivityIndicator
              style={styles.loadingContainer}
              size="large"
              color="#0000ff"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  webview: {flex: 1},
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default WebViewScreen;
```

### 9. WebView JS 연동하기

**1. 웹 서비스에 세팅하기**

- 다른 Next.js 프로젝트 파일
- src\app\page.tsx

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, {useEffect, useState} from 'react';

function Home() {
  /**전달받은 메세지를 확인하는 용도 */
  const [message, setMessage] = useState<string>('');

  //React Native 메세지 보내기
  /**시간 메세지 송신 */
  const handleTime = () => {
    (window as any).ReactNativeWebView?.postMessage(new Date().toISOString());
  };
  /**count 값을 0으로 초기화 후 메세지 송신 */
  const handleCount = () => {
    (window as any).ReactNativeWebView?.postMessage('INIT_DATA');
  };

  /**window 에서 받은 메세지를 처리
   * 하나의 형식 즉, 외부에서 전달되는 메세지를 받는다.
   */
  const handleMessage = (event: MessageEvent) => {
    try {
      /**메세지의 원본데이터 */
      const rawData = event.data;
      // 타입 체크
      const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
      if (!data) {
        return;
      }
      /**
       * 전달된 data 는 type 과 payload 속성이 존재한다
       * type은 자유롭게 정의할 수 있다
       */

      if (data.type === 'INIT_DATA') {
        setMessage(`${data.payload.message}`);
      } else if (data.type === 'UPDATE_COUNT') {
        setMessage(`UPDATE : ${data.payload.count}`);
      }
    } catch (error) {
      console.log('메세지 파싱 에러 : ', error);
      setMessage(`ERROR : ${error}`);
    }
  };

  /**화면에 보이면 addEventListener 로 이벤드 핸들러 등록 */
  useEffect(() => {
    window.addEventListener('message', handleMessage);
    // 클린업 함수 : 화면에서 사라지면 이벤트 핸들러는 해제
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div>
      <div>전달 받은 데이터 메시지 출력 : {message}</div>
      <div className="flex gap-2 justify-center">
        <button className="border rounded-md p-2" onClick={handleTime}>
          Send Time
        </button>
        <button className="border rounded-md p-2" onClick={handleCount}>
          Reset Count
        </button>
      </div>
    </div>
  );
}

export default Home;
```

**2. React Native에 세팅하기**

- 다른프로젝트\src\app\page.tsx

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, {useEffect, useState} from 'react';

function Home() {
  /**전달받은 메세지를 확인하는 용도 */
  const [message, setMessage] = useState<string>('');

  //React Native 메세지 보내기
  /**시간 메세지 송신
   * React Native 로 메세지를 보낼시 아래의 형식을 준수
   * React Native의 onMessage가 실행된다
   */
  const handleTime = () => {
    (window as any).ReactNativeWebView?.postMessage(new Date().toISOString());
  };
  /**count 값을 0으로 초기화 후 메세지 송신 */
  const handleCount = () => {
    (window as any).ReactNativeWebView?.postMessage('INIT_DATA');
  };

  /**window 에서 받은 메세지를 처리
   * 하나의 형식 즉, 외부에서 전달되는 메세지를 받는다.
   */
  const handleMessage = (event: MessageEvent) => {
    try {
      /**메세지의 원본데이터 */
      const rawData = event.data;
      // 타입 체크
      const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
      if (!data) {
        return;
      }
      /**
       * 전달된 data 는 type 과 payload 속성이 존재한다
       * type은 자유롭게 정의할 수 있다
       */

      if (data.type === 'INIT_DATA') {
        setMessage(`${data.payload.message}`);
      } else if (data.type === 'UPDATE_COUNT') {
        setMessage(`UPDATE : ${data.payload.count}`);
      }
    } catch (error) {
      console.log('메세지 파싱 에러 : ', error);
      setMessage(`ERROR : ${error}`);
    }
  };

  /**화면에 보이면 addEventListener 로 이벤드 핸들러 등록 */
  useEffect(() => {
    window.addEventListener('message', handleMessage);
    // 클린업 함수 : 화면에서 사라지면 이벤트 핸들러는 해제
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div>
      <div>전달 받은 데이터 메시지 출력 : {message}</div>
      <div className="flex gap-2 justify-center">
        <button className="border rounded-md p-2" onClick={handleTime}>
          Send Time
        </button>
        <button className="border rounded-md p-2" onClick={handleCount}>
          Reset Count
        </button>
      </div>
    </div>
  );
}

export default Home;
```

- src\screens\WebViewScreen.tsx

```tsx
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import WebView from 'react-native-webview';

const WebViewScreen = (): JSX.Element => {
  const webUrl = 'http://192.168.0.76:3000';

  // webview의 url 에 있는 페이지가 모두 로딩이 되었는지 체크한다.
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 어떤 webview를 대상으로 메세지를 체크하는지 확인한다.
  const webViewRef = useRef<WebView>(null);

  const [count, setCount] = useState<number>(0); // count state
  const [message, setMessage] = useState<string>(''); // 전달 받은 message

  // webview 로 데이터를 보내는 함수
  const sendDataWeb = (data: any) => {
    const messageData = JSON.stringify(data);
    webViewRef.current?.injectJavaScript(`
      window.postMessage('${messageData}', '*');
      true;
    `);
  };
  // webview 로 데이터를 받는 함수
  const onMessage = (event: any) => {
    const data = event.nativeEvent.data;
    console.log('data', data);
    if (data === 'load') {
      setIsLoading(true);
      sendDataWeb({type: 'INIT_DATA', payload: {message: 'Hello Next!'}});
      return;
    }
    // WebView 에서 INIT_DATA 글자가 전송됐을 경우
    if (data === 'INIT_DATA') {
      setCount(0);
      return;
    }
    // 날짜가 전송됐을 경우
    setMessage(data);
  };

  const handleButtonClick = () => {
    //버튼 클릭 시 카운트 증가
    const temp = count + 1;
    setCount(temp);
    // WebView 로 카운트 데이터 전송
    sendDataWeb({
      type: 'UPDATE_COUNT',
      payload: {count: temp},
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        ref={webViewRef}
        onMessage={onMessage}
        injectedJavaScript={`
          window.ReactNativeWebView.postMessage('load');
          window.addEventListener('message', function(event){
          try{
          const data = JSON.parse(event.data);
          if(data.type === 'UPDATE_COUNT'){
          // 웹페이지에서 카운트 데이터 처리
        console.log('Count updated :',data.payload.count )
          }
          }
          catch(e){
        console.log(e)
          }
          });
          true;
        `}
        source={{uri: webUrl}} // 웹뷰에서 보여줄 url
        startInLoadingState={true} // 로딩중일때 로딩화면을 보여준다.
        renderLoading={() => (
          <View>
            {/* 로딩중일때 보여줄 화면 */}
            <ActivityIndicator
              style={styles.loadingContainer}
              size="large"
              color="#0000ff"
            />
          </View>
        )}
      />
      <View style={styles.messageContainer}>
        <Text>{message}</Text>
      </View>
      <View style={styles.control}>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={handleButtonClick}>
          <Text style={styles.buttonTxt}>{count}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  webview: {flex: 1},
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  messageContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  control: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  roundButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WebViewScreen;
```
