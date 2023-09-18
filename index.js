const fs = require('fs');
const path = require('path');
const readline = require('readline');
const translate = require('google-translate-cn-api');
const args = process.argv.slice(2)
// console.log(args[0])

let url = './src';

function searchStrSplit (str, target) {
  return str.split(target).length - 1
}

// 读取目录
function read_dir_fn (url) {
  let reg = /langSwitch\([^x00-xff]*\)/g;
  let item_reg = /(?=\().*?(?=\))/

  fs.readdir(url, (err, files) => {
    if (err) {
      // console.log('error')
    }
    files.forEach((item) => {
      if (item.indexOf('.') == -1) {
        let item_url = `${url}/${item}`;
        read_dir_fn(item_url)
      } else if (item.includes('.vue')) {
        let item_file = `${url}/${item}`
        read_file_fn(item_file, (arr) => {
          let json = {};

          arr.forEach((item) => {
            if (searchStrSplit(item, 'langSwitch') >= 2) {
              item.match(reg).forEach(el => {
                let char = el.match(item_reg)[0].replace(/\'|\"|\(|\)/g, '');
                // translate(char, { to: args[0] || 'en' }).then(res => {
                //   json[char] = res.text;
                // })
                json[char] = char;
              })
            } else {
              let char = item.match(item_reg)[0].replace(/\'|\"|\(|\)/g, '');
              // translate(char, { to: args[0] || 'en' }).then(res => {
              //   json[char] = res.text;
              // })
              json[char] = char;
            }
          })
          // setTimeout(() => {
          //   console.log(json)
          //   writeFile(item_file, json)
          //   console.log('done')
          // }, 300000)
          // console.log(json)
          writeFile(item_file, json)
        })
      }
    })
  })
}

// 读取文件 
function read_file_fn (fReadName, callback) {
  let reg = /langSwitch\([\s\S]*\)/g;
  let fRead = fs.createReadStream(fReadName);
  let objReadline = readline.createInterface({
    input: fRead
  });

  let arr = new Array();

  objReadline.on('line', (line) => {
    if (line.match(reg)) {
      let str = line.match(reg)[0];
      arr.push(str)
    }
  })

  objReadline.on('close', () => {
    callback(arr);
  });
}

// 写入文件
function writeFile (filename, arr) {
  let str = JSON.stringify(arr);
  // str = str.replace(/,/g, ',\r\n');
  // str = str.replace(/\}/g, '\r\n\}');
  // filename
  // console.log(filename.split('.')[1].split('/'))
  let _arr = filename.split('.')[1].split('/');
  let name = _arr[_arr.length - 1];
  if (name == 'index') {
    name = _arr[_arr.length - 2]
  }
  fs.appendFileSync(`${args[0]}.js`, `, \r\n ${name} : `)
  fs.appendFileSync(`${args[0]}.js`, `${str}`);
}

// 创建一个文件
fs.writeFile(`${args[0]}.js`, '', () => { })

read_dir_fn(url)