const {
  Model,
} = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
  const Orders = Sequelize.define('Orders', {
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
    contract_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'contracts',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'orders',
    timestamps: true,
  });

  Orders.associate = (models) => {
    Orders.belongsTo(models.Company, {
      foreignKey: { name: 'id', allowNull: false },
    });
    Orders.belongsTo(models.Contracts, {
      foreignKey: { name: 'id', allowNull: false },
    });
    Orders.hasMany(models.Reports, {
      foreignKey: 'order_id',
    });
  };

  return Orders;
};
