let intitialState = 0

interface IActionType {
    type:string,
    payload:number
}

const addtocart=(state = intitialState, action:IActionType)=>{
    switch(action.type){
        case 'addtocart':           
            return {
               state:action.payload      
        };       
        default : return state;
    }
}
export default addtocart;