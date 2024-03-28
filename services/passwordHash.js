import bcrypt from "bcrypt"

const passwordHash = async (password)=>{
    return await bcrypt.hash(password,10)
}

export default passwordHash