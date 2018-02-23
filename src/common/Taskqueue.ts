import {task,taskStatus,taskHandler} from '../type/define';


export class  Taskqueue{
    //private  queue:Array<Promise<any>> =[];
    private  queue:Array<task> =[];

    private status:taskStatus = "Ndo";


    constructor( ){
        this.queue = [];
    };

    run(){
        if(this.queue.length == 0 || this.status == "doing"){
            return;
        }

        
        let t:task = this.queue.pop();
        let {handler , successFn,errorFn}  = t;
        let p:Promise<any> = handler();
        this.status = "doing";

        
        
       p.then((v)=>{
            successFn.call(null,v);
            setTimeout(this.run.bind(this),0);
            this.status = "done";
            //setTimeout(this.run,1000)
            //this.run();
       }).catch((e)=>{
            
            typeof errorFn =="function" && errorFn.call(null,e)
            this.status = "done";
            setTimeout(this.run.bind(this), 0);
       })


    }

    pushTask(t:task){

        this.queue.push(t);
        this.run();
    }
}