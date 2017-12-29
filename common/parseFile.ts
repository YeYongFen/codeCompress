import * as posthtml from 'posthtml'
import * as parser from 'posthtml-parser'
import * as render from 'posthtml-render'
let walk = require('posthtml/lib/api').walk
let match = require('posthtml/lib/api').match
import * as fs from 'fs'
import * as path from 'path'



export function mixScript(input:string,out:string):void{

    

    if(!fs.existsSync(input)){
        throw new Error("there is no "+input)
    }
    

    let html = fs.readFileSync(input,"utf-8");

    //console.log(html)
    
    let ast =  parser(html);

    let links =[];


    let tt = match.call(ast, { tag: 'script' }, function (node) {

        if(node && node.attrs && node.attrs.src){
            let p = path.join(input,node.attrs.src)
            links.push(p)
        }

        return {
            tag:false,
            content:""
        }

        //console.log(node)
        
    })

    

    let text = "";

    links.forEach((link)=>{
        text += fs.readFileSync(link)
    })
    
    fs.writeFileSync(out, text);


}