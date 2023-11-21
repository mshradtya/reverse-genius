import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface ClientAttributes {
	promptId: string;
	feature: string;
	subFeature: string;
}

export class ClientInstance extends Model<ClientAttributes> {
	declare promptId: string;
	declare feature: string;
	declare subFeature: string;
}

ClientInstance.init(
	{
		promptId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false
		},
		feature: {
			type: DataTypes.STRING,
			allowNull: false
		},
		subFeature: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize: config.db,
		tableName: 'Prompt'
	}
);
