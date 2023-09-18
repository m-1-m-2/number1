export default class Socket {
  io = null;
  // id = null;
  client_id = null;
  url = '';
  option = {
    query: {},
    binaryType: 'blob',
    heartbeat: false,
    heartbeatDelay: 10000,
    heartbeatText: 'heartbeat',
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 3000,
    reconnectionTimeOut: 5000,
  };
  heartbeatTimer = null;
  reconnectionTimer = null;

  constructor(url, option) {
    this.url = url || '';
    if ('undefined' !== typeof option) {
      Object.keys(option).forEach((i) => {
        if (option[i]) this.option[i] = option[i];
      });
    }
    this.parseURL();
  }

  parseURL () {
    const location = window.location;
    if ('' === this.url) this.url = location.protocol + '//' + location.host;
    if ('string' === typeof this.url) {
      if ('/' === this.url.charAt(0)) {
        if ('/' === this.url.charAt(1)) {
          this.url = location.protocol + this.url;
        } else {
          this.url = location.host + this.url;
        }
      }
      if (!/^(https?|wss?):\/\//.test(this.url)) {
        if ('undefined' !== typeof location) {
          this.url = location.protocol + '//' + this.url;
        } else {
          this.url = 'https://' + this.url;
        }
      }
    }
    if (/^(https?):\/\//.test(this.url)) {
      this.url = this.url.replace(/http/, 'ws');
    }
    if (Object.keys(this.option.query).length > 0) {
      this.url += `?${JOSN.stringify(this.option.query)}`;
    }
  }

  conn () {
    this.io = new WebSocket(this.url);
    this.io.binaryType = this.option.binaryType;
    // this.id = uuid(32);

    // 绑定默认事件
    if (this.option.heartbeat) {
      this.openHeartbeat();
    }
  }

  // 断开连接
  close () {
    if (2 > this.io.readyState) {
      this.io.close(1000);
    }
  }

  // 发送消息
  send (text) {
    if (this.io.readyState === 1) {
      this.io.send(text);
    }
  }

  // websocket 成功
  onopen (func) {
    this.io.onopen = (event) => (func ? func(event) : false);
  }

  // 接收消息
  onmessage (func, all = false) {
    this.io.onmessage = (data) => {
      func(!all ? this.parse_msg(data.data) : data);
    };
  }

  // websocket 关闭
  onclose (func) {
    this.io.onclose = (event) => {
      this.resetTimer();
      this.reconnection(event);
      func ? func(event) : false;
    };
  }

  // websocket 发生错误
  onerror (func) {
    this.io.onerror = (event) => (func ? func(event) : false);
  }

  // 开启心跳检测
  openHeartbeat () {
    this.heartbeatTimer = setInterval(() => {
      this.send(this.option.heartbeatText);
    }, this.option.heartbeatDelay);
  }

  // 自动重连
  reconnection (event) {
    if (!this.option.reconnection) return;
    this.reconnectionTimer = setInterval(() => {
      if (this.option.reconnectionAttempts <= 0 || this.io.readyState < 2) {
        clearInterval(this.reconnectionTimer);
        return;
      } else {
        this.option.reconnectionAttempts--;
      }
      this.conn();
    }, this.option.reconnectionDelay);
  }

  resetTimer () {
    clearInterval(this.heartbeatTimer);
    clearInterval(this.reconnectionTimer);
  }

  parse_msg (message) {
    // 解析信息
    let parse = (message) => {
      switch (typeof message) {
        case 'string':
          return JSON.parse(message);
        case 'object':
          if (message instanceof Blob) {
            return parseBlob(message);
          }
          return changeDataKeys(message);
        default:
          return message;
      }
    }

    // 解析blob数据
    let parseBlob = (data) => {
      let reader = new FileReader();
      reader.readAsArrayBuffer(data);
      reader.onload = function () {
        return changeDataKeys(reader.result);
      };
    }

    let changeDataKeys = (data) => {
      if (data instanceof Array) {
        const arr = [];
        data.forEach((i) => arr.push(changeDataKeys(i)));
        return arr;
      }
      if (data instanceof Object) {
        return Object.keys(data).reduce((newData, key) => {
          newData[key] = changeDataKeys(data[key]);
          return newData;
        }, {});
      }
      return data;
    }
    return parse(message)
  }
}