'use strict'

export default (sequelize, DataTypes) => {
  const SiteConfig = sequelize.define(
    'SiteConfig',
    {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      key: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: 'key',
        comment: 'Config key e.g. contact, hours, social'
      },
      value: {
        type: DataTypes.JSONB,
        allowNull: false,
        field: 'value',
        comment: 'JSON value for the config key'
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
      tableName: 'site_configs',
      timestamps: true
    }
  )

  return SiteConfig
}
