'use strict'

export default (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    'Appointment',
    {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      bookingId: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        field: 'booking_id',
        comment: 'Human-readable ID e.g. NCT-2026-4382'
      },
      patientName: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: 'patient_name'
      },
      phone: {
        type: DataTypes.STRING(30),
        allowNull: false,
        field: 'phone'
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'email'
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'dob'
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'reason'
      },
      doctorId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'doctor_id',
        references: { model: 'doctors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      appointmentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'appointment_date',
        comment: 'YYYY-MM-DD'
      },
      appointmentTime: {
        type: DataTypes.STRING(15),
        allowNull: false,
        field: 'appointment_time',
        comment: 'e.g. 09:00 AM'
      },
      status: {
        type: DataTypes.ENUM('confirmed', 'cancelled', 'completed'),
        allowNull: false,
        defaultValue: 'confirmed',
        field: 'status'
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
      tableName: 'appointments',
      timestamps: true,
      indexes: [
        {
          name: 'appointments_booking_id_unique',
          unique: true,
          fields: ['booking_id']
        },
        {
          name: 'appointments_doctor_date_time_unique',
          unique: true,
          fields: ['doctor_id', 'appointment_date', 'appointment_time'],
          comment: 'Prevents double-booking of a slot'
        }
      ]
    }
  )

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.Doctor, { foreignKey: 'doctorId', as: 'doctor' })
  }

  return Appointment
}
