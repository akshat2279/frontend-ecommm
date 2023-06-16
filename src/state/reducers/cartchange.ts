let intitialState = 0


const change=(state = intitialState, action:any)=>{
    switch(action.type){
        
        case 'quantity':           
            return {           
               state:action.payload            
        };        
        default : return state;
    }
}
export default change;