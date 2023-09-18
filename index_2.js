const fs = require('fs');
const readline = require('readline');
const args = process.argv.slice(2);
const translate = require('google-translate-cn-api');

let url = "./r.js"

const fun_a = (str) => {
  return new Promise((resolve, reject) => {
    if (hasChinese(str)) {
      translate(str, { to: args[0] }).then(res => {
        let str_a = `"${str}": "${res.text}",`;
        resolve(str_a)
      })
    } else {
      resolve(str)
    }
  })
}

async function writeFile (arr) {
  for (let i = 0; i < arr.length; i++) {
    const n = await fun_a(arr[i])
    console.log(i);
    fs.appendFileSync(`${args[0]}.js`, `${n} \r\n`);
    if (i == arr.length - 1) {
      console.log('done')
    }
  }
}

// 创建一个文件
fs.writeFile(`${args[0]}.js`, '', () => { })

function hasChinese (str) {
  return /[\u4E00-\u9FA5]+/g.test(str)
}


read_file_fn(url, (arr) => {
  // console.log(arr)
  writeFile(arr)
})

// 读取文件 
function read_file_fn (fReadName, callback) {
  let reg = /\: \"/g;
  let fRead = fs.createReadStream(fReadName);
  let objReadline = readline.createInterface({
    input: fRead
  });

  let arr = new Array();

  objReadline.on('line', (line) => {
    // console.log(line);
    if (line.match(reg)) {
      // console.log(line.match(/"(.*?)"/)[1])
      arr.push(line.match(/"(.*?)"/)[1])
    } else {
      arr.push(line)
    }
  })

  objReadline.on('close', () => {
    callback(arr);
  });
}