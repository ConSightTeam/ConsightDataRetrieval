import { Client, QueryResult } from 'pg'

export class StatisticRepository {
    private db: Client;

    public constructor() {
        this.reset();
    }

    public async getStatisticFromSpecificDate(property: string, unit: string, date: Date): Promise<Statistic> {
        await this.db.connect();
        let queryResult = await this.db.query(
            "SELECT \
                MAX(data.property) as maximum, MIN(data.property) as minimum, AVG(data.property) as average, data.unit as unit, inserted_on::date as inserted_on_date \
            FROM  \
                ( \
                    SELECT \
                        cast(split_part(data ->> $1, ' ', 1) as integer) as property, split_part(data ->> $1, ' ', 2) as unit, inserted_on \
                    FROM \
                        data_point \
                    WHERE data ->> $1 IS NOT NULL AND inserted_on::date = $3 \
                ) AS data \
            WHERE data.unit = $2 \
            GROUP BY data.unit, data.inserted_on::date;", [property, unit, date]);
        await this.db.end();

        return queryResult.rows[0] as Statistic;
    };

    public reset() {
        this.db = new Client();
    }
}