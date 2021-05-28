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
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
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
    tableName: 'contracts',
    timestamps: true,
  });

  Contracts.associate = (models) => {
    //   Contracts.hasMany(models.Note, {
    //     as: 'taskIds',
    //     foreignKey: { foreignKey: 'columnid' },
    //   });
    Contracts.belongsTo(models.Company, {
      foreignKey: { name: 'id', allowNull: false },
    });
  };

  return Contracts;
};
