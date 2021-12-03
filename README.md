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
  * npm install -g pm2
  * pm2 start server/app.js -i 4 --name "app"
* local
  * node server/app
* aws lambda **이 방법 사용하지 말것..**
  * npm install aws-serverless-express 
  * zip the folder and upload `lambda.js`
```
# init logger
# init utils
# init CONSTANT Variables
# init printer
# load db success
# load jwt success
# /api route set success
```


