import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface RolesAttributes {
	rowId: string;
	name: string;
	roleStatusId: string;
}

export class RolesInstance extends Model<RolesAttributes> {
	declare rowId: string;
	declare name: string;
	declare roleStatusId: string;
}

RolesInstance.init(
	{
		rowId: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		roleStatusId: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize: config.db,
		tableName: 'Roles'
	}
);
