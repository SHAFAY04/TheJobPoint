const verifyRoles=(...allowedRoles)=>{

    return (req,res,next)=>{

        if(!req?.roles)return res.sendStatus(401)

            const rolesArray=[...allowedRoles]

            console.log(rolesArray)

            console.log(req.roles)

            //checking if the user's roles matches the roles required to access a certain route and then checking if there is atleast one role that matches i.e checking for one true and if there are no true i.e no roles of the user matches the required roles then we're just gonna unauthorize the request  
            const result=req.roles.map(role=>rolesArray.includes(role)).find(value=>value===true)

            //if you somehow forget to use the return statement what happens is the 401 unauthorized response is sent with the headers and since you didnt returned from the middleware the next() will be called leading you to the editUsers method in the usersController which ofcourse will send a response as well leading you to the "cant set headers after they're already set error"
            if(!result){
                //if you want to log the headers that will be sent along with your response you can do it by res.getHeaders but before returning because it wont work if you returned from the middleware
                return res.sendStatus(401)
               
            }

                next()
        }



} 


export default verifyRoles