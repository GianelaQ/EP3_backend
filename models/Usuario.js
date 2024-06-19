const {Schema, model } = require ('mongoose')
const bcrypt = require ('bcryptjs')

const userSchema = new Schema( {

    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },

})

userSchema.methods.encryptPassword = async (password) => {

    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

userSchema.methods.validatePassword = function (password)  {

   
    return bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema)