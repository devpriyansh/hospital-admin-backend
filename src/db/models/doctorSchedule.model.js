'use strict'

export default (sequelize, DataTypes) => {
  const DoctorSchedule = sequelize.define(
    'DoctorSchedule',
    {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      doctorId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'doctor_id',
        references: { model: 'doctors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      dayOfWeek: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'day_of_week',
        comment: '0=Sunday, 1=Monday, ..., 6=Saturday',
        validate: { min: 0, max: 6 }
      },
      slots: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
        field: 'slots',
        comment: 'Time slots available e.g. ["09:00 AM", "09:30 AM"]'
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
      tableName: 'doctor_schedules',
      timestamps: true
    }
  )

  DoctorSchedule.associate = (models) => {
    DoctorSchedule.belongsTo(models.Doctor, { foreignKey: 'doctorId', as: 'doctor' })
  }

  return DoctorSchedule
}
