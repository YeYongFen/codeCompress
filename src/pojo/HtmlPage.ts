import {Page} from "./Page"
import {encryptCode} from "../common/encrypt";
import {program} from "../common/astQuery";
import * as posthtml from 'posthtml'
import * as parser from 'posthtml-parser'
import * as render from 'posthtml-render'
import * as path from 'path'
import * as fs from 'fs'
let walk = require('posthtml/lib/api').walk
let match = require('posthtml/lib/api').match
import { entries } from '../common/Tools';
import {config} from "../common/conf"

console.log(config)
//import {read,writeFile} from "../common/Tools";

export class HtmlPage extends  Page{

    
    private scripts:Array<string>;
    private styles:Array<string>;
    private content:string;
    private fromDir:string;
    private JsOutPath:string;

    constructor(from:string,to:string,JsOutPath:string){
        super(from,to);

        this.fromDir = path.dirname(from);
        this.JsOutPath = JsOutPath;
    }


    read( IN:string):string{

        let text = super.read(IN);
        if(IN.endsWith("config.js")){           
            let tree = program(text);

            for (let k of Object.keys(config)) {
                let v = config[k];
                tree.setVariable(k,v)
            }


           text = tree.generator();

            //tree.setVariable()

        }


        return text;
    }

    parseHtml(){




            this.content = this.read(this.from);
            let ast =  parser(this.content);

            ast =this.parseHtmlScript(ast) ;


            this.content  =  render(ast)


        

    }

    parseHtmlScript(ast){
        //let ast =  parser(this.content);

        let links =[];
        let ast1 = match.call(ast, [{ tag: 'script' }],  (node)=> {
            let root = this.fromDir;
            if(node &&node.tag == "script" && node.attrs && node.attrs.src){
                let p = path.resolve(root,node.attrs.src)
                links.push(p)
            }
            return {
                tag:false,
                content:""
            }
        });
        this.scripts = links;


        let tt1 = match.call(ast1, [{ tag: 'head' }],  (node)=> {
            let script_path = path.relative(  path.dirname(this.to) ,this.JsOutPath);
            var script_node ={ tag: 'script', attrs: { src: script_path } };
            if(node && node.tag == "head"){
                node.content.push(script_node);
            }
            return node
        })




        return tt1
    }

    mergeScript(){
        let text = "";

        this.scripts.forEach((link)=>{
            text +=";"+ this.read(link)
        })

        return text;
    }


    operate(){

        

        this.parseHtml();
        this.writeFile(this.content,this.to);
        let txt =this.mergeScript();

        let p:Promise<any> = encryptCode(txt);
        p.then( (data)=>{

            this.writeFile(data,this.JsOutPath);

            

            

        } ).catch((e)=>{
            console.log("加密----->",e)
        })

    }

  



}