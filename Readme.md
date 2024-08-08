## 오믈렛 테스트 파일 생성기입니다.

node 16버전 이상 필요


### 이용 방법
- env 파일에 database URl을 설정하셔야합니다.
- 데이터베이스는 postgresql을 사용하였습니다.
- postgresql 도커 이미지를 첨부해드립니다.
- postgresql에 들어갈 데이터 또한 .sql 파일로 첨부해드립니다.
- postgresql 도커 이미지를 아래 명령어로 실행시킨 후, 접속하셔서 .sql 파일에 있는 쿼리들을 복사하셔서 실행하시면 테이블 생성 및 데이터가 생성되게 됩니다.
- docker-compose up -d


### 이용 방법
index.ts에 보면 sido_name, keyword, category_code가 있습니다. 여기에 원하는 sido_name을 넣고, keyword를 입력한 후, kakaoAPI.interface.ts 파일에 있는 category_group_code를 보고 필요한 걸 넣으시면 됩니다.

### 작동
- sido_name을 보고, kakao api에 요청해서 결과를 가져옵니다.
- sido_name에 있는 도로명 주소를 들고와서, 각 도로별로 keyword와 category_code에 맞는 가게를 들고오는 식입니다.
- kakao api가 무료에서는 45개 밖에 결과를 제공하지 않는데,검색 결과가 검색하는 도로 안에 없을 수도 있고해서, 웬만하면 45개 안에 다 나오지 않을까 생각 중입니다.
- 포함되지 항목들은 kakao api가 45개 제한이 있어서 어쩔 수 없는 부분인거고, 도로를 따라 검색을 하는 식이다보니 중복된 것도 있을 수 있습니다.

### 결과물

- 결과물은 keyword_sido_sigungu.csv로 정리됩니다.
- 도로명주소, 지번, 좌표, 가게 이름 등의 정보가 포함됩니다.

### 실행
```shell
npm install
ts-node index.ts
```
