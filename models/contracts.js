const {
  Model,
} = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
  const Contracts = Sequelize.define('Contracts', {
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
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
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
    tableName: 'contracts',
    timestamps: true,
  });

  Contracts.associate = (models) => {
    Contracts.belongsToMany(models.Company, {
      through: models.Orders,
      foreignKey: 'contract_id',
      otherKey: 'company_id',
    });
    Contracts.belongsTo(models.Company, {
      foreignKey: { name: 'id', allowNull: false },
    });
  };

  return Contracts;
};
