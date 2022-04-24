# TypeScript 기초 문법

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

# 의존성 주입과 역전, 제어의 역전

- [GitBook 기술블로그](https://choewy.github.io/gitbook/node.js/7)
