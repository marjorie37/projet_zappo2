
 /*  Model Allergens
 * @param {*} sequelize
 * @param {*} DataTypes
 */
const Allergens = (sequelize, DataTypes) => {
    const Allergens = sequelize.define(
        "allergens",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(100),
                notEmpty:true
            }
        },
        {
            tableName: "allergens",
            timestamps: false,
            underscored: true
        }
    );

    return Allergens;
};

module.exports = Allergens;

