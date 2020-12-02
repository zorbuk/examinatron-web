const bcrypt = require('bcryptjs')

const password = '12345'

const getHash = async(password) => {
    //return await bcrypt.hash(password, 8)
    const hash = await bcrypt.hash(password, 8)
    console.log(hash, '<- getHash()')
}

const isValidPassword = async(arg1, arg2) => {
    const hashedPassword = await getHash(arg2)
    
    // -------- TODO ---------
    bcrypt.compare(arg1, hashedPassword);
}

isValidPassword('123', password);

/*const isValidPassword = bcrypt.compare('123', getHash(password))
if()*/

