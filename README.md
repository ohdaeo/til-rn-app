# React Native

### 1. 프로젝트 생성

**버전을 꼭 맞춰줘야 한다**

```bash
npx react-native@0.72.6 init 폴더명 --version 0.72.6
```

**오류 발생시**

```bash
npx react-native@0.72.6 init 폴더명 --version 0.72.6 --npm
```

### 2. 안드로이드 스튜디오

Android Studio -> Deice Manager -> Android Virtual Machine 실행

### 3. 시작하기

```bash
npm start

a //run on Android

npm install --save-dev typescript @types/react @types/react-native @babel/preset-typescript //타입스크립트 설정

npm install --save-dev @tsconfig/react-native //tsconfig.json
```

1. config 설정하기

- tsconfig.json

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "types": ["react-native"],
    "lib": ["es2019"],
    "allowJs": true,
    "jsx": "react-native",
    "noEmit": true,
    "isolatedModules": true,
    "strict": true,
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

2. .eslintrc.js 설정하기

```js
module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
```

3. App.tsx 시작하기

```tsx
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
```
