export function LimitTime(startTime: Date, endTime: Date) {
  return (_target: unknown, _propertyName: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor => {
    const method = propertyDesciptor.value
    propertyDesciptor.value = function (...args: any[]) {
      if (Date.now().valueOf() < startTime.valueOf() || Date.now().valueOf() > endTime.valueOf()) {
        return 'timeout'
      } else {
        return method.apply(this, args)
      }
    }
    return propertyDesciptor
  }
}


export function HandleNone(index?: number) {

  return (_target: unknown, _propertyName: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor => {
    const method = propertyDesciptor.value
    propertyDesciptor.value = function (...args: any[]) {
      const targetArg = args?.[index] ?? args[args.length-1]
      if (!Array.isArray(targetArg)) {
        throw new Error('argument found with index is not array!')
      } else if (targetArg.length===0) {
        return []
      } else {
        return method.apply(this, args)
      }
    }
    return propertyDesciptor
  }
}