'use strict'

export default (sequelize, DataTypes) => {
  const Service = sequelize.define(
    'Service',
    {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'name'
      },
      slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: 'slug'
      },
      iconName: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'icon_name',
        comment: 'lucide-react icon name e.g. Heart, Brain, Bone'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'description'
      },
      imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: 'image_url'
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
      tableName: 'services',
      timestamps: true
    }
  )

  Service.associate = (models) => {
    Service.hasMany(models.Doctor, { foreignKey: 'serviceId', as: 'doctors' })
    Service.hasMany(models.Condition, { foreignKey: 'serviceId', as: 'conditions' })
  }

  return Service
}
