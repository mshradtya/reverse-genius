import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface UsersAttributes {
	id: string;
	name: string;
	email: string;
	roleStatusId: string;
	role: string;
	password: string;
}

export class UsersInstance extends Model<UsersAttributes> {
	declare id: string;
	declare name: string;
	declare email: string;
	declare roleStatusId: string;
	declare role: string;
	declare password: string;
}

UsersInstance.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		roleStatusId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize: config.db,
		tableName: 'Users'
	}
);
