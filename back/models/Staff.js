/**
 *  Model Staff
 * @param {*} sequelize
 * @param {*} DataTypes
 */
const Staff = (sequelize, DataTypes) => {
  const Staff = sequelize.define(
    "staff", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50),
        notEmpty: true,
        validate: {
          len: {
            args: 3,
            msg: "Name must be at least 3 characters in length"
          }
        }
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      position: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      password: {
        type: DataTypes.STRING(100),
        notEmpty: true,
        validate: {
          len: {
            args: 6,
            msg: "Password must be at least 6 characters in length"
          }
        }
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
    }, {
      tableName: "staff",
      timestamps: false,
      underscored: true
    }
  );

  return Staff;
};

module.exports = Staff;