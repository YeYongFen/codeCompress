import { postMessage } from './common/request';
import * as posthtml from 'posthtml'
import { encryptCode } from './common/encrypt';
import * as fs from 'fs'
import { doFile } from './common/ffs';
import {Taskqueue}  from './common/Taskqueue';

var contentText = fs.readFileSync('D:\\project\\v3Usb\\foreground\\myjs.js','utf-8');

// encryptCode(contentText).then((n)=>{
//     console.log(n)
// });

//let url = "D:\\project\\v3Usb\\background\\background.html"
//let aa = mixScript(url);
//console.log(aa)

let tt = new Taskqueue()

doFile()