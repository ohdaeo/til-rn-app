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
