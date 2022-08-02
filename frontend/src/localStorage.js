exports.addToLocal = (id)=>{
    localStorage.setItem("userId",JSON.stringify(id))
}
exports.addToLocalToken = (token)=>{
    localStorage.setItem("token",JSON.stringify(token))
}
exports.returnID = ()=>{
    const id = localStorage.getItem("userId")
    return id
}
exports.returnToken =()=>{
    const token = localStorage.getItem("token")
    return token
}