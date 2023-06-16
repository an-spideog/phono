import * as sql from "mssql";
import { DB_USER, DB_PASSWORD, DB_SERVER, DB_NAME } from "$env/static/private";

const settings: sql.config = {
  user: DB_USER,
  password: DB_PASSWORD,
  server: DB_SERVER,
  database: DB_NAME,
  options: {
    encrypt: false,
  },
};

export const MAX_PER_PAGE = 10;
const pool = await sql.connect(settings);

export async function getCollectorsNew(page: number, text: string, id: string) {
  return getStuff(
    page,
    text,
    id,
    "tblCollectorsNoXml2",
    ["FirstName", "LastName"],
    [
      {
        name: "ReelCount",
        propName: "ReelID",
        join: "INNER JOIN tblReelCollector ON CollectorID = tblCollectorsNoXml2.ID",
        functionName: "COUNT",
      },
    ],
    []
  );
}

export async function getSpeakersNewer(page: number, text: string, id: string) {
  return getStuff(
    page,
    text,
    id,
    "tblSpeakersNoXml5",
    [
      "FullName",
      "LastName",
      "Gender",
      "Age",
      "BirthDate",
      "Occupation",
      "LanguageAbility",
      "Remark",
    ],
    [
      {
        name: "TrackCount",
        propName: "TrackID",
        join: "INNER JOIN tblTrackSpeaker ON SpeakerID = tblSpeakersNoXml5.ID",
        functionName: "COUNT",
      },
    ],
    []
  );
}

interface Filter {
  join: string;
  propName: string;
  propValue: string;
  propType: any;
  condition: string;
}

interface Aggregate {
  name: string;
  join: string;
  propName: string;
  functionName: string;
}

let exampleFilter: Filter = {
  join: "INNER JOIN tblTrackCollector ON tblTracksNoXml2.ID=tblTrackCollector.TrackID",
  propName: "collectorID",
  propValue: "1",
  propType: sql.Int,
  condition:
    "AND (@collectorID IS NULL OR tblTrackCollector.CollectorID = @collectorID)",
};

export async function getTracksNewer(
  page: number,
  text: string,
  id: string,
  collectorId: string,
  speakerId: string,
  placeId: string,
  nickname: string
) {
  return getStuff(
    page,
    text,
    id,
    "tblTracksNoXml2",
    ["Nickname", "CatalogueEntry", "RecordingDate"],
    [
      {
        name: "CollectorIDs",
        propName: "CollectorID, ','",
        join: `INNER JOIN tblTrackSpool ON tblTrackSpool.TrackID = tblTracksNoXml2.ID\nINNER JOIN tblSpoolCollector ON tblSpoolCollector.SpoolID = tblTrackSpool.SpoolID`,
        functionName: "STRING_AGG",
      },
    ],
    [
      /* This filter doesn't work currently, due to the problems with tblTrackCollector
      {
        join: "INNER JOIN tblTrackCollector ON tblTracksNoXml2.ID=tblTrackCollector.TrackID",
        propName: "collectorID",
        propValue: collectorId,
        propType: sql.Int,
        condition:
          "AND (@collectorID IS NULL OR tblTrackCollector.CollectorID = @collectorID)",
      },
      */
      {
        join: "INNER JOIN tblTrackSpeaker ON tblTracksNoXml2.ID=tblTrackSpeaker.TrackID",
        propName: "speakerID",
        propValue: speakerId,
        propType: sql.Int,
        condition:
          "AND (@speakerID IS NULL OR tblTrackSpeaker.SpeakerID = @speakerID)",
      },
      {
        join: "INNER JOIN tblTrackPlace ON tblTracksNoXml2.ID=tblTrackPlace.TrackID",
        propName: "placeID",
        propValue: placeId,
        propType: sql.Int,
        condition: "AND (@placeID IS NULL OR tblTrackPlace.PlaceID = @placeID)",
      },
      {
        join: "",
        propName: "nickname",
        propValue: nickname,
        propType: sql.NVarChar(sql.MAX),
        condition: "AND (@nickname IS NULL OR nickname LIKE @nickname)",
      },
      {
        join: `INNER JOIN tblTrackSpool ON tblTrackSpool.TrackID = tblTracksNoXml2.ID\nINNER JOIN tblSpoolCollector ON tblSpoolCollector.SpoolID = tblTrackSpool.SpoolID`,
        propName: "collectorID",
        propValue: collectorId,
        propType: sql.Int,
        condition: "AND (@collectorID IS NULL OR CollectorID=@collectorID)",
      },
    ]
  );
}

export async function getReelsNewer(
  page: number,
  text: string,
  id: string,
  collectorId: string
) {
  return getStuff(
    page,
    text,
    id,
    "tblReelsNoXml",
    ["Title", "RefID", "Date", "Note"],
    [
      {
        name: "CollectorIDs",
        join: "INNER JOIN tblReelCollector ON tblReelsNoXml.ID=tblReelCollector.ReelID",
        propName: "CollectorID, ','",
        functionName: "STRING_AGG",
      },
    ],
    [
      {
        join: "INNER JOIN tblReelCollector ON tblReelsNoXml.ID=tblReelCollector.ReelID",
        propName: "collectorID",
        propValue: collectorId,
        propType: sql.Int,
        condition:
          "AND (@collectorID is NULL OR tblReelCollector.CollectorID = @collectorID)",
      },
    ]
  );
}

async function getStuff(
  page: number,
  text: string,
  id: string,
  table: string,
  fields: string[],
  aggregates: Aggregate[],
  filters: Filter[]
) {
  const ps = new sql.PreparedStatement(pool);
  ps.input("offset", sql.Int);
  ps.input("maxPerPage", sql.Int);
  ps.input("text", sql.NVarChar(sql.MAX));
  ps.input("id", sql.Int);

  filters.forEach((f) => {
    ps.input(f.propName, f.propType);
  });

  ps.output("hits", sql.Int);

  let queryText = `
  DECLARE @t as TABLE(ID int, ${fields
    .map((field) => field + " nvarchar(max)")
    .concat(aggregates.map((agg) => agg.name + " nvarchar(max)"))});

  INSERT INTO @t (ID,${fields.concat(aggregates.map((agg) => agg.name))})
  SELECT DISTINCT ${table}.ID, ${fields.concat(
    aggregates.map((agg) => `${agg.functionName}(${agg.propName})`)
  )} FROM ${table}
  ${filters.map((f) => (f.propValue ? f.join : "")).join("\n")}
  ${aggregates.map((agg) => agg.join).join("\n")}
  WHERE
  (@text IS NULL OR FullText like '%'+@text+'%') AND
  (@id IS NULL OR ${table}.ID like @id)
  ${filters.map((f) => (f.propValue ? f.condition : "")).join("\n")}
  GROUP BY ${table}.ID, ${fields}
  ;

  SELECT @hits=COUNT(*) FROM @t;
  SELECT * FROM @t
  ORDER BY ID
  OFFSET @offset ROWS
  FETCH NEXT @maxPerPage ROWS ONLY; 
  `;
  console.log(queryText);

  let props: any = {
    offset: (page - 1) * MAX_PER_PAGE,
    maxPerPage: MAX_PER_PAGE,
    text: text || null,
    id: id || null,
  };

  filters.forEach((f) => {
    props[f.propName] = f.propValue || null;
  });

  await ps.prepare(queryText);
  let executed: any = await ps.execute(props);
  await ps.unprepare();
  return {
    jsons: executed.recordset,
    hits: executed.output.hits,
  };
}

/*export function mergeRecords(r1: any, r2: any) {
  let r3: any = {};
  for (let key in r1) {
    if (r1[key] == r2[key]) {
      r3[key] = r1[key];
    } else if (Array.isArray(r1[key])) {
      r3[key] = [...r1[key], r2[key]];
    } else {
      r3[key] = [r1[key], r2[key]];
    }
  }
  return r3;
}

export function mergeAllRecords(records) {
  let lastRecord = records[0];
  let newRecords = [];
  for (let record of records) {
    if (record.ID == lastRecord.ID) {
      lastRecord = mergeRecords(record, lastRecord);
    } else {
      console.log(`record.ID: ${record.ID}, lastRecord.ID: ${lastRecord.ID}`);
      newRecords.push(lastRecord);
      lastRecord = record;
    }
  }
  //newRecords.push(lastRecord);
  return newRecords;
}

*/
