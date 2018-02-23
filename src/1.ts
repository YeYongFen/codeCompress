import {PageFactory} from "./pojo/PageFactory"
import {Folder} from "./pojo/Folder"
import {FileInterface} from "./pojo/FileInterface"
import * as fs from 'fs'
import * as path from 'path'
import {inputRoot,outputRoot,Html2JsMap,unpackagedFolder} from "./common/conf"




//import { doFile } from './common/ffs';


//doFile()

// let t:PageFactory = new PageFactory();
// console.log(t.fileMap)

copyFolder("/")


function copyFolder(relativePath:string){

    let inputFile = path.join(inputRoot,relativePath);
    let outputFile = path.join(outputRoot,relativePath);
    

    if(!fs.existsSync(inputFile)){
        throw new Error("there is no "+inputFile)
    }




    let stats = fs.statSync(inputFile);


   

    if (stats.isDirectory()  ){

        

        if( unpackagedFolder.indexOf(inputFile)>-1 ){

        }else{

            let floder:FileInterface = PageFactory.createFolder(inputFile,outputFile);
            floder.operate();
            
            let files = fs.readdirSync(inputFile);

            files.forEach(function(file,index){
  
                let from = path.join(relativePath,file);
               // console.log(from)
    
                copyFolder(from);
        
            });

        }


    }else if(!stats.isDirectory() ){

        let page:FileInterface = PageFactory.createPage(inputFile,outputFile);
        page.operate()
    }


}