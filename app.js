import express from "express";

// app 변수를 통해 라우터 생성 가능해짐
const app = express();

/**
 * 서버에 get /hello 리퀘스트가 들어오면 (req, res) => {} callback 함수를 실행
 * 함수 내용이 비교적 간단한 경우에는 arrow function을 사용
 * (req, res) => {} : 리퀘스트 핸들러라고도 부름
 * 첫 번째 파라미터(req)는 들어온 request 객체
 * 두 번째 파라미터(res)는 돌려줄 response 객체
 */
app.get("/hello", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(3000, () => console.log("Server Started"));
