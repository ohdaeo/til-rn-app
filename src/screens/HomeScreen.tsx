import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import {
  createTodos,
  deleteTodos,
  getTodos,
  TodosRow,
  updateTodos,
} from '../api/todos-api';
import {TextInput} from 'react-native-gesture-handler';

const HomeScreen = ({navigation}: {navigation: any}): JSX.Element => {
  //전체목록 state
  const [todos, setTodos] = useState<TodosRow[]>([]);

  // 수정 관련 state
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // 새글 관련 state
  const [newTitle, setNewTitle] = useState('');

  // 전체목록 가져오기
  const fetchGetTodos = async () => {
    const result = await getTodos();
    if (!result) {
      console.log('호출실패');
      return;
    }
    const {data, error, status} = result;
    if (error) {
      console.log('Error', error.message);
      return;
    }
    if (data) {
      console.log('status', status);
      setTodos(data);
    }
  };

  // 목록 삭제하기
  const handleDelete = async (id: number) => {
    await deleteTodos(id);
    fetchGetTodos(); // 전체 목록 다시 갱신
  };

  // 제목 업데이트
  const handleEdit = async (id: number) => {
    if (editTitle.trim() === '') {
      Alert.alert('제목을 입력해주세요.');
      return;
    }

    const {data, error, status} = await updateTodos(id, editTitle);
    setEditId(null);
    setEditTitle('');
    Alert.alert('수정완료', '제목이 수정되었습니다.');
    fetchGetTodos();
  };

  // 목록 추가하기
  const handleAdd = async () => {
    if (newTitle.trim() === '') {
      Alert.alert('제목을 입력해주세요.');
      return;
    }
    const result = await createTodos(newTitle);
    if (!result) {
      console.log('호출실패');
      return;
    }
    Alert.alert('등록완료', '제목이 등록되었습니다.');
    const {data, error, status} = result;
    console.log(data);
    setNewTitle('');
    fetchGetTodos();
  };

  useEffect(() => {
    fetchGetTodos();
  }, []);

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
        <Button
          title={'Profile 이동'}
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      {/**추가하기 */}
      <View style={[styles.inputArea, {marginTop: 20}]}>
        <TextInput
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <Button title="추가" color={'#006eff'} onPress={() => handleAdd()} />
      </View>

      <ScrollView>
        <View>
          {todos.map(item => (
            <View key={item.id} style={styles.todoCard}>
              {editId === item.id ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={editTitle}
                    onChangeText={setEditTitle}
                  />
                  <View style={styles.todoButtons}>
                    <Button
                      title="저장"
                      color={'#006eff'}
                      onPress={() => handleEdit(item.id)}
                    />
                    <Button
                      title="취소"
                      color={'#dbdbdb'}
                      onPress={() => {
                        setEditId(null);
                        setEditTitle('');
                      }}
                    />
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.todoTitle}>
                    {item.title ? item.title : 'NoTitle'}
                  </Text>
                  <View style={styles.todoButtons}>
                    <Button
                      title="수정"
                      color={'#4caf50'}
                      onPress={() => {
                        setEditId(item.id);
                        setEditTitle(item.title || '');
                      }}
                    />
                    <Button
                      title="삭제"
                      color={'#f44336'}
                      onPress={() => handleDelete(item.id)}
                    />
                  </View>
                </>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoList: {
    flex: 1,
  },
  todoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default HomeScreen;
