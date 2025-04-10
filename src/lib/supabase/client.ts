import 'react-native-url-polyfill/auto'; // 반드시 최상단에 배치
import {createClient} from '@supabase/supabase-js';
import {Database} from '../../types/types_db';

export const supabase = createClient<Database>(
  'https://zhjtibjejrywuxogpfzl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoanRpYmplanJ5d3V4b2dwZnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NjkxOTksImV4cCI6MjA1ODQ0NTE5OX0.yU0GI6_ufXIwiNyH2QUNaNSodoPcrUV9hcTGXcrSLHI',
);
