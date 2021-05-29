const {
  Model,
} = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
  const Reports = Sequelize.define('Reports', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'reports',
    timestamps: true,
  });

  Reports.associate = (models) => {
    Reports.belongsTo(models.Orders, {
      foreignKey: { name: 'id', allowNull: false },
    });
  };

  return Reports;
};
