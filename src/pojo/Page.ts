//import { copyFile,read, write } from '../common/Tools';
import * as path from 'path'
import * as fs from 'fs'
import {FileInterface} from './FileInterface'


export class Page implements FileInterface{

    protected from:string;   // absolute Path
    protected to:string;  // absolute path


    constructor(from:string,to:string){   

        this.from = from;
        this.to = to; 

    }

    public operate(){

        this.copyFile(this.from,this.to)

    }


    public  read( IN:string):string{
        try{
            let Txt = fs.readFileSync(IN,"utf-8");
            return Txt;
        }catch(e){
            return "";
        }
    
    }

    public write(text:string , OUT:string):boolean{
        try{
            fs.writeFileSync(OUT,text);
            return true;
        }catch(e){
            return false;
        }
    
    }

    public writeFile(text:string , OUT:string){

        fs.writeFile(OUT,text,()=>{

        })
    
    }


    public copyFile(IN:string , OUT:string){

        var rs = fs.createReadStream(IN);
        var ws = fs.createWriteStream(OUT);
        rs.pipe(ws);
        
    
    
    }



}