import * as babylon from 'babylon';
import traverse from "babel-traverse";
import generator from "babel-generator";
var types = require('babel-types');





export function program(js){
    return new jsParser(js);
} 


class jsParser{

    private ast;
    private Kmap:object = new Object();

    constructor(code){


        

        this.program(code);
    }

    program(code){
        this.ast = babylon.parse(code);
    }

    setVariable(k,v){
        this.Kmap[k] = v;
    }

    traverse(){
        let self = this;
        traverse(this.ast, {
            enter(path) {
                let node =( path.node as any);

        
                if (path.parentPath) {
        
                    let parentNode = (path.parentPath.node as any) ;
                    let id  = parentNode.id;
                    let init  = parentNode.init;

                    if (
                        path.parentPath.isVariableDeclarator({ init: node })
                        && path.isLiteral() 
                        && parentNode 
                        && types.isIdentifier(id)
                        && self.Kmap[id.name] 
                    ) {
                        
                       let v = self.Kmap[id.name];
                       node .value = v;
                    }
        
                }
            }
        });
    }

    generator(){

        this.traverse()

        return generator(this.ast).code;

    }



}



// let code1 = generator(ast);


// console.log(code1);