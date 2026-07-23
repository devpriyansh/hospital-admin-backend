'use strict'

export default (sequelize, DataTypes) => {
  const Testimonial = sequelize.define(
    'Testimonial',
    {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      patientName: {
        type: DataTypes.STRING(150),
        allowNull: false,
        field: 'patient_name'
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'city'
      },
      quote: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'quote'
      },
      avatarUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: 'avatar_url'
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
        field: 'rating',
        validate: { min: 1, max: 5 }
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
      tableName: 'testimonials',
      timestamps: true
    }
  )

  return Testimonial
}
