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

### package setup
* npm i

### app start
* linux server
  * npm install -g pm2
  * pm2 start server/app.js -i 4 --name "app"
* local
  * node server/app
* aws lambda
  * zip the folder and upload: lambda.js 
```
# init logger
# init utils
# init CONSTANT Variables
# init printer
# load db success
# load jwt success
# /api route set success
```


