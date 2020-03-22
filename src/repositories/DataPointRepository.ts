import { Client } from 'pg'

export class DataPointRepository {
    db: Client

    constructor() {
        this.db = new Client();
    }

    async getLatest(): Promise<Array<DataPoint>> {
        await this.db.connect();
        let queryResult = await this.db.query('SELECT id, ST_ASGeoJson(location) AS location, data, node, inserted_on FROM data_point GROUP BY (node, id) ORDER BY inserted_on DESC LIMIT 1;');
        await this.db.end();
        let result: Array<DataPoint> = [];
        queryResult.rows.forEach(element => {
            let location: Geometry = JSON.parse(element.location) as Geometry;
            element.location = location;
            result.push(element as DataPoint)
        });
        return result;
    }
}