import { createStore , action, thunk } from 'easy-peasy'

const store = createStore({
    message : [''], 
    addMessage : action((state , payload) => {
        console.log(payload,"At store")
        return {
            ...state,
            message : [payload]
        }
    }),
    file : [''], 
    addFile : action( (state , payload) => {
        state.file.push(payload)
    })
})

export default store