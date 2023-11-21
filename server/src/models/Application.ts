import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface ApplicationAttributes {
	applicationId: string;
	name: string;
	path: string;
	clientId: string;
}

export class ApplicationInstance extends Model<ApplicationAttributes> {
	declare applicationId: string;
	declare name: string;
	declare path: string;
	declare clientId: string;
}

ApplicationInstance.init(
	{
		applicationId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false
		},
		clientId: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize: config.db,
		tableName: 'Applications'
	}
);
