# React Native

## Component

[Core Components and APIs](https://reactnative.dev/docs/0.74/components-and-apis)

### Core Components

#### 1. View Component

- 리액트 네이티브에서 사용자 인터페이스를 만드는 데 사용되는 기본적인 빌딩 블록이다.
- View 컴포넌트는 div 태그와 같은 역할을 한다.
- flexbox, 스타일, 일부 터치 처리, 접근성 컨트롤을 지원하는 컨테이너

```tsx
import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

const AboutScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle} />
    </SafeAreaView>
  );
};

export default AboutScreen;
```

#### 2. Text Component

- 텍스트를 표시하기 위한 React 컴포넌트
- 텍스트 문자열을 표시, 스타일링하고 중첩하며, 심지어 터치 이벤트를 처리
- 중첩, 스타일링 및 터치 핸들링을 지원한다.

**1. numberOfLines**
: 줄 바꿈을 포함하여 줄임표로 텍스트를 잘라낸다.
일반적으로 ellipsizeMode와 함께 사용된다.

**2. ellipsizeMode**
: numberOfLines, 텍스트가 어떻게 잘릴지 정의한다.

- head : 줄의 시작 부분에 있는 누락된 텍스트는 줄임표 문자로 표시된다. 예: "...wxyz"
- middle : 시작과 끝이 컨테이너에 맞도록 줄이 표시되고 중간에 말 줄임표 "ab...yz"로 표시된다.
- tail : 줄의 끝에 있는 누락된 텍스트는 줄임표로 표시 예: "abcd..."
- clip :선은 텍스트 컨테이너의 가장자리를 넘어 말줄임표 없이 끊긴다.

**3. selectable**
: 사용자가 텍스트를 선택하여 복사 및 붙여넣기 기능을 사용할 수 있게한다.

```tsx
const AboutScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle}>
        <Text
          style={styles.text}
          numberOfLines={2}
          ellipsizeMode="tail"
          selectable
          onPress={() => Alert.alert('click')}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
          rerum aspernatur!{' '}
          <Text style={{color: 'green'}}>
            Nostrum cupiditate et eum vel natus rerum necessitatibus tempora
          </Text>
          velit vitae corrupti praesentium veniam, laudantium est sequi delectus
          reprehenderit ipsa quisquam eaque aut laborum. Error perferendis autem
          hic, tenetur excepturi neque provident, unde illum rem aliquid, ab quidem
          similique.
        </Text>
      </View>
    </SafeAreaView>
  );
};
```

**TextInput**

- 텍스트를 입력하기 위한 기본 구성 요소
- 자동 수정, 자동 대문자, 자리 표시자 텍스트 및 숫자 키패드와 같은 다양한 키보드 유형의 여러 기능제공

**1. 텍스트필드**

```tsx
const AboutScreen = (): JSX.Element => {
  const [name, setName] = useState<string>('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle}>
        <TextInput
          style={styles.input}
          placeholder="이름을 입력해주세요"
          value={name}
          onChangeText={setName} // onChange 대신 onChangeText 을 사용한다.
        />
      </View>
    </SafeAreaView>
  );
};
```

**2. 비밀번호 필드**

```tsx
<TextInput
  style={styles.input}
  placeholder="비밀번호를 입력해주세요"
  secureTextEntry={true} // 텍스트를 가려 비밀번호 같은 민감한 텍스트를 안전하게 유지한다.
/>
```

**3. 숫자필드**

```tsx
<TextInput
  style={styles.input}
  placeholder="숫자를 입력해주세요"
  keyboardType="numeric"
/>
```

default
url
![default](https://github.com/user-attachments/assets/f5fc6341-8ff3-443f-be03-a7ee416b10bd)
number-pad
decimal-pad
numeric
![number-pad](https://github.com/user-attachments/assets/bb8e7811-364a-4d5e-bd51-fd7a0a954756)
phone-pad
email-address
![phone-pad](https://github.com/user-attachments/assets/6cfd6ad7-746a-446b-b803-b2671fe0603c)

**4. autoCapitalize**
:특정 문자를 자동으로 대문자로 표시.

- characters: 모든 문자.
- words: 각 단어의 첫 글자.
- sentences: 각 문장의 첫 글자 ( 기본값 ).
- none: 아무것도 자동으로 대문자로 바꾸지않는다.

```tsx
<TextInput
  style={styles.input}
  placeholder="첫 단어 대문자 표시"
  autoCapitalize="words"
/>
```

**5. returnKeyType / onSubmitEditing**
: 리턴 키의 모양을 결정합니다. / 텍스트 입력의 제출 버튼을 눌렀을 때 호출되는 콜백

```tsx
<TextInput
  style={styles.input}
  returnKeyType="done"
  onSubmitEditing={() => Alert.alert('엔터키')}
/>
```

#### 3. Button Component

- 두 가지의 필수 속성이 있다. title, onPress
- title : 버튼 이름
- onPress : 버튼을 클릭했을 때 실행되는 함수

```tsx
<Button
  title="클릭"
  onPress={() => Alert.alert('클릭')}
  color={'red'}
  disabled={true}
/>
```

#### 4. Image Component

- 이미지, 정적 리소스 등 다양한 유형의 이미지를 표시하기 위한 React 구성 요소
- source 속성 사용 - local에 있는 파일, 외부 이미지 URL 사용 가능
- `source`={require('절대경로/상대경로')}
- `source`={{uri: '외부 경로'}}

```tsx
<Image source={{uri: 'https://picsum.photos/200/300?random=1'}} style={{width: 200}} />
<Image source={require('../../assets/202212008462_500.jpg')} style={{width: 200}}/>
```

**1. resizeMode**
: 이미지 크기와 일치하지 않을 때 이미지 크기를 조정하는 방법

- cover: 이미지를 확대/축소하여 뷰를 완전히 채움
- contain: 이미지가 뷰보다 작지 않도록 확대/축소
- stretch: 비율 무시하고 뷰에 완전히 맞춤
- repeat: 이미지를 반복해서 뷰를 채움
- center: 뷰의 중앙에 이미지 배치

**2. blurRadius**
: 이미지에 추가된 블러 필터의 블러

```tsx
<Image
  source={{uri: 'https://picsum.photos/200/300?random=1'}}
  style={{width: 200, height: 200}}
  blurRadius={5}
/>
```

**3. onError / onLoadEnd / onLoadStart**
: onLoadStart: 이미지 로딩이 시작될 때 호출
: onLoadEnd: 이미지 로딩이 완료되거나 실패했을 때 호출
: onError: 이미지 로딩에 실패했을 때 호출

```tsx
<Image
  source={{uri: 'https://picsum.photos/200/300?random=1'}}
  onError={() => Alert.alert('로딩실패')}
/>
```

#### 5. ScrollView

- 데이터의 양이 많아 화면을 넘어가게 될 때, 스크롤이 생겨 화면을 넘길 수 있게 해주는 컴포넌트

```tsx
return (
  <SafeAreaView style={styles.container}>
    <View style={styles.viewStyle}>
      <ScrollView>
        <Text>lorem500</Text>
      </ScrollView>
    </View>
  </SafeAreaView>
);
```

**1. horizontal**
: 수직으로 배열되는 대신 행에 수평으로 배열

```tsx
return (
  <SafeAreaView style={styles.container}>
    <View style={styles.viewStyle}>
      <ScrollView horizontal>
        <Text>lorem500</Text>
      </ScrollView>
    </View>
  </SafeAreaView>
);
```

**2. scrollEnabled**
: false인 경우, 터치 상호 작용을 통해 뷰를 스크롤할 수 없다.

```tsx
<ScrollView scrollEnabled={false}>
```

**3. onScroll / scrollEventThrottle**
: 스크롤 중 프레임당 최대 한 번만 발생한다.
/ 스크롤하는 동안 스크롤 이벤트가 발생하는 빈도를 제한하며, ms 단위의 시간 간격으로 지정

```tsx
<ScrollView
  onScroll={event => console.log(event.nativeEvent.contentOffset.y)}
  scrollEventThrottle={16}>
```

**4. contentContainerStyle**
: 스크롤 안쪽 스타일시트 설정

```tsx
<ScrollView
  contentContainerStyle={{
    padding: 20,
    margin: 20,
    alignItems: 'center',
    backgroundColor: 'skyblue',
  }}>
```

**5. refreshControl**
: ScrollView 또는 ListView 내부에서 당겨서 새로 고침 기능을 추가하는 데 사용

```tsx
<ScrollView
  refreshControl={
    <RefreshControl refreshing={refreshing}
    onRefresh={() => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 2000);
      }}
    />
  }
>
```

**6. showsVerticalScrollIndicator**

```tsx
<ScrollView showsVerticalScrollIndicator={false} />
```

#### 6. TouchableOpacity

- 터치 이벤트에 반응하여 불투명도를 변경함으로써 시각적 피드백을 제공하는 컴포넌트

```tsx
return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle}>
        <TouchableOpacity onPress={() => Alert.alert('버튼클릭')}>
          <Text>버튼입니다</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
```

1. activeOpacity
   : 터치가 활성화될 때 래핑된 뷰의 불투명도가 어떻게 되어야 하는지 결정

```tsx
<TouchableOpacity
  onPress={() => Alert.alert('버튼클릭')}
  style={{
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 10,
  }}
  activeOpacity={0.8}>
  <Text>버튼입니다</Text>
</TouchableOpacity>
```

2. onLongPress

- 사용자가 컴포넌트를 일정 시간 동안 누르고 있는 경우 호출되는 콜백 함수

```tsx
<TouchableOpacity
  onPress={() => Alert.alert('버튼클릭')}
  onLongPress={() => Alert.alert('버튼 길게 클릭')}>
  <Text>버튼입니다</Text>
</TouchableOpacity>
```

3. hitSlop

- 실제 터치 영역을 컴포넌트의 크기보다 더 크게 설정하여 터치 영역을 확대

```tsx
<TouchableOpacity
  disabled={true}
  onPress={() => Alert.alert('버튼클릭')}
  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
  <Text style={{backgroundColor: 'red'}}>버튼입니다</Text>
</TouchableOpacity>
```

#### 7. FlatList

- 많은 양의 스크롤이 필요한 리스트 아이템을 보여주고자 할 때 유용하게 사용되는 RN 컴포넌트

```tsx
const AboutScreen = (): JSX.Element => {
  const data = [
    {id: 1, title: '사과'},
    {id: 2, title: '딸기'},
    {id: 3, title: '배'},
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={data}
          renderItem={({item}) => <Text>{item.title}</Text>}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
```

**1. renderItem**
:각 항목을 렌더링하는 함수
{ item, index, separators } 파라미터를 받음
반드시 JSX를 반환해야 함

**2. data**
: 배열 형태의 데이터를 전달
각 항목은 고유한 ID를 가질 수 있음
동적으로 업데이트할 수 있음

**3. KeyExtractor**
:각 항목의 고유 키를 추출하는 함수
성능 최적화를 위해 필수
item => item.id 형태로 구현

**FlatList와 ScrollView의 차이점**

| **특징**       | **FlatList**         | **ScrollView**        |
| -------------- | -------------------- | --------------------- |
| 성능           | 높음 (비트맵 렌더링) | 일반적                |
| 메모리 사용    | 효율적 (가상화)      | 높음 (모든 항목 로드) |
| 데이터 처리    | 자동 페이징          | 전체 로드             |
| 최적 사용 사례 | 대량 데이터          | 소량 데이터           |
| 스크롤 성능    | 매우 좋음            | 데이터 양에 따라 다름 |

**4. ListHeaderComponent / ListFooterComponent**
: 모든 항목의 맨 위에 렌더링된다 / 모든 항목의 하단에 렌더링된다.

```tsx
<FlatList
  data={data}
  renderItem={({item}) => <Text>{item.title}</Text>}
  keyExtractor={item => item.id.toString()}
  ListHeaderComponent={
    <Text style={{fontSize: 20, backgroundColor: 'red'}}>과일 목록</Text>
  }
  ListFooterComponent={
    <Text style={{fontSize: 20, backgroundColor: 'green'}}>하단</Text>
  }
/>
```

**5. ItemSeparatorComponent**
: 각 항목 사이에 렌더링되지만 상단이나 하단에는 렌더링되지 않는다.

```tsx
<FlatList
  data={data}
  renderItem={({item}) => <Text>{item.title}</Text>}
  keyExtractor={item => item.id.toString()}
  ListHeaderComponent={
    <Text style={{fontSize: 20, backgroundColor: 'red'}}>과일 목록</Text>
  }
  ListFooterComponent={
    <Text style={{fontSize: 20, backgroundColor: 'green'}}>하단</Text>
  }
  ItemSeparatorComponent={() => (
    <View
      style={{
        height: 1,
        backgroundColor: 'blue',
        marginTop: 3,
        marginBottom: 3,
      }}
    />
  )}
/>
```

**6. ListEmptyComponent**
: 목록이 비어 있을 때 렌더링된다.

```tsx
<FlatList
  data={[]}
  renderItem={({item}) => <Text>{item.title}</Text>}
  keyExtractor={item => item.id.toString()}
  ListHeaderComponent={
    <Text style={{fontSize: 20, backgroundColor: 'red'}}>과일 목록</Text>
  }
  ListFooterComponent={
    <Text style={{fontSize: 20, backgroundColor: 'green'}}>하단</Text>
  }
  ItemSeparatorComponent={() => (
    <View
      style={{
        height: 1,
        backgroundColor: 'blue',
        marginTop: 3,
        marginBottom: 3,
      }}
    />
  )}
  ListEmptyComponent={<Text>데이터가 없습니다.</Text>}
/>
```

**7. numColumns**
: 괄호 안에 숫자만큼 열로 만들어준다

```tsx
<View>
  <FlatList
    numColumns={4}
    data={data}
    renderItem={({item}) => <Text>{item.title}</Text>}
    keyExtractor={item => item.id.toString()}
  />
</View>
```

**8. refreshControl**

: 5-5 refreshControl 와 동일

```tsx
<SafeAreaView style={styles.container}>
  <View>
    <FlatList
      data={data}
      renderItem={({item}) => <Text>{item.title}</Text>}
      keyExtractor={item => item.id.toString()}
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }}
    />
  </View>
</SafeAreaView>
```

#### 8. SafeAreaView

- 화면상의 안전한 공간, 즉 상단 노치, 하단 홈바 등을 제외한 영역에 배치
- SafeAreaView 로 배치되지 않으면 상단, 하단 기본 영역이 겹침
  **iOS 버전 11 이상이 있는 iOS 기기에만 적용**

```tsx
<SafeAreaView style={styles.container}>
  <View></View>
</SafeAreaView>
```

#### Alert

- 유저에게 경고성 메시지나 안내 메시지보낼수 있다.
- onPress 콜백이 실행되고 알림이 해제되며, 기본적으로 유일한 버튼은 '확인' 버튼이다.

```tsx
<SafeAreaView style={styles.container}>
  <View>
    <Button
      title="버튼"
      onPress={() => {
        Alert.alert('Hello');
      }}
    />
  </View>
</SafeAreaView>
```

```tsx
Alert.alert(
  title: string,  // 알림 제목
  message?: string // 알림 본문 (생략가능)
  buttons?: AlertButton[], // 버튼들의 배열
  options?: AlertOptions  // 추가 설정
)

 <Button
  title="버튼"
  onPress={() => {Alert.alert('Hello', 'Im message',
    {text: '확인', onPress: () => console.log('Good to see you')},
    {text: '취소', onPress: () => console.log('Good to see you')},
    {text: '등록', onPress: () => console.log('Good to see you')},
    ]);
  }}
/>
```

#### Modal

- 사용자가 현재 작업을 완료하기 전에 특정 동작이나 정보를 확인해야 하는 상황에서 사용되는 UI 컴포넌트

```tsx
const [isShow, setIsShow] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="버튼"
          onPress={() => {
            Alert.alert('모달창', '모달창보기 예제입니다.', [
              {
                text: '모달보기',
                style: 'default',
                onPress: () => setIsShow(!isShow),
              },
            ]);
          }}
        />
      </View>
      <Modal>
        <Text>Helloooo</Text>
      </Modal>
    </SafeAreaView>
  );
};
```

**1. visible**
: 모달이 표시되는지 여부를 결정

```tsx
const [isShow, setIsShow] = useState(false);

<Modal visible={isShow}>
  <Text>Helloooo</Text>
</Modal>;
```

**2. transparent**
: 모달이 전체 뷰를 채울지 여부를 결정 `true`는 오버레이 배경 위에 렌더링된다.

```tsx
<Modal transparent={false}>
  <Text>Helloooo</Text>
</Modal>
```

**3. animationType**
: 모달의 애니메이션 방식을 제어
:slide: 아래쪽에서 슬라이딩되며 나타남
:fade: 페이드 인/아웃 효과로 나타남
:none: 애니메이션 없이 즉시 나타남

```tsx
<Modal animationType="fade">
  <Text>Helloooo</Text>
</Modal>
```

#### StatusBar

- 상태 표시줄을 제어하는 ​​구성 요소
- 시간, 배터리 상태, 네트워크 연결 정보 등 중요한 시스템 정보를 표시하며, 앱의 디자인과 통합될 수 있도록 다양한 커스터마이징 옵션을 제공함

**1. backgroundColor (Android 전용)**
:상태바의 배경 색상을 설정
:Android 15(API 레벨 33)부터는 배경색 설정이 제한됨

```tsx
<StatusBar backgroundColor={'#0000ff'} />
```

**2. barStyle**
'default': 기본 스타일 (iOS는 다크, Android는 라이트)
'light-content': 흰색 텍스트와 아이콘
'dark-content': 검은색 텍스트와 아이콘 (Android API 23 이상 필요)

```tsx
<StatusBar barStyle={'default'} />
```

#### Pressable

- 자식 컴포넌트에서 다양한 단계의 누르기 상호작용을 감지할 수 있는 Core Component 래퍼

**1. onPressIn**
:프레스가 활성화되면 호출됩니다.

**2. onPressOut**
:누르기 제스처가 비활성화되면 호출됩니다.

**3. style**
: 컴포넌트가 현재 눌려져 있는지 여부를 반영하는 부울 값을 받고 뷰 스타일을 반환하는 함수

```tsx
<Pressable
  onPress={() => console.log('onPress')}
  onPressIn={() => console.log('onPressIn')}
  onPressOut={() => console.log('onPressOut')}
  style={({pressed}) => ({
    backgroundColor: pressed ? 'blue' : 'white',
    padding: 20,
  })}>
  <Text>버튼</Text>
</Pressable>
```

| **특성**       | **Pressable** | **TouchableOpacity** | **TouchableHighlight**   | **TouchableWithoutFeedback** | **Button**      |
| -------------- | ------------- | -------------------- | ------------------------ | ---------------------------- | --------------- |
| 플랫폼 지원    | iOS/Android   | iOS/Android          | iOS/Android              | iOS/Android                  | iOS/Android     |
| 피드백 효과    | 사용자 정의   | 불투명도 감소        | 하이라이트 효과          | 없음                         | 기본 애니메이션 |
| 자식 요소 제한 | 없음          | 없음                 | 1개 (View로 감싸면 가능) | 1개 (View로 감싸면 가능)     | 없음            |
| 커스터마이징   | 매우 높음     | 중간                 | 중간                     | 중간                         | 낮음            |
| 성능           | 매우 좋음     | 좋음                 | 좋음                     | 매우 좋음                    | 일반            |

#### ActivityIndicator

- 원형 로딩 표시기를 표시

```tsx
const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    // 클린업
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {loading ? (
          <>
            <ActivityIndicator size={'large'} color={'#0000ff'} />
            <Text>로딩중...</Text>
          </>
        ) : (
          <Text>로딩완료</Text>
        )}
      </View>
    </SafeAreaView>
  );
};
```

#### Switch

- 두 가지 상태(켜짐/끄짐) 간을 전환할 수 있는 UI 토글버튼 요소

**1. value**
:현재 스위치 상태 (true/false) 필수 속성으로 상태 관리가 필요함

```tsx
<Switch value={isEnabled} />
```

**2. trackColor**
: 트랙의 색상 설정 객체 형식: {false: color, true: color}

```tsx
<Switch trackColor={{false: 'color', true: 'color'}} />
```

**3. thumbColor**
:스위치 thumb의 색상 설정 (iOS에서 설정 시 드롭 섀도가 제거됨)

```tsx
<Switch thumbColor={'color'} />
```

**4. onValueChange**
:스위치 상태가 변경될 때 호출되는 콜백 새로운 값이 매개변수로 전달됨

```tsx
<Switch onValueChange={val => setIsEnabled(val)} />
```

**예시**

```tsx
const [isEnabled, setIsEnabled] = useState(false);
return (
  <SafeAreaView style={styles.container}>
    <View
      style={[
        styles.viewContainer,
        {backgroundColor: isEnabled ? '#0000cd' : '#b22222'},
      ]}>
      <Text style={[styles.text]}>
        {isEnabled ? 'mediumblue' : 'firebrick'}
      </Text>
      <Switch
        value={isEnabled}
        onValueChange={val => setIsEnabled(val)}
        thumbColor={'#fff'}
        trackColor={{false: '#0000ff', true: '#ff0000'}}
      />
    </View>
  </SafeAreaView>
);
```

#### Picker

- 여러 선택지에서 하나를 사용자가 선택할 수 있도록 돕는 UI 컴포넌트
- 라이브러리이다. [@react-native-picker/picker](https://www.npmjs.com/package/@react-native-picker/picker)

```bash
npm install @react-native-picker/picker
```

**1. selectedValue**
: 현재 선택된 값 문자열 또는 정수 가능

```tsx
<Picker selectedValue={selected}>
  <Picker.Item label="Strawberry" value={'strawberry'} />
  <Picker.Item label="Lemon" value={'lemon'} />
  <Picker.Item label="Mango" value={'mango'} />
  <Picker.Item label="Banana" value={'banana'} />
</Picker>
```

**2. onValueChange**
: 항목 선택 시 호출되는 콜백 함수 매개변수: (itemValue, itemIndex)

```tsx
<Picker onValueChange={itemValue => setSelected(itemValue)}>
  <Picker.Item label="Strawberry" value={'strawberry'} />
  <Picker.Item label="Lemon" value={'lemon'} />
  <Picker.Item label="Mango" value={'mango'} />
  <Picker.Item label="Banana" value={'banana'} />
</Picker>
```

**3. style**
: Picker의 스타일 설정 View 스타일 프로퍼티 지원

**4. enabled**
: Picker 활성화/비활성화 기본값: true

```tsx
<Picker enabled={false}>
  <Picker.Item label="Strawberry" value={'strawberry'} />
  <Picker.Item label="Lemon" value={'lemon'} />
  <Picker.Item label="Mango" value={'mango'} />
  <Picker.Item label="Banana" value={'banana'} />
</Picker>
```

**5. mode (Android 전용)**
: 'dialog': 모달 대화상자로 표시 (기본값) 'dropdown': 드롭다운 형태로 표시

```tsx
<Picker mode="dialog">
  <Picker.Item label="Strawberry" value={'strawberry'} />
  <Picker.Item label="Lemon" value={'lemon'} />
  <Picker.Item label="Mango" value={'mango'} />
  <Picker.Item label="Banana" value={'banana'} />
</Picker>
```

```tsx
// 초기 선택 된 목록 관련 state
const [selected, setSelected] = useState<string>('lemon');
return (
  <SafeAreaView style={styles.container}>
    <View>
      <Text>Choose your fruit</Text>
      <View>
        <Picker
          selectedValue={selected}
          onValueChange={itemValue => setSelected(itemValue)}>
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
```
