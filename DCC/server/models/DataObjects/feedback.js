var SequelizeDatatypes = require('sequelize');

module.exports=
{
    comment: {
        type: SequelizeDatatypes.TEXT,
        allowNull: true
    },
    rating: {
        type: SequelizeDatatypes.INTEGER,
        allowNull: true
    },
    commentedBy:{
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    },
    classId:{
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    },
}
