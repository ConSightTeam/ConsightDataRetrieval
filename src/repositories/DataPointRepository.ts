import { query } from "../helper/db";
import { QueryResult } from 'pg'

export class DataPointRepository {
    public async getLatest(): Promise<Array<DataPoint>> {
        let queryResult = await query(
            'SELECT DISTINCT ON (data_point.node) \
            data_point.id, ST_ASGeoJson(data_point.location) AS location, data_point.data, data_point.node, data_point.inserted_on, node.name AS node_name, public.user.username as owner \
            FROM   data_point, node, public.user \
            WHERE  data_point.node = node.uuid AND node.owner = public.user.id \
            ORDER  BY node, inserted_on DESC, id;'
        );
        return this.queryResultToDataPoint(queryResult);
    }

    public async getFromSpecificTime(from: Date, to: Date): Promise<Array<DataPoint>> {
        let queryResult = await query(
            'SELECT DISTINCT ON (data_point.node)\
            data_point.id, ST_ASGeoJson(data_point.location) AS location, data_point.data, data_point.node, data_point.inserted_on, node.name AS node_name, public.user.username as owner \
            FROM   data_point, node, public.user \
            WHERE  data_point.node = node.uuid AND node.owner = public.user.id AND data_point.inserted_on >= $1 AND data_point.inserted_on <= $2 \
            ORDER  BY node, inserted_on DESC, id;', [from, to]
        );
        return this.queryResultToDataPoint(queryResult);
    }

    private queryResultToDataPoint(queryResult: QueryResult<any>) {
        let result: Array<DataPoint> = [];
        queryResult.rows.forEach(element => {
            let location: Geometry = JSON.parse(element.location) as Geometry;
            element.location = location;
            result.push(element as DataPoint)
        });
        return result;
    }
}