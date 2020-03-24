import { Client } from 'pg'

export class DataPointRepository {
    db: Client

    constructor() {
        this.db = new Client();
    }

    async getLatest(): Promise<Array<DataPoint>> {
        await this.db.connect();
        let queryResult = await this.db.query(
            'SELECT data_point.id, ST_ASGeoJson(data_point.location) AS location, data_point.data, data_point.node, data_point.inserted_on, node.name as node_name \
            FROM data_point, node GROUP BY (data_point.node, data_point.id, node.name) ORDER BY data_point.inserted_on DESC LIMIT 1;'
        );
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