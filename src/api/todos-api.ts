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
