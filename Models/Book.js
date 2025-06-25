import { DataTypes, Model } from 'sequelize';
import sequelize  from '../config/database.js';
import User from './User.js';

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    bookname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        'fiction',
        'non-fiction',
        'fantasy',
        'science',
        'history',
        'biography',
        'romance',
        'mystery',
        'horror',
        'self-help',
        'philosophy',
        'technology',
        'poetry',
        'comics'),
      allowNull: false,
      defaultValue: 'fiction'
},
    status: {
      type: DataTypes.ENUM('unread', 'reading', 'read'),
      allowNull: false,
      defaultValue: 'unread',
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 10,
      },
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    timestamps: true,
  }
);

// Relaciones
Book.belongsTo(User, { foreignKey: 'userId', as: 'user',onDelete:'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Book, { foreignKey: 'userId', as: 'books',onDelete:'CASCADE', onUpdate: 'CASCADE' });

export default  Book;