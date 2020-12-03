const bcrypt = require('bcryptjs')

const password = '12345'

/* RESULTADO 1 */
const comparePasswordHash = async (password) => {
    const hash = await bcrypt.hash(password, 8)
    return await bcrypt.compare(password, hash)
}
comparePasswordHash(password).then((dato) => {
    console.log('RESULTADO 1: ', dato)
})

/* RESULTADO 2 */
const comparePasswordHash2 = (password) => bcrypt.hash(password,8)
.then((hash) => {return bcrypt.compare(password, hash)})
.then((dato)=>{console.log('RESULTADO 2:', dato)})
.catch((e) => { 'mira por donde', console.log(e) })

comparePasswordHash2(password)