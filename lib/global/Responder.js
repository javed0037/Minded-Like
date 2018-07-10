module.exports = {
'apiResponder':(req,res,responseMessage,responseCode,data,token)=>{
	return res.json({responseCode:responseCode,responseMessage:responseMessage,data:data,token:token})
}
}
