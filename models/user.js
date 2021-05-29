const {
  Model,
} = require('sequelize');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = (Sequelize, DataTypes) => {
  	const User = Sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'company',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    firstname: {
      type: DataTypes.STRING(20),
    },
    lastname: {
      type: DataTypes.STRING(20),
    },
    roles: {
      type: DataTypes.STRING(20),
    },
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,

    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,

    },
  }, {
    tableName: 'users',
    timestamps: true,
  });

  User.generateToken = function (user) {
    const token = jwt.sign({ id: user.id }, process.env.SALT);
    return token;
  };
  User.generateTokenForAdmin = function ({ id, admin_id }) {
    const token = jwt.sign({ id, admin_id }, process.env.SALT);
    return token;
  };
  User.authenticate = async (res, email, password) => {
    try {
      const user = await User.findOne({ where: { email: email.toLowerCase() } });
      if (!user) {
        throw new Error('Wrong email or password');
        // res.status(401).send('Wrong login or pass');
        // return;
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new Error('wrong password');
        // res.status(401).send('Wrong login or pass');
        // return;
      }
      return user;
    } catch (error) {
      throw new Error('Wrong email or password.');
      // res.status(404).send('smth s went wrong');
    }
  };
  User.associate = (models) => {
    User.belongsTo(models.Company, {
      foreignKey: { name: 'id', allowNull: false },
    });
  };
  return User;
};
