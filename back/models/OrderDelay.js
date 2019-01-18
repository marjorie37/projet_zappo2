/**
 *  Model OrderDelay
 * @param {*} sequelize
 * @param {*} DataTypes
 */
const OrderDelay = (sequelize, DataTypes) => {
    const OrderDelay = sequelize.define(
        "order_delay",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            time: {
                type: DataTypes.INTEGER,
            },
            state: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
        },
        {
            tableName: "order_delay",
            timestamps: false,
            underscored: true
        }
    );

    return OrderDelay;
};

module.exports = OrderDelay;