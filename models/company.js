const {
  Model,
} = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
  const Company = Sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // createdAt: {
    //   allowNull: false,
    //   type: Sequelize.DATE,
    //   defaultValue: Sequelize.literal('NOW()'),
    // },
    // updatedAt: {
    //   allowNull: false,
    //   type: Sequelize.DATE,
    //   defaultValue: Sequelize.literal('NOW()'),
    // },
  }, {
    tableName: 'company',
    timestamps: true,
  });

  Company.associate = (models) => {
    Company.hasMany(models.Contracts, {
    //   as: 'company_id',
      foreignKey: 'company_id',
    });
    //   Company.belongsTo(models.User, {
    //     foreignKey: { name: 'id', allowNull: false },
    //     as: 'User',
    //     onDelete: 'CASCADE',
    //   });
  };

  return Company;
};
