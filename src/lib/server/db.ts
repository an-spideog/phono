import * as sql from 'mssql';
import { DB_USER, DB_PASSWORD, DB_SERVER, DB_NAME } from '$env/static/private';
import { xml2js } from 'xml-js';
import type { ElementCompact } from 'xml-js';

const settings: sql.config = {
    user: DB_USER,
    password: DB_PASSWORD,
    server: DB_SERVER,
    database: DB_NAME,
    options: {
        encrypt: false
    }
}

async function get(table: string, where?: string, page?: number) {
    let xmls: string[] = [];
        try {
            let poolConnection = await sql.connect(settings);
            let response = await poolConnection.request().query(`
                SELECT * FROM ${table} ${where ? `WHERE ${where}` : ``}
                ORDER BY ID OFFSET ${( (page??1)-1 ) * (MAX_PER_PAGE)} ROWS 
                FETCH NEXT ${MAX_PER_PAGE} ROWS ONLY
            `);
            console.log(`
                SELECT * FROM ${table} ${where ? `WHERE ${where}` : ``}
                ORDER BY ID OFFSET ${( (page??1)-1 ) * (MAX_PER_PAGE)} ROWS 
                FETCH NEXT ${MAX_PER_PAGE} ROWS ONLY
            `);
            xmls = response.recordset.map(x => x.Details);
            return xmls.map(xml => toJson(xml));
        } catch (err: any) {
            console.error(err.message);
            return null;
        }
}

const MAX_PER_PAGE = 10;

export async function getCollectorsJson(id?: number, text?: string, page?: number) {
    if (id && text) {
        return await get('dbo.tblFCollectors', `ID=${id} AND Details.value('(/collector/name)[1]', 'nvarchar(max)') LIKE '%${text}%'`, page)
    }

    if (text) {
        return await get('dbo.tblFCollectors', `Details.value('(/collector/name)[1]', 'nvarchar(max)') LIKE '%${text}%'`, page)
    }

    if (id) {
        return await get('dbo.tblFCollectors', `ID=${id}`, page);
    }

    return await get('dbo.tblFCollectors', undefined, page);
}

export async function getSpeakersJson() {
    return await get('dbo.tblFSpeakers');
}

export async function getReelsJson() {
    return await get('dbo.tblFSpools');
}

export async function getTracksJson() {
    return await get('dbo.tblFTracks');
}

function toJson(xml: string) {
    return xml2js(xml, {compact: true, nativeType: true}) as ElementCompact;
}