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
    tableName: 'orders',
    timestamps: true,
  });

  //   Contracts.associate = (models) => {
  //     Contracts.hasMany(models.Note, {
  //       as: 'taskIds',
  //       foreignKey: { foreignKey: 'columnid' },
  //     });
  //     Contracts.belongsTo(models.User, {
  //       foreignKey: { name: 'id', allowNull: false },
  //       as: 'User',
  //       onDelete: 'CASCADE',
  //     });
  //   };

  return Orders;
};
