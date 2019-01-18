const { dateToLocale, localeToDate } = require('../lib/parseDate');
/**
 *  Model Timing_Exception
 * @param {*} sequelize
 * @param {*} DataTypes
 */
const TimingException = (sequelize, DataTypes) => {
    const Timing_Exception = sequelize.define(
        "timing_exception",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            start_day: {
                type: DataTypes.DATE,
                notEmpty: true,
                get() {
                    return dateToLocale(this.getDataValue('start_day'));
                },
                set(val) {
                    this.setDataValue('start_day', localeToDate(val));
                }
            },
            end_day: {
                type: DataTypes.DATE,
                defaultValue:null,
                get() {
                    return dateToLocale(this.getDataValue('end_day'));
                },
                set(val) {
                    this.setDataValue('end_day', localeToDate(val));
                }
            },
            shift_lunch: {
                type: DataTypes.BOOLEAN,
                defaultValue:false
            },
            shift_dinner: {
                type: DataTypes.BOOLEAN,
                defaultValue:false
            }
        },
        {
            tableName: "timing_exception",
            timestamps: false,
            underscored: true
        }
    );

    return Timing_Exception;
};

module.exports = TimingException;
