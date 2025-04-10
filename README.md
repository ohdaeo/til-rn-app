<div>
<img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1744245680/noticon/j9b0ylhmgtemcdba0poe.png"/>
<img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1720579881/noticon/lxhyu7xo7ujsxvuxmiuc.png"/>
</div>

# React Native + SupaBase

- supabase 기존 테이블 사용(`todos`)

## 타입스크립트를 위한 `타입 참조`

- 이전 프로젝트에서 `package.json` 에 내용으로 `생성한 파일을 복사`해서 사용

```json
"scripts": {
"generate-types": "npx supabase gen types typescript --project-id 프로젝트아이디 --schema public >  src/types/types_db.ts"
}
```

- src\types\types_db.ts

```bash
npm run generate-types
```

**주의사항**

> 터미널 내용이 터미널이 아닌 파일에 나온다 ! 왜
> Supabase CLI가 터미널 대신 파일로 출력을 보내고 있는 것으로 Supabase CLI 버전 1.8.1 이상에서 발생하는 알려진 문제이다

```bash
npm i supabase@">=1.8.1" --save-dev
npx supabase login
npx supabase init
npx supabase gen types typescript --project-id 프로젝트아이디 --schema public > src/types/types_db.ts
```

> 해보기 일단 난 돰.

```bash
npm install @supabase/supabase-js@2.39.5
npm install react-native-url-polyfill
```

## .env

1. 기존 프로젝트에서는 이미 env 가 셋팅되어 있음.

예)

npx create-next-app@latest //프로젝트 생성(Next)

```env
NEXT_PUBLIC_SUPABASE_URL = 문자열;

```

```ts
process.env.NEXT_PUBLIC_SUPABASE_URL;
```

````bash
npm create vite@latest //프로젝트 생성(React Vite)
```

```env
VITE_SUPABASE_URL=문자열
````

```ts
import.meta.env.VITE_SUPABASE_URL;
```

```bash
npx create-react-app //프로젝트 생성(React CRA)
```

```env
REACT_APP_SUPABASE_URL=문자열
```

```ts
process.env.REACT_APP_SUPABASE_URL;
```

`import.meta.env`, `process.env` <- 세팅이 되어있다는건 이부분을 의미

2. React Native 는 개발자가 직접 셋팅하여아 함.

- babel.config.js 수정 및 추가 필요
- npm 도 추가설정
- 사용법도 별도 진행

```bash
npm install react-native-config
```

- /android/app/build.gradle
- `app 경로 꼭 확인`
- 아래 문장을 추가한다.

```txt
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
```

- / 에 .env 파일을 생성

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-public-key
```

- `/src/types/react-native-config.d.ts` 파일 생성

```ts
// types/react-native-config.d.ts
declare module 'react-native-config' {
  interface Env {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
  }

  const Config: Env;
  export default Config;
}
```

## SupaBase 폴더 및 파일 생성

- src\lib\supabase\client.ts

```ts
import 'react-native-url-polyfill/auto'; // 반드시 최상단에 배치
import {createClient} from '@supabase/supabase-js';
import {Database} from '../../types/types_db';

export const supabase = createClient<Database>(
  'til-supabase 의 env에서 NEXT_PUBLIC_SUPABASE_ID 부분',
  'til-supabase 의 env 에서 NEXT_PUBLIC_SUPABASE_URL 부분',
);
```

## Supabase CRUD API 파일 생성

- src\api\todos-api.ts

```ts
import {supabase} from '../lib/supabase/client';
import {Database} from '../types/types_db';

import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

export type TodosRow = Database['public']['Tables']['todos']['Row'];
export type TodosRowInsert = Database['public']['Tables']['todos']['Insert'];
export type TodosRowUpdate = Database['public']['Tables']['todos']['Update'];

/**Read*/
export const getTodos = async () => {
  let {data, error, status} = await supabase
    .from('todos')
    .select('*')
    .order('id', {ascending: false});
  if (error) {
    console.log('error', error.message);
    return;
  }
  return {data, error, status} as {
    data: TodosRow[] | null;
    error: Error | null;
    status: number;
  };
};

/**Create*/
export const createTodos = async (title: string) => {
  const {data, error, status} = await supabase
    .from('todos')
    .insert([
      {
        title: title,
        contents: JSON.stringify([]), // 빈 배열로 초기화
        start_date: new Date().toISOString(), // 현재 날짜로 초기화
        end_date: new Date().toISOString(), // 현재 날짜로 초기화
        user_id: uuid(), // 로그인 사용자 정보
        user_email: '', // 로그인 사용자 정보
      },
    ])
    .select()
    .single();

  return {data, error, status};
};

/**Update*/
export const updateTodos = async (id: number, title: string) => {
  const {data, error, status} = await supabase
    .from('todos')
    .update({
      title: title,
    })

    .eq('id', id)
    .select()
    .single();
  return {data, error, status} as {
    data: TodosRow | null;
    error: Error | null;
    status: number;
  };
};

/**Delete*/
export const deleteTodos = async (id: number) => {
  const {data, error} = await supabase.from('todos').delete().eq('id', id);
  if (error) {
    console.log('error', error.message);
    return error;
  }
  return {data, error};
};
```

- src\screens\HomeScreen.tsx

```tsx
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
```
