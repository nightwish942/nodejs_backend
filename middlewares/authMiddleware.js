const authenticateToken=(req,res,next)=>{
    const autHeader=req.headers["authorization"]
    console.log("autHeader",autHeader)
    const token= autHeader && autHeader.split(" ")[1];
    console.log("token",token);
}





export { authenticateToken };