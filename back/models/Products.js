/**
 *  Model Products
 * @param {*} sequelize
 * @param {*} DataTypes
 */
const Products = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "products", // name of Model
    {
      // fields
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: { type: DataTypes.STRING(50), notEmpty: true },
      description: {
        type: DataTypes.TEXT,
        notEmpty: true
      },
      ht_price: {
        type: DataTypes.FLOAT,
        isNumber: true
      },
      ttc_price: {
        type: DataTypes.FLOAT,
        isNumber: true
      },
      tva: {
        type: DataTypes.FLOAT,
        isNumber: true
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      favorites: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      allergens: {
        type: DataTypes.TEXT,
        get() {
          const text = this.getDataValue("allergens");
          return text ? JSON.parse(this.getDataValue("allergens")) : "";
        },
        set(val) {
          this.setDataValue("allergens", JSON.stringify(val));
        }
      },
      url: {
        type: DataTypes.STRING
      },
      sub_category: {
        type: DataTypes.STRING(50),
        notEmpty: true
      },
      category_id: {
        type: DataTypes.INTEGER,
        isInt: true
      }
    },
    {
      timestamps: false,
      tableName: "products",
      underscored: true
    }
  );
  Products.associate = function(models) {
    Products.belongsToMany(models.orders, {
      through: "order_products",
      foreignKey: "product_id"
    });
    Products.belongsToMany(models.products, {
      as: "associeProduit",
      through: "associateProduct",
      foreignKey: "product_id"
    });
    Products.belongsToMany(models.products, {
      as: "produitAssocie",
      through: "associateProduct",
      foreignKey: "associate_product_id"
    });
    Products.belongsTo(models.category);
  };
  return Products;
};

module.exports = Products;
