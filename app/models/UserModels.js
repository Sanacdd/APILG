'Use strict'

const {DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        userId: {
            type: DataTypes.STRING(13),
            primaryKey: true,
          
        },
        pass: {
            type: DataTypes.STRING(255),
           
        },
        rolId: {
            type: DataTypes.INTEGER,
           
        },
        passwordResetRequired: {
            type: DataTypes.BOOLEAN,
            
        }
    }
    const options = {
       defaultScope: {
            attributes: { exclude: ['createAt','updateAt'] },
       
    },
    scopes: {
       // incluye todoslos atributos excepto la contraseña
        
    },
    tableName : 'user',
    timestamps: false,
    }
    return sequelize.define('User', attributes, options);
}