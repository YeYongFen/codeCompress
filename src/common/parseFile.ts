import * as posthtml from 'posthtml'
import * as parser from 'posthtml-parser'
import * as render from 'posthtml-render'
let walk = require('posthtml/lib/api').walk
let match = require('posthtml/lib/api').match
import * as fs from 'fs'
import * as path from 'path'
import { encryptCode } from './encrypt';
import { Taskqueue } from './Taskqueue';
import {task,taskStatus,taskHandler} from '../type/define';
import { setTimeout } from 'timers';

const taskQueue = new Taskqueue();



function encryptAndwrite(text:string,output:string){
    let encrypt_task:task = {
        handler:encryptCode.bind(null,text),
        successFn:(txt)=>{
            setTimeout(()=>{fs.writeFileSync(output,txt)} ,0 )  
        },
        errorFn:(e)=>{console.log(`There is a error when encrypt ${output}`,e)}
    }
    taskQueue.pushTask(encrypt_task);

}


export function handleScriptPage(inScript:string,outScript:string):void{
    let script = fs.readFileSync(inScript,"utf-8");
    encryptAndwrite(script,outScript);
}


export  function handleHtmlPage(input:string,outScript:string,outHtml:string):void{
    if(!fs.existsSync(input)){
        throw new Error("there is no "+input)
    }   
    let html = fs.readFileSync(input,"utf-8");   
    let ast =  parser(html);
    let links =[];
    let tt = match.call(ast, [{ tag: 'script' }], function (node) {
        let root = path.dirname(input);
        if(node &&node.tag == "script" && node.attrs && node.attrs.src){
            let p = path.resolve(root,node.attrs.src)
            links.push(p)
        }
        return {
            tag:false,
            content:""
        }
    })



    let tt1 = match.call(tt, [{ tag: 'head' }], function (node) {
        let script_path = path.relative(  path.dirname(outHtml) ,outScript);
        var script_node ={ tag: 'script', attrs: { src: script_path } };
        if(node && node.tag == "head"){
            node.content.push(script_node);
        }
        return node
    })

    let _html = render(tt1);
    setTimeout(()=>{
        fs.writeFileSync(outHtml,_html)
    },0)
    
    

    let text = "";
    links.forEach((link)=>{
        text +=";"+ fs.readFileSync(link)
    })
    encryptAndwrite(text,outScript)

}

export function parseHtmlScript(html){

    // let ast =  parser(html);
    // let links =[];
    // let tt = match.call(ast, [{ tag: 'script' }], function (node) {
    //     let root = path.dirname(input);
    //     if(node &&node.tag == "script" && node.attrs && node.attrs.src){
    //         let p = path.resolve(root,node.attrs.src)
    //         links.push(p)
    //     }
    //     return {
    //         tag:false,
    //         content:""
    //     }
    // })
}