const expr = /^Ref\(Collection\("\w*"\), "(\d*)"\)/s

export const getId = (ref) => {
   if(expr.test(ref)){
     const result = expr.exec(ref);
     return result[1];
   }
}
