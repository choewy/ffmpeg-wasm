# Heroku Express & React

- Hearoku를 사용한 Express & React 배포 자동화

## client

```
$ npx create-react-app --template typescript .
```

## server

```
$ npm init
$ npm install -D typescript
$ tsc --init
```

### tsconfig
```
"moduleResolution": "node"
```

## 배포 자동화

```
Client: React.js
    1) cd client
    2) npm ci
    3) npm run build
    4) client/build -> server/bulid
```
```
Server: Node.js
    1) cd server
    2) npm ci
    3) tsc
    4) node main.j
```