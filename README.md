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
 * ```CODE.md``` - 반환 메시지
 * ```그 외 .md``` - api 설명

* server
  * ```api.local.js``` - local에서 실행하기 위해 설정한 실행파일
  * ```app.js``` - server 실행 파일
  * ```lambda.js``` - lambda에서 실행하기 위해 설정한 실행파일
  * commons
    - 자주 사용하는 기능들을 함수화하여 사용
    * ```constant.js``` - client로 전달 할 코드 설정
    * ```db.js``` - mysql 및 query
    * ```fcm.js``` - fcm 
    * ```jwt.js``` - jwt 설정 
    * ```logger.js``` - log
    * ```mailer.js``` - smtp
    * ```notify.js``` - fcm 출력문
    * ```out.js``` - client로 전달 할 json type data
    * ```util.js``` - parameter 유효성 체크

   * routes
     * ```index.js``` - 버전관리
     * v1
       * admin

