# React Native

## Component 예제

### 기본예제

- src\screens\ProfileScreen.tsx

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>ProfileScreen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 전체 너비 차지하기
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ProfileScreen;
```

- src\navigations\ScreenStackNavigator.tsx

```tsx
<stack.Screen name="Profile" component={ProfileScreen} /> // 추가
```

### 응용예제

- src\screens\ProfileScreen.tsx

```tsx
import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function ProfileScreen() {
  const [name, setName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [submittes, setSubmittes] = useState(false);

  const handlePress = () => {
    if (name.trim() === '' || introduce.trim() === '') {
      return Alert.alert('이름과 자기소개를 입력하세요', '', [{text: '확인'}]);
    }
    setSubmittes(true);
    Alert.alert('수정이 완료되었습니다', '', [{text: '확인'}]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, {width: '100%'}]}>
        <Image
          source={{uri: 'https://picsum.photos/200'}}
          style={styles.image}
        />
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="이름을 입력하세요"
        />
        <TextInput
          style={styles.input}
          value={introduce}
          onChangeText={setIntroduce}
          multiline
          placeholder="자기소개를 입력하세요"
        />
        <Button title="나의 프로필" onPress={handlePress} />

        {submittes && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{name}</Text>
            <Text style={styles.resultText}>{introduce}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 전체 너비 차지하기
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  resultBox: {
    marginTop: 30,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
  },
});

export default ProfileScreen;
```

### 심화예제

- src\screens\ProfileScreen.tsx

```tsx
import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Task = {
  id: string;
  title: string;
  done: boolean;
};

export default function ProfileScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    {id: '1', title: 'Good morning', done: true},
    {id: '2', title: 'Good afternoon', done: false},
    {id: '3', title: 'Good night', done: false},
  ]);

  // 할일 목록 중 state의 done을 true로 바꾸는 함수
  const toggleSwitch = (id: string) => {
    setTasks(prev =>
      prev.map(item => (item.id === id ? {...item, done: !item.done} : item)),
    );
  };

  const renderItem = ({item}: {item: Task}) => (
    <View style={styles.itemRow}>
      <Text style={[styles.itemText, item.done && styles.checkedText]}>
        {item.done ? '✅' : '❌'} {item.title}
      </Text>
      <Switch
        value={item.done}
        onValueChange={() => {
          toggleSwitch(item.id);
        }}
        thumbColor={item.done ? 'orange' : 'gray'}
        trackColor={{false: '#ccc', true: 'green'}}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={styles.title}>할일 체크리스트</Text>
        {/* 목록출력 */}
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('오늘도 화이팅하세요. ^^')}>
          <Text style={styles.buttonText}>메시지 보내기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  viewContainer: {
    flex: 1,
    width: '100%',
    padding: 30,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  separator: {
    height: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
```
