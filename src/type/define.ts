
export type taskStatus = 'Ndo' | 'doing' | 'done' ;
export type taskHandler =    (v?:any) => void  ;


export interface task {
  handler: (v?:any) => Promise<any>,
  successFn:taskHandler,
  errorFn: taskHandler,
}