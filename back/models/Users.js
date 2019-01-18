/**
 *  Model Users
 * @param {*} sequelize
 * @param {*} DataTypes
 */
const randtoken = require("rand-token");

const Users = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
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
      phone: {
        type: DataTypes.STRING,
        notEmpty: true,
        validate: {
          len: {
            args: 10,
            msg: "Phone must 10 characters in length"
          }
        }
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
        validate: {
          len: {
            args: [6, 50],
            msg: "Email address must be between 6 and 50 characters in length"
          }
        }
      },
      password: {
        type: DataTypes.STRING(50),
        notEmpty: true,
        allowNull: false,
        validate: {
          len: {
            args: 6,
            msg: "Password must be at least 6 characters in length"
          }
        }
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      subscription: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          len: {
            args: 1,
            msg: "each user must have 1 points length"
          }
        }
      },
      token: {
        type: DataTypes.STRING(300)
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      customerId: {
        type: DataTypes.STRING(255)
      }
    },
    {
      hooks: {
        afterValidate: (user, options) => {
          user.token = randtoken.generate(50);
        }
      },
      tableName: "users",
      timestamps: false,
      underscored: true
    }
  );
  Users.associate = function(models) {
    Users.hasMany(models.orders, { foreignKey: "user_id" });
  };
  return Users;
};

module.exports = Users;
