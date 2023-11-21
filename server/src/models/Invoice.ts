import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface ClientAttributes {
	invoiceId: string;
	clientId: string;
}

export class ClientInstance extends Model<ClientAttributes> {
	declare invoiceId: string;
	declare clientId: string;
}

ClientInstance.init(
	{
		invoiceId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false
		},
		clientId: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize: config.db,
		tableName: 'Invoices'
	}
);
