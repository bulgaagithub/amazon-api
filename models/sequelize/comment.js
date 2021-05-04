const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    bookId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'book',
        key: 'id'
      }
    },
    comment: {
      type: DataTypes.STRING(450),
      allowNull: false,
      validate: {
        len: {
            args: [10, 100],
            msg: 'Хамгийн багадаа 10 тэмдэгт байх ёстой.'
        },
        notContains: {
            args: ['миа'],
            msg: 'Хориглосон үг байна.'
        }
      },
      get() {
          let comment = this.getDataValue('comment').toLowerCase();
          return comment.charAt(0).toUpperCase() + comment.slice(1);
        // return this.getDataValue('comment').toUpperCase()
      },

      set(value) {
        this.setDataValue('comment', value.replace('миа', 'тиймэрхүү'));
      }
    }
  }, {
    sequelize,
    tableName: 'comment',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_comment_1",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "FK_comment_2",
        using: "BTREE",
        fields: [
          { name: "bookId" },
        ]
      },
    ]
  });
};
