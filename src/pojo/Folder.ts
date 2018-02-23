
import {FileInterface} from './FileInterface'
import * as fs from 'fs'
import * as path from 'path'

export class Folder implements FileInterface{

    private from:string;
    private to:string;


    constructor(absolutePath:string){
       // this.from = from;
        this.to =absolutePath; 
    }

    public operate(){

        if(fs.existsSync(this.to)){
            this.deleteFolderRecursive(this.to);
        }

        fs.mkdirSync(this.to,0o777);
       
    }


    public deleteFolderRecursive(url: string): void {
        var files = [];
        //判断给定的路径是否存在
        if (fs.existsSync(url)) {
            //返回文件和子目录的数组
            files = fs.readdirSync(url);
            files.forEach( (file, index)=> {
                // var curPath = url + "/" + file;
                var curPath = path.join(url, file);
                //fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    this.deleteFolderRecursive(curPath);
                    // 是文件delete file
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            //清除文件夹
            fs.rmdirSync(url);
        } else {
            console.log("给定的路径不存在，请给出正确的路径");
        }
    };



}