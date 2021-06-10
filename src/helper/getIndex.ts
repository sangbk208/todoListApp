export const getIndex =(array:any, id:number)=> {
    return array.map((item:any)=>item.id).indexOf(id)
}