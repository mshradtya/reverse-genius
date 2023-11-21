import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface UsageLogsAttributes {
	loginId: string;
	clientUID: string;
	subscribtionUID: string;
	promptID: string;
}

export class UsageLogsInstance extends Model<UsageLogsAttributes> {
	declare loginId: string;
	declare clientUID: string;
	declare subscribtionUID: string;
	declare promptID: string;
}

UsageLogsInstance.init(
	{
		loginId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false
		},
		clientUID: {
			type: DataTypes.STRING,
			allowNull: false
		},
		subscribtionUID: {
			type: DataTypes.STRING,
			allowNull: false
		},
		promptID: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize: config.db,
		tableName: 'Usage logs'
	}
);
