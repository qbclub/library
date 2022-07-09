export default function auth ({ next, store }){
    if(!store.getters.user.loggedIn || store.getters.userInfo == ''){
               return next({
           name: 'Auth'
        })
    }
    return next()
   }