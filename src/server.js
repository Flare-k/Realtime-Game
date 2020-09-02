import { join } from "path";
import express from "express";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views")); // 메소드명처럼 인자로 받은 경로들을 하나로 합쳐서 문자열 형태로 path를 리턴한다.
// views(첫 인자)는 디렉토리 네임과 views 폴더(join에 들어가는 인자들)를 합친 경로를 의미한다.

app.use(express.static(join(__dirname, "static")));
// http://localhost:4000/index.js 주소로 가면 static 파일을 볼 수 있다.

app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`✅ Server running: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
