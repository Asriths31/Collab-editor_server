import jwt from "jsonwebtoken"

function getUserDetails(req){


    // console.log("requesttt",req?.cookies);
    let jwtString
    if(typeof(req)==="string"){
        jwtString=req
    }
    else{
     jwtString=req?.cookies?.token

    }
    console.log("jwtStringgg",jwtString)
    try{
        
    
    const userData=jwt.verify(jwtString,process.env.jwt_secret_key)

    return userData;
}
catch(error){
    console.log("error in getUserDetails",error)
    return null;
}
}

export default getUserDetails;