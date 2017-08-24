var ws = require("nodejs-websocket");

const PORT = 3000;

var clientCount = 0; // 统计有多少个客户端打开，即多个用户状态

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection");
    clientCount++;
    conn.nickname = 'user' + clientCount;
    broadCast(conn.nickname + ' comes in.');
    conn.on("text", function (str) {
        console.log("Received "+str)
        broadCast(str);
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        broadCast(conn.nickname + ' left.');
    })
    conn.on("error", function (err) {
        console.log("handle error : ", err)
    })
}).listen(PORT)

console.log("websocket server running on port " + PORT);

function broadCast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str);
    })
}