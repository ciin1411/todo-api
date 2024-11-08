import express from "express";
import tasks from "./data/mock.js";

// app 변수를 통해 라우터 생성 가능해짐
const app = express();

/**
 * 서버에 get /hello 리퀘스트가 들어오면 (req, res) => {} callback 함수를 실행
 * 함수 내용이 비교적 간단한 경우에는 arrow function을 사용
 * (req, res) => {} : 리퀘스트 핸들러라고도 부름
 * 첫 번째 파라미터(req)는 들어온 request 객체
 * 두 번째 파라미터(res)는 돌려줄 response 객체
 */
// app.get("/tasks", (req, res) => {
//   res.send(tasks);
// });
/**
 * res.send로 전달하는 mnock.js 배열은 자바스크립트 객체로 이루어진 배열이고 response로 돌아오는 데이터는 json문자열임
 * res.send 메소드는 argument로 자바스크립트 객체를 받으면 그걸 json으로 변환해서 돌려줌
 * 그리고 response body의 내용을 보낼때는 내용이 어떤타입인지 말해주는 Constent-Type Header를 설정해주는게 좋음
 * res.send에 전달되는 argument종류에 따라 자동으로 설정됨
 */

app.get("/tasks", (req, res) => {
  /**
   * 쿼리 파라미터
   * - sort: 'oldest'인 경우 오래된 태스크 기준, 나머지 경우 새로운 태스크 기준
   * - count: 태스크 개수
   */
  const sort = req.query.sort;
  const count = Number(req.query.count);
  // 파라미터 값은 모두 문자열로 전달되기 때문에 Count는 Number로 변환

  const compareFn =
    sort === "oldest"
      ? (a, b) => a.createdAt - b.createdAt
      : (a, b) => b.createdAt - a.createdAt;
  // sort가 oldest라면 task의 createdAt기준으로 오름차순 정렬하고
  // 나머지경우 createdAt 기준으로 내림차순 정렬한다

  // 정렬
  let newTasks = tasks.sort(compareFn);

  if (count) {
    newTasks = newTasks.slice(0, count);
  }
  res.send(newTasks);
});
app.listen(3000, () => console.log("Server Started"));
