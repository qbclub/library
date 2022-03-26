export default function auth ({ next, store }){
    if(!store.getters.user.loggedIn){
               return next({
           name: 'Auth'
        })
    }
    return next()
   }