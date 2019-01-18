const { localeToDate, dateToLocale } = require("../lib/parseDate");

/**
 *  Model Discounts
 * @param {*} sequelize
 * @param {*} DataTypes
 */
const Discounts = (sequelize, DataTypes) => {
  const Discounts = sequelize.define(
    "discounts",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50)
      },
      endAt: {
        type: DataTypes.DATE,
        set(val) {
          this.setDataValue("endAt", localeToDate(val));
        },
        get() {
          return dateToLocale(this.getDataValue("endAt"));
        }
      },
      discount_items: {
        type: DataTypes.TEXT,
        notEmpty: true,
        defaultValue: "[]",
        get() {
          return JSON.parse(this.getDataValue("discount_items"));
        },
        set(val) {
          this.setDataValue("discount_items", JSON.stringify(val));
        }
      },
      percentage: {
        type: DataTypes.INTEGER(2),
        defaultValue: 0
      },
      title: {
        type: DataTypes.STRING(50),
        notEmpty: true
      },
      description: {
        type: DataTypes.TEXT,
        notEmpty: true
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      code: {
        type: DataTypes.STRING(15),
        notEmpty: true
      },
      publish: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      tableName: "discounts",
      underscored: true,
      timestamps: false,
      getterMethods: {
        jsonToStr() {
          return Object.values(this.discount_items)
            .map(el => "* " + el)
            .join(" ");
        }
      }
    }
  );
  return Discounts;
};

module.exports = Discounts;
