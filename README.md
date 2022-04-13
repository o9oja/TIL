# ORM 이란 ?
자바스크립트 객체와 데이터를 1:1로 맵핑해주는 도구

# Sequelize를 쓰는 이유
자바스크립트 코드만 쓰면 시퀄라이즈가 알아서 SQL로 바꿔준다
SQL언어를 쓰지 않아도 되기 때문에 자바스크립트 문법으로만 데이터베이스를 조작할 수 있다
MYSQL이외에 Maria, MSSQL 등등 다른 데이터베이스와도 호환 된다
-> 하나의 자바스크립트 코드로 다양한 데이터베이스와 상호작용이 가능하다

## 1. 초기 설정: sequelize 및 sequelize-cli 설치
Sequelize ORM 공식 사이트를 통해 Sequelize를 설치

```jsx
$ npm install --save sequelize
```
Sequelize - Migrations 문서를 통해 sequelize-cli 를 설치 (Sequelize 사용할 수 있게 해주는 패키지)

```jsx
npm install --save-dev sequelize-cli
```
Project bootstrapping

```jsx
npx sequelize-cli init
```
init 명령어를 작성하고 나면 config, models, migrations, seeders 폴더가 자동으로 만들어진다

이제 MYSQL에 데이터베이스를 생성하고 연결하기 위해서
여기서 models > index.js 폴더와 config > config.json폴더를 살펴봐야한다

**config > config.json**

폴더를 들어가게 되면 development, test, production 의 세가지 환경으로 데이터베이스를 연결 할 수 있고
지금은 development 개발환경과 연결하기 때문에 development의 password와 database두개를 바꿔주면 된다
```jsx
{
  "development": {
    "username": "root",
    "password": "****", // mysql 비밀번호로 바꿔주자 따옴표 필수
    "database": "database_development", // 사용하고싶은 데이터베이스 이름으로 바꿔주면 된다 
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
**models > index.js**

mysql2 드라이버를 사용해 mysql 과 Sequelize를 연결해주는 코드가 적혀있다

위에서 development 개발환경과 연결한다고 했는데 이 코드에서 지정해주고 있고 변경하면 다른 개발환경으로 변경이 가능하다

const env = process.env.NODE_ENV || 'development';

```jsx
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
```


## 2. 데이터베이스, 모델생성
여기서 데이터베이스와 모델을 생성하는 두가지 방법이 존재한다

1. mysql에 접속해서 데이터베이스를 생성하고 모델을 생성해도 되고
2. 모델을 먼저 생성한뒤 데이터베이스를 바로 생성이 가능하다

### 1-1 ) mysql에 접속해서 데이터베이스를 생성하고 모델을 생성하는 방법
mysql 접속
```jsx
mysql -u root -p
```
데이터베이스 생성(위에서 사용하기로 한 데이터베이스 이름 작성)
```jsx
mysql> create database database_development;
데이터베이스 사용
```
```jsx
mysql> use database_development;
```
데이터베이스 연결 끝 -> 모델 생성 (데이터베이스의 테이블)
(얘는 mysql에서 작성하는게 아니라 그냥 터미널에서 작성해야 된다)
```jsx
npx sequelize-cli model:generate --name url --attributes url:string,title:string,visits:integer
```

### 1-2 ) 모델을 먼저 생성한뒤 데이터베이스를 바로 생성하는 방법
모델 생성
```jsx
npx sequelize-cli model:generate --name url --attributes url:string,title:string,visits:integer
```
데이터베이스 생성
```jsx
npx sequelize-cli db:create
```
db:create 명령어를 쓰면 데이터베이스 이름을 작성해주지 않아도
config.json 폴더에서 지정해준 데이터 베이스이름으로 생성이 되기 때문에 자동으로 database_development 라는 데이터베이스가 생성이 되는 것을 볼 수있다

2) Migration (db에 데이터 반영)
```jsx
npx sequelize-cli db:migrate
```


마이그레이션 전에 database_development로 들어가게 되면 아무런 데이터가 없다 마이그레이션으로 만들어준 모델의 데이터를 db로 저장시켜 줘야 한다 , 그리고 만든 모델을 업데이트 할 때도 db에 적용이 되어야 하기 때문에 그때도 Migration을 해줘야 한다

마이그레이션을 하면 async up 에 정의된 코드가 실행되고
만약 모델을 잘 못 짜서 다시 만들어야 한다고 하면 undo를 해서 async down가 실행되어서 테이블을 지우면 된다

2-1) undo

만약 visits 필드에 기본값을 추가하기 전에 마이그레이션을 했다면 모델을 변경할때는 다시 undo를 한 다음에 수정 -> 다시 마이그레이션을 해야한다
이때 20220218...-crate-url.js 이 파일을 삭제하고 다시 마이그레이션 하게 된다면 마이그레이션을 할 때도 깃처럼 로그가 다 남기 때문에 에러가 난다 꼭 undo를 해줘야 한다

```jsx
npx sequelize-cli db:migrate:undo
```
model > url.js에서 기본값을 추가한 다음에 다시
```jsx
npx sequelize-cli db:migrate  
```
20220218...-crate-url.js 파일에도 defaultValue: 0 값을 추가


