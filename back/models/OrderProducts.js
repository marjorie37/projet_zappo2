/**
 *  Model OrderProducts
 * @param {*} sequelize
 * @param {*} DataTypes
 */
const OrderProducts = (sequelize, DataTypes) => {
    const OrderProducts = sequelize.define(
        "order_products",
        {
            order_id: {
                type: DataTypes.INTEGER,
                isInt:{
                    msg: "It's not a number"
                },
                primaryKey:true
            },
            product_id:{
                type: DataTypes.INTEGER,
                isInt: {
                    msg: "It's not a number"
                },
                primaryKey:true,
            },
            quantity:{
                type: DataTypes.INTEGER,
                isInt: {
                    msg: "It's not a number"
                },
            },
            free:{
                type: DataTypes.BOOLEAN,
                isInt:{
                    msg: "It's not a number"
                }
            }
        },
        {
            tableName: "order_products",
            timestamps: false,
            underscored: true
        }
    );

    return OrderProducts;
};

module.exports = OrderProducts;
