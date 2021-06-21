function transformer<T0, T1, T2>(step:(v:T0)=>T1){

  return (result: (list:T1[], v0:T1)=>T2)=>{
    return (v: T0[]): T2[]=> {
      return R.reduce((p, c)=>result(p, step(c)), [] as T2[], v)
    }
  }
}


