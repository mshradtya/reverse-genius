import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface ClientAttributes {
	id: string;
	name: string;
	email: string;
}

export class ClientInstance extends Model<ClientAttributes> {
	declare id: string;
	declare name: string;
	declare email: string;
}

ClientInstance.init(
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
		}
	},
	{
		sequelize: config.db,
		tableName: 'Client'
	}
);
