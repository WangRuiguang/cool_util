import { pipe } from 'fp-ts/function'
function transformer<T0, T1>(step:(v:T0)=>T1){
  return (result: (list:T1[], v0:T1)=>T1[])=>{
    return (v: T0[]): T1[]=> {
      return reduce((p, c)=>result(p, step(c)), [] as T1[], v)
    }
  }
}


function reduce<T0, T1>(fn: (p: T1[], c: T0)=>T1[], acc: T1[], list: T0[]){
  return list.reduce(fn, acc)
}
function add1(v: number){
  return v+1
}
function append<T>(list: T[], v: T){
  return [...list, v]
}
console.log(
  transformer(add1)(append)([0,1,2])
)

function tmap<T>(step: (v: T)=>T){
  return function(join: Join<T>){
    return function(acc: T[], elem: T){
      return join(acc, step(elem))
    }
  }
}
function tfilter<T>(step: (v: T)=>boolean){
  return function(join: Join<T>){
    return function(acc: T[], elem: T){
      return step(elem) ? join(acc, elem) : acc
    }
  }
}
function isEven(v: number){
  return v % 2 === 0
}
// const pipe2 = 
//   <T>(fn1: Join<T>)=> (fn2: Join<T>) => (join: Join<T>)=>(acc: T[], elem: T) => fn2(fn1(join)(acc, elem))

// const tran = pipe2(tmap(add1))(tfilter(isEven))
const f = tfilter(isEven)
console.log([1,2,3].reduce((acc, elem)=>f(tmap(add1)(append))(acc, elem), [] as number[]))

interface Join<T>{
  (acc: T[], elem: T): T[]
}