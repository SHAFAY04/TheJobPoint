const whitelist=[

    'www-yoursite.com',
    'http://localhost:3500',
    'https://www.google.com',
    'http://127.0.0.1:5500'
]

const corsOptions={

 
    origin:(origin,callback)=>{

        if(whitelist.indexOf(origin)!==-1 || !origin){

            callback(null,true)
        }
        else{

            callback(new Error('Origin not Allowed!'))
        }

    },
    optionsSuccessStatus:200

}

export default corsOptions