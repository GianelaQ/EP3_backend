const User =  require('../models/Usuario')
const config = require('../config/global')

exports.crearUsuario = async (req, res) => {
    try {
        const { nombres, apellidos, correo, password } = req.body;
        const user = new User({
            nombres,
            apellidos,
            correo,
            password
        });

        user.password = await user.encryptPassword(user.password);
        await user.save();

        res.json({
            "nombres": user.nombres,
            "apellidos": user.apellidos,
            "correo": user.correo,
            "password": user.password
        });
    } catch (error) {
        if (error.code === 11000) {
            // Código de error de duplicado en MongoDB
            res.status(400).json({ error: 'El correo ya está registrado' });
        } else {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    }
};

exports.loginUsuario = async (req, res) => {
    try {
        const { correo, password } = req.body;

        
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(400).json({ mensaje: 'Correo o contraseña incorrecta' });
        }

        
        const isMatch = await user.validatePassword(password);
        if (!isMatch) {
            return res.status(400).json({ mensaje: 'Correo o contraseña incorrecta' });
        }

        res.json({ mensaje: 'Login exitoso' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
