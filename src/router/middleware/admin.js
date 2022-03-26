export default function admin ({ next, store }){
    if(!store.getters.userInfo.isAdmin){
               return next({
           name: 'StartPage'
        })
    }
    return next()
   }