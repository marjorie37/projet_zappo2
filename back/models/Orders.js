const { dateToLocale } = require("../lib/parseDate");

/**
 *  Model Order
 * @param {*} sequelize
 * @param {*} DataTypes
 */

const randtoken = require("rand-token");
const moment = require('moment');

const Orders = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "orders",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      comments: {
        type: DataTypes.STRING
      },
      validation_time: {
        type: DataTypes.DATE,
        defaultValue:null
      },
      pending_time: {
        type: DataTypes.DATE,
        defaultValue: null
      },
      totalTTC: {
        type: DataTypes.FLOAT,
        isNumber: {
          msg: "Invalid price"
        }
      },
      totalHT: {
        type: DataTypes.FLOAT,
        isNumber: {
          msg: "Invalid price"
        }
      },
      customerId: {
        type: DataTypes.STRING(255)
      },
      chargeId: {
        type: DataTypes.STRING(255)
      },
      state: {
        type: DataTypes.STRING
      },
      uid: {
        type: DataTypes.STRING(100)
      },
      cart: {
        type: DataTypes.TEXT,
        defaultValue:"[]",
        get() {
          return JSON.parse(this.getDataValue("cart"));
        },
        set(val) {
          this.setDataValue("cart", JSON.stringify(val));
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        get() {
          return dateToLocale(this.getDataValue("createdAt"));
        }
      },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          return dateToLocale(this.getDataValue("updatedAt"));
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        isInt: {
          msg: "It's not a Integer"
        }
      }
    },
    {
      hooks: {
        afterValidate: (order, options) => {
          order.uid = `${moment().format('YYYY-MM-DD')}-${randtoken.generate(6).toUpperCase()}`;
        }
      },
      tableName: "orders",
      timestamps: false,
      underscored: true,
    }
  );

  
  Orders.associate = function(models) {
    Orders.belongsToMany(models.products, {
      through: "order_products",
      foreignKey: "order_id"
    });
    Orders.belongsTo(models.users);
  };
  return Orders;
};

module.exports = Orders;
