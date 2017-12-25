import { postMessage } from './common/request';
import * as posthtml from 'posthtml'
import { encryptCode } from './common/encrypt';
import * as fs from 'fs'


var contentText = fs.readFileSync('D:\\project\\v3Usb\\foreground\\myjs.js','utf-8');

encryptCode(contentText);