const {timeToLocale} = require('../lib/parseDate');
/**
 *  Model Timing
 * @param {*} sequelize
 * @param {*} DataTypes
 */
const Timing = (sequelize, DataTypes) => {
    const Timing = sequelize.define(
        "timing",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            day: {
                type: DataTypes.STRING(50),
                notEmpty: true,
                validate: {
                    len: {
                        args: 5,
                        msg: "Day must be at least 5 characters in length"
                    }
                }
            },
            shift_lunch: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            shift_dinner: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            lunch_start_time: {
                type: DataTypes.TIME,
                get() {
                    return timeToLocale(this.getDataValue('lunch_start_time'));
                }
            },
            lunch_end_time: {
                type: DataTypes.TIME,
                get() {
                    return timeToLocale(this.getDataValue('lunch_end_time'));
                }
            },
            dinner_start_time: {
                type: DataTypes.TIME,
                get() {
                    return timeToLocale(this.getDataValue('dinner_start_time'));
                }
            },
            dinner_end_time: {
                type: DataTypes.TIME,
                get() {
                    return timeToLocale(this.getDataValue('dinner_end_time'));
                }
            },
        },
        {
            tableName: "timing",
            timestamps: false,
            underscored: true
        }
    );

    return Timing;
};

module.exports = Timing;
