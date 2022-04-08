'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function list(tableName: string): Promise<any> {
    const params = {
        TableName: tableName
    };

    return await listParams(params);
}

export async function listParams(params: any): Promise<any> {
    const data = await dynamoDB.scan(params).promise();
    return data.Items;
}

export async function update(tableName: string, data: any): Promise<void> {
    const params = {
        TableName: tableName,
        Item: data,
    };

    await dynamoDB.put(params).promise();
}
