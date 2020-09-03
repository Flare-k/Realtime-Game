import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views")); // 메소드명처럼 인자로 받은 경로들을 하나로 합쳐서 문자열 형태로 path를 리턴한다.
// views(첫 인자)는 디렉토리 네임과 views 폴더(join에 들어가는 인자들)를 합친 경로를 의미한다.

app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
// http://localhost:4000/index.js 주소로 가면 static 파일을 볼 수 있다.
app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`✅ Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);
/* 
 socketIO가 express 서버 위에 올라가도록 한다.
 같은 PORT에서 작업하는데 그 이유는 traffic이 다르기 때문이다.
 원래 같은 포트에서 2개의 서버를 동시에 동작하게 할 수 없다.
 2개의 HTTP 서버가 같은 포트에 있다면 동작하지 않을 것이다. 하지만 WS와 HTTP는 같은 서버에서 존재할 수 있다.
 express 서버를 server 변수에 담고 socketIO에게 이 서버를 잡고 있으라고 명령한다.
 */
const io = socketIO.listen(server); // http://localhost:4000/socket.io/socket.io.js로 접근 가능하다.

io.on("connection", () => console.log("Somebody Connected"));

/*
 왜 굳이 io 변수를 만들까?
 서버를 만들어서 socketIO에 전달하기 위해 server 변수를 만들었다.
 > io는 모든 이벤트를 알아야 한다.
   HTTP는 GET, POST, PUT .. 등이 있는데 이것들은 라우터를 가지고 있다.
   하지만 socket은 페이지가 없고 연결만 존재한다. 이벤트를 가지고 있는 것이다.
   서버는 이벤트를 보낼 수 있고, 클라이언트(유저) 또한 이벤트를 보낼 수 있다.
   그리고 둘다 이벤트를 받을 수 있다.
   이벤트에서 가장 중요한 것은 connection 이다.
   백엔드 뿐만아니라 프론트엔드에도 연결해야 한다. -> views/home.pug script(scr="/socket.io/socket.io.js")
*/
