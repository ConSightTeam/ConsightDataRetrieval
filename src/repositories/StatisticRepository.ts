import { Client, QueryResult } from 'pg'

export class StatisticRepository {
    private db: Client;

    public constructor() {
        this.reset();
    }

    public async getStatisticsPerDay(property: string, unit: string): Promise<Array<Statistic>> {
        await this.db.connect();
        let queryResult: QueryResult<Statistic> = await this.db.query(
            "SELECT \
                MAX(data.property) as maximum, MIN(data.property) as minimum, AVG(data.property) as average, data.unit as unit, data.inserted_on::date as inserted_on_date \
            FROM  \
                ( \
                    SELECT \
                        cast(split_part(data ->> $1, ' ', 1) as numeric) as property, split_part(data ->> $1, ' ', 2) as unit, inserted_on \
                    FROM \
                        data_point \
                    WHERE data ->> $1 IS NOT NULL \
                ) AS data \
            WHERE data.unit = $2 \
            GROUP BY data.unit, data.inserted_on::date \
            ORDER BY data.inserted_on::date DESC \
            LIMIT 100;", [property, unit]);
        await this.db.end();

        return queryResult.rows;
    }

    public async getStatisticsPerHour(property: string, unit: string): Promise<Array<Statistic>> {
        await this.db.connect();
        let queryResult: QueryResult<Statistic> = await this.db.query(
            "SELECT \
                MAX(data.property) as maximum, MIN(data.property) as minimum, AVG(data.property) as average, data.unit as unit, date_trunc('hour', data.inserted_on) as inserted_on_date \
            FROM  \
                ( \
                    SELECT \
                        cast(split_part(data ->> $1, ' ', 1) as numeric) as property, split_part(data ->> $1, ' ', 2) as unit, inserted_on \
                    FROM \
                        data_point \
                    WHERE data ->> $1 IS NOT NULL \
                ) AS data \
            WHERE data.unit = $2 \
            GROUP BY data.unit, date_trunc('hour', data.inserted_on) \
            ORDER BY date_trunc('hour', data.inserted_on) DESC \
            LIMIT 100;", [property, unit]);
        await this.db.end();

        return queryResult.rows;
    }

    public async getStatisticsPerMonth(property: string, unit: string): Promise<Array<Statistic>> {
        await this.db.connect();
        let queryResult: QueryResult<Statistic> = await this.db.query(
            "SELECT \
                MAX(data.property) as maximum, MIN(data.property) as minimum, AVG(data.property) as average, data.unit as unit, date_trunc('month', data.inserted_on) as inserted_on_date \
            FROM  \
                ( \
                    SELECT \
                        cast(split_part(data ->> $1, ' ', 1) as numeric) as property, split_part(data ->> $1, ' ', 2) as unit, inserted_on \
                    FROM \
                        data_point \
                    WHERE data ->> $1 IS NOT NULL \
                ) AS data \
            WHERE data.unit = $2 \
            GROUP BY data.unit, date_trunc('month', data.inserted_on) \
            ORDER BY date_trunc('month', data.inserted_on) DESC \
            LIMIT 100;", [property, unit]);
        await this.db.end();

        return queryResult.rows;
    }

    public async getStatisticsPerDayOnCertainMonth(property: string, unit: string, date: Date): Promise<Array<Statistic>> {
        await this.db.connect();
        let queryResult: QueryResult<Statistic> = await this.db.query(
            "SELECT \
                MAX(data.property) as maximum, MIN(data.property) as minimum, AVG(data.property) as average, data.unit as unit, data.inserted_on::date as inserted_on_date \
            FROM  \
                ( \
                    SELECT \
                        cast(split_part(data ->> $1, ' ', 1) as numeric) as property, split_part(data ->> $1, ' ', 2) as unit, inserted_on \
                    FROM \
                        data_point \
                    WHERE data ->> $1 IS NOT NULL \
                ) AS data \
            WHERE data.unit = $2 AND date_trunc('month', data.inserted_on::date) = date_trunc('month', $3::date) \
            GROUP BY data.unit, data.inserted_on::date \
            ORDER BY date_trunc('month', data.inserted_on::date) DESC;", [property, unit, date]);
        await this.db.end();

        return queryResult.rows;
    }

    public async getStatisticsPerHourOnCertainDay(property: string, unit: string, date: Date): Promise<Array<Statistic>> {
        await this.db.connect();
        let queryResult: QueryResult<Statistic> = await this.db.query(
            "SELECT \
                MAX(data.property) as maximum, MIN(data.property) as minimum, AVG(data.property) as average, data.unit as unit, date_trunc('hour', data.inserted_on) as inserted_on_date \
            FROM  \
                ( \
                    SELECT \
                        cast(split_part(data ->> $1, ' ', 1) as numeric) as property, split_part(data ->> $1, ' ', 2) as unit, inserted_on \
                    FROM \
                        data_point \
                    WHERE data ->> $1 IS NOT NULL \
                ) AS data \
            WHERE data.unit = $2 AND data.inserted_on::date = $3::date \
            GROUP BY data.unit, date_trunc('hour', data.inserted_on) \
            ORDER BY date_trunc('hour', data.inserted_on) DESC;", [property, unit, date]);
        await this.db.end();

        return queryResult.rows;
    }

    public async getStatisticsPerMonthOnCertainYear(property: string, unit: string, date: Date): Promise<Array<Statistic>> {
        await this.db.connect();
        let queryResult: QueryResult<Statistic> = await this.db.query(
            "SELECT \
                MAX(data.property) as maximum, MIN(data.property) as minimum, AVG(data.property) as average, date_trunc('month', data.inserted_on) as inserted_on_date \
            FROM  \
                ( \
                    SELECT \
                        cast(split_part(data ->> $1, ' ', 1) as numeric) as property, split_part(data ->> $1, ' ', 2) as unit, inserted_on \
                    FROM \
                        data_point \
                    WHERE data ->> $1 IS NOT NULL \
                ) AS data \
            WHERE data.unit = $2 AND date_trunc('year', data.inserted_on::date) = date_trunc('year', $3::date) \
            GROUP BY data.unit, date_trunc('month', data.inserted_on) \
            ORDER BY date_trunc('month', data.inserted_on) DESC;", [property, unit, date]);
        await this.db.end();

        return queryResult.rows;
    }


    public reset() {
        this.db = new Client();
    }
}