import {Page} from "./Page"
import * as fs from 'fs'
import {version} from "../common/conf"
//import {read,writeFile} from "../common/Tools";

export class manifestPage extends  Page{

    constructor(from:string,to:string,compress:boolean = false ){
        super(from,to);
    }


    public  read( IN:string):string{
        return super.read(IN);
    }


    public operate(){

        let txt =this.read(this.from);
        let json = JSON.parse(txt);
        json.version = version;
        let out = JSON.stringify(json, null, '\t');
        this.writeFile(out,this.to);




    }



}