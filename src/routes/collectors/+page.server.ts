import * as sql from 'mssql'; 
import 'xml-js';
import { DB_NAME, DB_USER, DB_PASSWORD, DB_SERVER } from '$env/static/private';
import { xml2js , xml2json, type ElementCompact} from 'xml-js';
import { Speaker } from '$lib/types';

const settings: sql.config = {
    user: DB_USER,
    password: DB_PASSWORD,
    server: DB_SERVER,
    database: DB_NAME,
    options: {
        encrypt: false
    }
}

async function get(table: string) {
    let xmls: string[] = [];
        try {
            let poolConnection = await sql.connect(settings);
            let response = await poolConnection.request().query(`Select * FROM ${table}`);
            response.recordset.forEach(element => {
                xmls.push(element.Details);
            });
        } catch (err: any) {
            console.error(err.message);
        }
        return xmls;
}

async function getCollectorsXml() {
    return await get('dbo.tblFCollectors');
}

async function getSpeakersXml() {
    return await get('dbo.tblFSpeakers');
}

async function getReelsXml() {
    return await get('dbo.tblFSpools');
}

async function getTracksXml() {
    return await get('dbo.tblFTracks');
}

function toJson(xml: string) {
    return xml2js(xml, {compact: true, nativeType: true}) as ElementCompact;
}

export async function load() {
    let collectorsXml = await getCollectorsXml();
    let collectorsJson: ElementCompact[] = collectorsXml.map(xml => toJson(xml));
    console.log("Server xml: " + collectorsXml);
    console.log(collectorsJson);
    return {
        collectorsJson: collectorsJson
    }
}
