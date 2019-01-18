/**
 *  Model Associate_product
 * @param {*} sequelize
 * @param {*} DataTypes
 */
const AssociateProduct = (sequelize, DataTypes) => {
    const AssociateProduct = sequelize.define(
        "associateProduct",
        {
            product_id: {
                type: DataTypes.INTEGER
            },
            associate_product_id: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: "associateProduct",
            timestamps: false,
            underscored: true
        }
    );

    return AssociateProduct;
};

module.exports = AssociateProduct;