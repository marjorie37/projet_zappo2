/**
 *  Model Category
 * @param {*} sequelize
 * @param {*} DataTypes
 */
const Category = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        "category", // name of Model
        {
            // fields
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: { 
                type: DataTypes.STRING,
                notEmpty: true
            },
            description: {
                type: DataTypes.TEXT
            }
        },
        {
            timestamps: false,
            tableName: "category"
        }
    );
    Category.associate = function (models) {
        Category.hasMany(models.products,{ foreignKey:"category_id"})
    };
    return Category;
};

module.exports = Category;
