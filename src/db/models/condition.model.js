'use strict'

export default (sequelize, DataTypes) => {
  const Condition = sequelize.define(
    'Condition',
    {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        field: 'name'
      },
      serviceId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'service_id',
        references: { model: 'services', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at'
      }
    },
    {
      sequelize,
      underscored: true,
      tableName: 'conditions',
      timestamps: true
    }
  )

  Condition.associate = (models) => {
    Condition.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' })
  }

  return Condition
}
