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
      allowNull: true,
    },
    inn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
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
      foreignKey: 'company_id',
    });
    Company.hasMany(models.User, {
      foreignKey: 'company_id',
    });
    // Company.hasMany(models.Orders, {
    //   foreignKey: 'company_id',
    // });
    Company.belongsToMany(models.Contracts, {
      through: models.Orders,
      // as: 'Skills',
      foreignKey: 'company_id',
      otherKey: 'contract_id',
    });
  };

  return Company;
};
