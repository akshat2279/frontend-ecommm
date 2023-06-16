let intitialState = {}


const savelogin = (state = intitialState, action: any) => {

    switch (action.type) {

        case 'save':
            return {
                state: action.payload
            };
        case 'logout':
            return {
                state: {}
            }
        default: return state;
    }
}
export default savelogin;