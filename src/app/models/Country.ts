import { Model, Table, Column, UpdatedAt, CreatedAt, ForeignKey, BelongsTo, DataType, HasMany, PrimaryKey } from 'sequelize-typescript';
import { User } from 'app/models';

@Table({
    timestamps: true,
    tableName: "countries",
})
class Country extends Model<Country> {

    @Column({type: DataType.STRING({length: 3}), primaryKey: true})
    country_code: string

    @Column(DataType.STRING({length: 150}))
    country_name: string

    @Column
    dial_code: number

    @Column(DataType.STRING({length: 20}))
    currency_name: string
    
    @Column(DataType.STRING({length: 20}))
    currency_symbol: string

    @Column(DataType.STRING({length: 20}))
    currency_code: string

    @Column(DataType.STRING({length: 10}))
    country_status: string

    @CreatedAt
    created_at: Date;
 
    @UpdatedAt
    @Column({allowNull: true})
    updated_at: Date;

    @HasMany(()=> User, 'country_code')
    users: User[]
}

export default Country;