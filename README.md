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

### 심화예제 (Todo List)

- src\screens\ProfileScreen.tsx

```tsx
import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  // 할 일 목록을 관리하기 위한 상태
  const [task, setTask] = useState('');
  // 할 일 목록을 저장하기 위한 상태
  const [taskList, setTaskList] = useState<string[]>([]);
  // 할 일 추가 함수
  const haneleAddTask = () => {
    if (task.trim() === '') {
      Alert.alert('할 일을 입력하세요');
      return;
    }
    setTaskList(prev => [...taskList, task]);
    setTask('');
  };

  // KeyboardAvoidingView : 키보드가 올라올 때 화면을 밀어주는 컴포넌트
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={[styles.container, styles.view]}>
          <Text style={styles.title}>📑 오늘 할일</Text>
          {/* 할 일 입력 */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={task}
              onChangeText={setTask}
              placeholder="할 일을 입력해주세요"
            />
            <TouchableOpacity style={styles.addButton} onPress={haneleAddTask}>
              <Text style={styles.addButtonText}>추가</Text>
            </TouchableOpacity>
          </View>
          {/* 할 일 목록 */}
          <ScrollView style={styles.list}>
            {taskList.map((item, index) => (
              <Text key={index} style={styles.taskItem}>
                ◾ {item}
              </Text>
            ))}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  view: {
    width: '100%',
    padding: 24,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    marginLeft: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  taskItem: {fontSize: 16, marginBottom: 12},
});
```

### 응용예제 (팝업창 만들기)

- src\screens\ProfileScreen.tsx

```tsx
import React, {useState} from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  // 모달 상태 관리
  const [modalVisible, setModalVisible] = useState(false);

  // 모달 확인 버튼 클릭 시 동작
  const handleConfirm = () => {
    setModalVisible(!modalVisible);
    Alert.alert('안내보기 확인', '안내를 확인했습니다.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, styles.view]}>
        <TouchableOpacity
          style={styles.openButton}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.openButtonText}>👨‍✈️ 안내보기</Text>
        </TouchableOpacity>
        <Modal transparent visible={modalVisible}>
          <View style={styles.modalBg}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>⛔ 개인정보 안내</Text>
              <Text style={styles.modalContent}>
                이 앱은 사용자 정보를 저장하지 않습니다.
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.modalButton, {backgroundColor: '#ff0000'}]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={{color: '#fff'}}>닫기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, {backgroundColor: '#3eec8c'}]}
                  onPress={handleConfirm}>
                  <Text style={{color: '#fff'}}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  view: {
    width: '100%',
    backgroundColor: 'white',
  },
  openButton: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 10,
  },
  openButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalContent: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
});
```

### 응용예제 (FlatList)

- src\screens\ProfileScreen.tsx

```tsx
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
//현재 화면의 가로너비를 가져오기
const {width} = Dimensions.get('window');

// 외부에서 데이터를 가져옮
const datas = [
  {id: '1', uri: 'https://i.pravatar.cc/400'},
  {id: '2', uri: 'https://i.pravatar.cc/400'},
  {id: '3', uri: 'https://i.pravatar.cc/400'},
];
export default function ProfileScreen() {
  // 현재 인덱스를 상태로 관리
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null); // FlatList의 참조를 저장하기 위한 ref

  // FlatList의 각 아이템을 렌더링하는 함수
  const renderItem = ({item}: {item: {id: string; uri: string}}) => (
    <Image source={{uri: item.uri}} style={styles.image} />
  );

  // 스크롤 이벤트를 처리하는 함수
  const handleScroll = (event: any) => {
    // 슬라이드의 현재 인덱스를 계산
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={(styles.container, {width: '100%'})}>
        <FlatList
          ref={flatListRef} // FlatList의 참조를 설정
          data={datas}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal // 가로로 스크롤 가능하게
          pagingEnabled // 페이지 단위로 스크롤 가능하게
          showsHorizontalScrollIndicator={false} // 스크롤바 숨기기
          onScroll={handleScroll}
        />
        <View style={styles.indicateRow}>
          {datas.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width, // 사진은 화면 가로 크기만큼
    height: 300, // 높이는 300으로 고정
    resizeMode: 'cover', // 사진이 잘 안리게 채워요
  },
  indicateRow: {flexDirection: 'row', justifyContent: 'center', marginTop: 20},
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'hotpink',
  },
});
```

## AsyndStorage

- key-value 형식의 저장소
- 브라우저에서 사용하는 localStorage와 비슷

```bash
npm install @react-native-async-storage/async-storage
```

### 기본예제

- src\screens\ProfileScreen.tsx

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const [name, setName] = useState('');

  // AsyncStorage에 이름 저장
  const handleSaveName = async () => {
    try {
      await AsyncStorage.setItem('user_name', name);
      Alert.alert('저장완료', '이름이 저장되었습니다.');
    } catch (error) {
      console.log('Error saving name:', error);
    }
  };

  //
  const loadData = async () => {
    try {
      const result = await AsyncStorage.getItem('user_name');
      console.log('불러오기', result);
      if (result !== null) {
        setName(result);
        Alert.alert('저장된 이름', result);
      }
    } catch (error) {
      console.log('Error loading name:', error);
    }
  };

  // AsyncStorage에서 이름 읽기
  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, {width: '100%'}]}>
        <Text>간단 저장 및 읽어오기</Text>
        <TextInput
          placeholder="이름을 입력해주세요"
          value={name}
          onChangeText={setName}
        />
        <Button title="이름저장" onPress={() => handleSaveName()} />
        <Text>저장된 이름 : {name}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
```

### 응용예제

- src\screens\ProfileScreen.tsx

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Key명
const STORAGE_KEY = '@tasks2';

type Task = {
  id: string;
  title: string;
};

export default function ProfileScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const renderItem = ({item}: {item: Task}) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.title}</Text>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteText}>삭제</Text>
      </TouchableOpacity>
    </View>
  );

  // 할 일 추가 버튼 클릭 시
  const handleAdd = () => {
    if (input.trim() === '') {
      Alert.alert('입력 오류', '할 일을 입력해주세요!');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: input.trim(),
    };

    setTasks(prev => [...prev, newTask]);
    setInput('');
  };

  // 할 일 삭제 버튼 클릭 시
  const handleDelete = (id: string) => {
    Alert.alert('삭제 확인', '정말 삭제할까요?', [
      {text: '취소', style: 'cancel'},
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          setTasks(prev => prev.filter(task => task.id !== id));
        },
      },
    ]);
  };

  // 자료 불러오기
  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored === null) {
        Alert.alert('저장된 할 일이 없습니다.');
        return;
      }
      //json 문자열 이기 때문에
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        setTasks(parsed);
      } else {
        console.warn('저장된 데이터 형식이 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('Error loading tasks from AsyncStorage:', error);
    }
  };

  // 할 일 목록이 변경될 때마다 불러오기
  useEffect(() => {
    // 자료 저장하기
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        Alert.alert('저장된 할 일이 저장되었습니다.');
      } catch (error) {
        console.error('Error saving tasks to AsyncStorage:', error);
      }
    };
    saveTasks();
  }, [tasks]);

  // 첫 마운트 할 일 목록을 불러오기
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, {width: '100%'}]}>
        <Text style={styles.title}>📚 저장되는 할 일 목록</Text>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={{color: 'red'}}>할 일이 없습니다.</Text>
          }
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="할 일을 입력해주세요"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.addText}>추가</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  taskText: {
    fontSize: 16,
  },
  deleteBtn: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: '#4CAF50',
    marginLeft: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    paddingVertical: 8,
  },
});
```
