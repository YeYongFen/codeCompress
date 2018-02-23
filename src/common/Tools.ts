import { encryptCode  } from './encrypt';
import * as fs from 'fs'
import * as path from 'path'
import * as posthtml from 'posthtml'
import * as parser from 'posthtml-parser'
import * as render from 'posthtml-render'
let walk = require('posthtml/lib/api').walk
let match = require('posthtml/lib/api').match


export{encryptCode,posthtml,parser,render,walk,match}




export function copyFile(IN:string , OUT:string){

    var rs = fs.createReadStream(IN);
    var ws = fs.createWriteStream(OUT);
    rs.pipe(ws);
    


}

export function writeFile(text:string , OUT:string){

    //fs.writeFileSync(OUT,text);
    fs.writeFile(OUT,text,()=>{
       // console.log(process.uptime())
    })

}

export function write(text:string , OUT:string):boolean{
    try{
        
        fs.writeFileSync(OUT,text);
        return true;
    }catch(e){
        return false;
    }

}



export function read( IN:string):string{
    try{
        let Txt = fs.readFileSync(IN,"utf-8");
        return Txt;
    }catch(e){
        return "";
    }

}


export function checkFileName( name:string ):boolean{
    return !new RegExp("[\\u4e00-\\u9fa5]").test(name);
}



export function entries (obj) {
    let arr = [];
    for (let key of Object.keys(obj)) {
      arr.push([key, obj[key]]);
    }
    return arr;
}