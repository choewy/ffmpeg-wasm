# TypeScript Lecture

- TypeScript 설치

```
$ npm i --save-dev typescript
```

- nodemon, ts-node 설치

```
$ npm i --save-dev nodemon ts-node 
```

- tsconfig.json 생성

```
$ npx tsc --init 
```

- package.json 명령어 추가

```json
{
    "scripts": {
        "start:dev": "nodemon --watch \"src/**/*.ts\" --exec \"ts-node\" src/index.ts"
    },
}
```

- build

```
$ tsc
```