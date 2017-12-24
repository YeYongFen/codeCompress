import * as http from 'http';
import * as https from 'https';
import * as querystring from 'querystring';
import * as url from 'url';

export function postMessage(_url: string):  Promise<any>;
export function postMessage(_url: string,postData:object):  Promise<any>;
export function postMessage(_url: string,postData:object,headers:object):  Promise<any>;

export function postMessage(...args):  Promise<any>{
    let _url = args[0];
    let postData = args[1]||{};
    let headers = args[2]||{}; 

    return new Promise((resolve,reject) => {
         

        let urlData = url.parse(_url);   
        let pData = querystring.stringify(postData);
        let default_headers = {
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length':Buffer.byteLength(pData)
        }    

        let options={
            hostname:urlData.hostname,
            port:urlData.port||"443",
            path:urlData.path,
            method:'POST',
            //secureProtocol: 'SSLv3_method',
            headers:Object.assign(default_headers,headers)
         }

         //console.log(options)

        let req = https.request(options, function (res) {
            let chunks:string = "";
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                chunks += `${chunk}`;
            });

            res.on('end',function(){ 
                resolve(chunks)
             })

        });

        req.on('error',function(err){
            reject(err);
        });
        req.write(pData);
        req.end();

    })
}



