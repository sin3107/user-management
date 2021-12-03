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
```
* docs 
 - api 사용 설명을 위한 폴더
   * CODE.md - 반환 메시지
   * 그 외 .md - api 설명

* server
  * api.local.js - local에서 실행하기 위해 설정한 실행파일
  * app.js - server 실행 파일
  * lambda.js - lambda에서 실행하기 위해 설정한 실행파일
  
  1. commons - 자주 사용하는 기능들을 함수화해 놓은 폴더
    * constant.js - client로 전달 할 코드 설정
    * db.js - mysql 및 query
    * fcm.js - fcm 
    * jwt.js - jwt 설정 
    * logger.js - log
    * mailer.js - smtp
    * notify.js - fcm 출력문
    * out.js - client로 전달 할 json type data
    * util.js - parameter 유효성 체크

  2. ```routes``` - api 작성 폴더
    * index.js
    
    2.1. v1
    
      2.1.1. admin
          * answer.js - 문의 관련 api
          * category.js - 카테고리 설정 및 확인 api
          * comments.js - 댓글 관리 api
          * graph.js - 회원가입 통계 api
          * message.js - 관리자 메시지 api
          * notice.js - 공지 api
          * posts.js - 게시물 관리 api
          * push.js - 푸시 메시지 api
          * record.js - 관리자 계정 api 사용 기록 확인 api
          * reports.js - 신고 확인 및 정지 api
          * users.js - 유저 정보 확인
          
      2.1.2. file
          * uploader.js - aws s3 upload
          * viewer.js - aws s3 view
          
      * index.js - 각 api 호출 및 토큰값 특정위치 체크
      * auth.js - 회원가입, 탈퇴, id찾기 등 계정관련 api
      * auth_check.js - index.js에서 로그인 후 사용할 수 있는 기능에 대하여 token 확인
      * category.js - 게시판 카테고리 설정 api
      * comments.js - 게시물에 대한 댓글 api
      * message.js - 사용자 메시지 api
      * notice.js - 공지사항 api
      * notification.js - 사용자 알림 api
      * posts.js - 게시물 CRUD api
      * profiles.js - 프로필 정보 확인 및 수정 api
      * question.js - 문의 api
      * reports.js - 신고 api
      * search.js - 닉네임 혹은 태그로 게시물 검색 api
      * users.js - 유저 정보 확인 및 수정 api
      
```
