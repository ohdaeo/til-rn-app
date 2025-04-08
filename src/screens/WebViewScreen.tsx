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
