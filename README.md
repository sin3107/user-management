# user-management

.env.sample 참고하여 .env 작성

## Environment
* encoding = utf-8
* NodeJS@14
* express
* node
* Mysql DB 5.7
* client port 3000
* server client proxy -> /api

### Package Setup
[npm](https://www.npmjs.com/)
* npm install 
  * express
  * dotenv
  * cors
  * crypto
  * jsonwebtoken
  * mysql
  * cookie-parser
  * firebase-admin
  * formidable
  * fs-extra
  * moment
* 실행 실패 시 npm i 후 테스트 진행

### App Start
* linux server
  * ```$ npm install -g pm2```
  * ```$ pm2 start server/app.js -i 4 --name "app"```
* local
  * ```$ node server/app```
* aws lambda (**lambda에서 사용하지 말것..**)
  * ```$ npm install aws-serverless-express```
  * zip the folder and upload `server/lambda.js`
```
# init logger
# init utils
# init CONSTANT Variables
# init printer
# load db success
# load jwt success
# /api route set success
```

## Directory
* docs
 - api 사용 설명을 위한 폴더
 * ```CODE.md``` : 반환 메시지
 * ```그 외 .md``` : api 설명

* server
  * ```api.local.js``` - local에서 실행하기 위해 설정한 실행파일
  * ```app.js``` - server 실행 파일
  * ```lambda.js``` - lambda에서 실행하기 위해 설정한 실행파일

  * commons

  * routes

