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

const MAX_PER_PAGE = 10;
const pool = await sql.connect(settings);

export async function getCollectorsNew(page: number, text: string, id: string) {
  return getStuff(page, text, id, "tblCollectorsNoXml2", [
    "FirstName",
    "LastName",
  ]);
}

export async function getSpeakersNewer(page: number, text: string, id: string) {
  return getStuff(page, text, id, "tblSpeakersNoXml5", [
    "FullName",
    "LastName",
    "Gender",
    "Age",
    "BirthDate",
    "Occupation",
    "LanguageAbility",
    "Remark",
  ]);
}

export async function getTracksNewer(page: number, text: string, id: string) {
  return getStuff(page, text, id, "tblTracksNoXml2", [
    "Nickname",
    "CatalogueEntry",
    "RecordingDate",
  ]);
}

export async function getReelsNewer(page: number, text: string, id: string) {
  return getStuff(page, text, id, "tblReelsNoXml", [
    "Title",
    "RefID",
    "Date",
    "Note",
  ]);
}

async function getStuff(
  page: number,
  text: string,
  id: string,
  database: string,
  fields: string[]
) {
  const ps = new sql.PreparedStatement(pool);
  ps.input("offset", sql.Int);
  ps.input("maxPerPage", sql.Int);
  ps.input("text", sql.NVarChar(sql.MAX));
  ps.input("id", sql.Int);

  ps.output("hits", sql.Int);

  let queryText = `
  DECLARE @t as TABLE(ID int, ${fields.map(
    (field) => field + " nvarchar(max)"
  )});

  INSERT INTO @t (ID,${fields})
  SELECT ID, ${fields} FROM ${database}
  WHERE
  (@text IS NULL OR FullText like '%'+@text+'%') AND
  (@id IS NULL OR ID like @id)
  ;

  SELECT @hits=COUNT(*) FROM @t;
  SELECT * FROM @t
  ORDER BY ID
  OFFSET @offset ROWS
  FETCH NEXT @maxPerPage ROWS ONLY; 
  `;
  console.log(queryText);

  await ps.prepare(queryText);
  let executed: any = await ps.execute({
    offset: (page - 1) * MAX_PER_PAGE,
    maxPerPage: MAX_PER_PAGE,
    text: text || null,
    id: id || null,
  });
  await ps.unprepare();
  return {
    jsons: executed.recordset,
    hits: executed.output.hits,
  };
}
