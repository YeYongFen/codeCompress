import * as path from 'path'
import * as fs from 'fs'
import * as program from 'commander'


program
  .option('-c| --configure <string>', 'the relative path of cam.json')
  .option('-e| --extionse <string>', 'the path of cam.json');



program.parse(process.argv);


let configPath = program.configure || "./dist/cam.json";

let info =  JSON.parse(fs.readFileSync(path.join( process.cwd()  ,configPath),"utf-8")) ;

let _version = program.extionse ||info.version

console.log(program.configure)
console.log(program.extionse)



//let tt=fs.readdirSync("./cam.json");

//console.log(info)



//let inputRoot,outputRoot,version,Html2JsObj,unpackagedFile,jsScriptsX,jsScripts,unpackagedFolder,manifest;
export  const version = _version;

info.config.EX_VERSION =  version;
info.outputRoot = info.outputRoot+"_"+version;

export const config = info.config;
export const inputRoot = info.inputRoot;
export const outputRoot: string =info.outputRoot; 





const resolveInputRoot = function (dir) {
    return path.resolve(info.inputRoot, dir)
}

const resolveOutputRoot = function (dir) {
    return path.resolve(info.outputRoot, dir)
}



export const unpackagedFile = info.unpackagedFile.map((file) => { return resolveInputRoot(file) });

export const jsScriptsX = info.jsScriptsX.map((file) => { return resolveInputRoot(file) });
export const jsScripts = info.jsScripts.map((file) => { return resolveInputRoot(file) });

export const unpackagedFolder = info.unpackagedFolder.map((file) => { return resolveInputRoot(file) });

export const manifest =info.manifest.map((file) => { return resolveInputRoot(file) });





export const Html2JsMap = new Map();
for (let k of Object.keys(info.Html2JsObj)) {
    let v =  info.Html2JsObj[k];
    Html2JsMap.set(resolveInputRoot(k),resolveOutputRoot(v))
    
}

export const Html2JsMap1 = new Map();
for (let k of Object.keys(info.Html2JsObj)) {
    let v =  info.Html2JsObj[k];
    Html2JsMap1.set(resolveInputRoot(k),"/"+v)
    
}

//console.log(Html2JsMap)

//console.log(Html2JsMap1)








/*
export let inputRoot: string = "C:\\Users\\Administrator\\Documents\\Hbuilder2\\v3Usb";
export let outputRoot: string = "C:\\Users\\Administrator\\Desktop\\cam";


export const version = "20.1.66";









const resolveInputRoot = function (dir) {
    return path.resolve(inputRoot, dir)
}

const resolveOutputRoot = function (dir) {
    return path.resolve(outputRoot, dir)
}



export const Html2JsMap: Map<string, string> = new Map([
    [resolveInputRoot("./background/background.html"), resolveOutputRoot("./main_background.js")],
    [resolveInputRoot("./setting/setting.html"), resolveOutputRoot("./main_setting.js")],
    [resolveInputRoot("./setting/setup.html"), resolveOutputRoot("./main_setup.js")],
    [resolveInputRoot("./popup/popup.html"), resolveOutputRoot("./main_pop.js")]
]);

export const unpackagedFile = info.map((file) => { return resolveInputRoot(file) });

export const jsScriptsX = ["./foreground/myjs.js"].map((file) => { return resolveInputRoot(file) });
export const jsScripts = ["./common/jquery.js", "./setting/js/web_bluetooth.js"].map((file) => { return resolveInputRoot(file) });


export const unpackagedFolder = [".svn", "unpackage"].map((file) => { return resolveInputRoot(file) });

export const manifest = ["./manifest.json"].map((file) => { return resolveInputRoot(file) });
*/