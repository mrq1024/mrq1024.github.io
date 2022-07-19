---
editLink: false
---

WebSocket 是`HTML5`开始提供的一种在单个`TCP`连接上进行全双工通讯的协议。位于OSI模型的应用层  

WebSocket与`http`和`https`使用相同的端口：80;若运行在`tls`上的时候使用443端口  

WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

创建websocket对象--构造函数语法;  
```javascript
let Socket = new WebSocket(url,[protocol]);  //返回Websocket对象
//url:要连接的地址
```

### 属性
- `readyState`:当前的链接状态。  
    - 0:`WebSocket.CONNECTING`表示正在链接中   
    - 1`WebSocket.OPEN`表示已经链接并且可以通讯  
    - 2`WebSocket.CLOSING`表示连接正在关闭  
    - 3`WebSocket.CLOSED`表示连接已关闭或者没有链接成功

- `binaryTYpe`:使用二进制的数据类型连接,返回websocket连接所传输二进制数据的类型  
    - `blob`:如果传输的是 Blob 类型的数据。  
    - `arraybuffer`:如果传输的是 ArrayBuffer 类型的数据。

- `bufferedAmount`:未发送至服务器的字节数。如果为0,则说明所有的信息上已经发送到服务器
- `onclose`:用于指定连接关闭后的回调函数。
- `onerror`:用于指定连接失败后的回调函数。
- `onmessage`:用于指定当从服务器接受到信息时的回调函数。
- `onopen`:用于指定连接成功后的回调函数。
- `protocol`:服务器选择的下属协议。
- `url`:WebSocket 的绝对路径。

### 方法
- `close([code,[reason]])`方法关闭`WebSocket`连接或连接尝试(如果有的话)
    - `code`:一个数字状态码，它解释了连接关闭的原因。如果没有传这个参数，默认使用1005。
    - `reason`:一个人类可读的字符串，它解释了连接关闭的原因。这个UTF-8编码的字符串不能超过123个字节。
    - 报出的异常
        - `INVALID_ACCESS_ERR`:无效的`code`
        - `SYNTAX_ERR`:`reason`字符串太长(超过123字节)

- `send(data)`:对要传输的数据进行排队。
    - `data`:用于传输至服务器的数据。它必须是以下类型之一：
        - `USVString`:文本字符串。字符串将以 UTF-8 格式添加到缓冲区，并且 bufferedAmount 将加上该字符串以 UTF-8 格式编码时的字节数的值。
        - `ArrayBuffer`:可以使用一有类型的数组对象发送底层二进制数据；其二进制数据内存将被缓存于缓冲区，bufferedAmount 将加上所需字节数的值。
        - `Blob`:Blob 类型将队列 blob 中的原始数据以二进制中传输。 bufferedAmount 将加上原始数据的字节数的值。
        - `ArrayBufferView`:您可以以二进制帧的形式发送任何 JavaScript 类数组对象 ；其二进制数据内容将被队列于缓冲区中。值 bufferedAmount 将加上必要字节数的值。
    - 异常
        - `INVALID_STATE_ERR`:当前连接未处于 OPEN 状态。
        - `SYNTAX_ERR`:数据是一个包含未配对代理(unpaired surrogates)的字符串。

### 事件
使用`addEventListener()`或将一个事件监听器赋值给本接口的`oneventname`属性，来监听下面的事件。
- `close`:当一个 WebSocket 连接被关闭时触发。也可以通过`onclose`属性来设置。
- `error`:当一个 WebSocket 连接因错误而关闭时触发，例如无法发送数据时。也可以通过`onerror`属性来设置.
- `message`:当通过 WebSocket 收到数据时触发。也可以通过 onmessage 属性来设置。
- `open`:当一个 WebSocket 连接成功时触发。也可以通过 onopen 属性来设置。


### 示例
```javascript
// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});
```