
import { inputRoot, outputRoot, Html2JsMap, unpackagedFile,unpackagedFolder ,jsScripts,jsScriptsX,manifest} from "../common/conf"
import { checkFileName } from "../common/Tools"
import { Page } from "./Page"
import { HtmlPage } from "./HtmlPage"
import { FileInterface } from "./FileInterface"
import { Folder } from "./Folder"
import {scriptPage} from "./scriptPage"
import {manifestPage} from "./manifestPage"




class emptyFile implements FileInterface {
    operate() { }
}

export class PageFactory {

    // static Html2JsMap: Map<string, string> = Html2JsMap;
    // static unpackagedFile = unpackagedFile;

    static createPage(inputPath: string, outputPath: string): FileInterface {

        if (unpackagedFile.indexOf(inputPath) > -1 || !checkFileName(inputPath)) {
            return new emptyFile()

        } else if (inputPath.endsWith(".html")) {
            // return new emptyFile()
            //let map =  PageFactory.Html2JsMap;

            if (Html2JsMap.has(inputPath)) {
                return new HtmlPage(inputPath,outputPath , Html2JsMap.get(inputPath));
            }else{
                return new Page(inputPath, outputPath);
            }

        } else if (inputPath.endsWith(".js")) {

            if( jsScripts.indexOf(inputPath)>-1  ){

                 return new scriptPage(inputPath,outputPath)

            }else if(jsScriptsX.indexOf(inputPath)>-1){   
                return new scriptPage(inputPath,outputPath,true)

            }else{
                return new emptyFile()
            }

        }else if( manifest.indexOf(inputPath)>-1 ){
            return new manifestPage(inputPath, outputPath);
        }else {
            return new Page(inputPath, outputPath);
        }
    }

    static createFolder(inputPath: string, outputPath: string): FileInterface {

        if (unpackagedFolder.indexOf(inputPath) > -1 || !checkFileName(inputPath)) {
            return null

        }else {
            return new Folder(outputPath);
        }
    }

}