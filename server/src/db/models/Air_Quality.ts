import {DataTypes} from 'sequelize';
import sequelize from '../config';

export type airQualityAttributes = {
  id?: number;
  daerah?: string;
  value?: number;
  tingkat?: string;
  created_at?: Date;
  updated_at?: Date;
};

const Air_Quality = sequelize.define(
  'Air_Quality',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    daerah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tingkat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Air_Quality',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default Air_Quality;
