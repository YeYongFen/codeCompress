import { postMessage } from './request';
import * as posthtml from 'posthtml'
import * as fs from 'fs'
import * as parser from 'posthtml-parser'

var walk = require('posthtml/lib/api').walk
var match = require('posthtml/lib/api').match

var url = "https://www.javascriptobfuscator.com/Javascript-Obfuscator.aspx";


var header = {
    "Origin": "https://www.javascriptobfuscator.com",
    "Upgrade-Insecure-Requests": "1",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36",
    "X-DevTools-Emulate-Network-Conditions-Client-Id": "(38CC8F69A76EA6342E4B31B1A8ABD9D8)",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng",
    "Referer": "https://www.javascriptobfuscator.com/Javascript-Obfuscator.aspx",
    //"Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cookie":"__cfduid=dcf56d9734776950978dd79f220f9a4b51514034909"
}

let postData = {
    "UploadLib_Uploader_js": "1",
    "__EVENTARGUMENT": "",
    "__EVENTTARGET": "ctl00$MainContent$Button1",
    "__EVENTVALIDATION": "/wEdAAxRV/QgRKJa6jGWNpNdeJ8NCJ8xELtYGHfHJig8BNR1A/nd3wctyww89JbDbeLvgrjW/QY5cz+pu3qUjqM+4n5jIWlyEKFxLO5ck+F6M0ODiJ1itZp+2hATYVWj/b++nyR8f2dPhQQre4aI0Iea4dKYmjI5SSrP8/di9FPKAsCRiSDSoNvpe2qp90wnP2HAWzNs9mdJae9TApAJFRRb54f73WbA4XcESfoeI8EInEzA+dxRJK/kVxlULg0AsW337/IhyPlLzNxB/IG4FEUM09ELS59E622Kl2Q2tVkHjKOrKg==",
    "__VIEWSTATE": "/wEPDwUKMTM4MjU3NDgxNw9kFgJmD2QWAgIDD2QWBAIBDxYCHgRUZXh0BfoCPGxpIGNsYXNzPSdsaXN0LWlubGluZS1pdGVtIGctbXgtNCBnLW10LTEwJz48YSBjbGFzcz0nZy1jb2xvci13aGl0ZSBnLWNvbG9yLXByaW1hcnktLWhvdmVyIGctdGV4dC11bmRlcmxpbmUtLW5vbmUtLWhvdmVyJyBocmVmPScvc2lnbmluLmFzcHgnPkFjY291bnQgTG9naW48L2E+PC9saT4KPGxpIGNsYXNzPSdsaXN0LWlubGluZS1pdGVtIGctbXgtNCBnLW10LTEwJz58PC9saT4KPGxpIGNsYXNzPSdsaXN0LWlubGluZS1pdGVtIGctbXgtNCBnLW10LTEwJz48YSBjbGFzcz0nZy1jb2xvci13aGl0ZSBnLWNvbG9yLXByaW1hcnktLWhvdmVyIGctdGV4dC11bmRlcmxpbmUtLW5vbmUtLWhvdmVyJyBocmVmPScvcmVnaXN0ZXIuYXNweCc+UmVnaXN0ZXI8L2E+PC9saT4gZAIHD2QWAgIZDw8WAh4HVmlzaWJsZWdkZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WBQUaY3RsMDAkTWFpbkNvbnRlbnQkY2JMaW5lQlIFGmN0bDAwJE1haW5Db250ZW50JGNiSW5kZW50BR1jdGwwMCRNYWluQ29udGVudCRjYkVuY29kZVN0cgUbY3RsMDAkTWFpbkNvbnRlbnQkY2JNb3ZlU3RyBSBjdGwwMCRNYWluQ29udGVudCRjYlJlcGxhY2VOYW1lc2yv/qXn7612SqIWRpHEkuW6yB52C5sDLkfHNHI5V/4G",
    "__VIEWSTATEGENERATOR": "6D198BE1",
    "ctl00$MainContent$TextBox1": "var i = 0;\n\n\nvar y = 0;",
    "ctl00$MainContent$TextBox2": "",
    "ctl00$MainContent$TextBox3": "",
    "ctl00$MainContent$cbEncodeStr": "on",
    "ctl00$MainContent$cbMoveStr": "on",
    "ctl00$MainContent$cbReplaceNames": "on",
    "ctl00$MainContent$uploader1": ""
}


var parseHtml = function pluginName(tree) {
    // do something for tree
    tree.match({ tag: 'textarea' }, function(node) {

        //console.log(node.attrs.id)
        if(node.attrs && node.attrs&& node.attrs.id=="ctl00_MainContent_TextBox2"){

            return node
        }

    })

   // return tree;
}

function xmlescape (text) {
    text = text.replace(/&amp;/g, "&");
    text = text.replace(/&lt;/g, "<");
    text = text.replace(/&gt;/g, ">");
    text = text.replace(/&apos;/g, "'");
    text = text.replace(/&quot;/g, '"');
    return text;
};





export async function encryptCode(inputCode:string):Promise<any>{

    postData["ctl00$MainContent$TextBox1"] = inputCode;
    let promise =   postMessage(url,postData,header);
    let output  = ""; 

    //console.log("00000000000000000000000000000000000000000")

    return new Promise((resolve,reject) => {
        promise.then((v)=>{
            let ast = parser(v);
            match.call(ast, { tag: 'textarea' },  (node)=> {
                if(node.attrs && node.attrs&& node.attrs.id=="ctl00_MainContent_TextBox2"){
                    output+=node.content;
                    return node
                }
            })


            resolve(  xmlescape(output) )
        }).catch((e)=>{
            console.log("error",e)
            reject(e)
        })


    })
    
}