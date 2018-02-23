import { copyFile,read, write,writeFile } from '../common/Tools';
import * as path from 'path'
import * as fs from 'fs'
import {Page} from "./Page"
import {FileInterface} from './FileInterface'
import {encryptCode} from "../common/encrypt";

export class scriptPage extends  Page{

    private compress = false;

    constructor(from:string,to:string,compress:boolean = false ){
        super(from,to);

        this.compress = compress;
    }

    public operate(){

        //fs.writeFileSync(this.to, this.content);

        let txt =this.read(this.from);;

        if(this.compress){
            let p:Promise<any> = encryptCode(txt);
            p.then( (data)=>{
                //console.log("---------------->",data.length)
                writeFile(data,this.to);
                //fs.writeFileSync(this.to,data);
            } ).catch((e)=>{
                console.log("加密----->",e)
            })

        }else{
           // fs.writeFileSync(this.to,txt);
           writeFile(txt,this.to);
        }
    }

   // public 




}