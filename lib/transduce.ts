import { flow, pipe } from 'fp-ts/function'
import { type } from 'ramda'



function reduce<T0, T1>(fn: (p: T1[], c: T0)=>T1[], acc: T1[], list: T0[]){
  return list.reduce(fn, acc)
}
function add1(v: number){
  return v+1
}
function append<T>(list: T[], v: T){
  return [...list, v]
}

function tmap<T, U>(step: (v: T)=>U){
  return function(join: Join<U>){
    return function(acc: U[], elem: T){
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

interface Join<T, U>{
  (acc: U[], elem: T): U[]
}
interface Step<T0, T1>{
  (join: (step: (v: T0)=> T1) => Join<T1>): (acc: T1[], elem: T0)=> T1[]
}
interface Step2<T, U>{
  (step: (v: T) => U): (join: Join<U>) => (acc: U[], elem: T) => U[]
}
type Step1 = <T, U>(join: Join<T, U>) => (acc: U[], elem: T) => U[]




// function transducer<T0, T1>(v0: T0[], V1: T1[], join: Join<T1>, step: Step2<T0, T1>){
//   return (step1: (v: T0)=> T1)=>reduce(step(step1)(join), V1, v0)
  
// }

function transducer<T0, T1>(v0: T0[], V1: T1[], join: Join<T0, T1>){
  return (fn: Step1) =>reduce(fn(join), V1, v0)
}

console.log(
  
  transducer([0,1,2,3], [] as number[], append)(tmap(add1))
  )
