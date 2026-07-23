'use strict'

export default (sequelize, DataTypes) => {
  const Doctor = sequelize.define(
    'Doctor',
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
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
        field: 'email'
      },
      passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'password_hash'
      },
      isAvailableNow: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_available_now'
      },
      schedule: {
        type: DataTypes.JSONB,
        allowNull: true,
        field: 'schedule'
      },
      profileChangeRequested: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'profile_change_requested'
      },
      specialty: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'specialty',
        comment: 'Plain text label e.g. Cardiology'
      },
      serviceId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'service_id',
        references: { model: 'services', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      photoUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: 'photo_url'
      },
      yearsOfExperience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'years_of_experience'
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 4.5,
        field: 'rating'
      },
      reviewsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'reviews_count'
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'bio'
      },
      education: {
        type: DataTypes.STRING(300),
        allowNull: true,
        field: 'education'
      },
      languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: ['English'],
        field: 'languages'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active'
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
      tableName: 'doctors',
      timestamps: true
    }
  )

  Doctor.associate = (models) => {
    Doctor.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' })
    Doctor.hasMany(models.DoctorSchedule, { foreignKey: 'doctorId', as: 'schedules' })
    Doctor.hasMany(models.Appointment, { foreignKey: 'doctorId', as: 'appointments' })
  }

  return Doctor
}
