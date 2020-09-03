// eslint-disable-next-line no-undef
const socket = io("/");
// 이 파일에서 io를 만든다. home.pug에 index.js를 import 해야한다.

socket.on("hello", () => console.log("Somebody said hello"));
// socket.on(server에서 받은 이벤트, 응답);
socket.emit("helloGuys");
