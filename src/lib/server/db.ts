import * as sql from "mssql";
import { DB_USER, DB_PASSWORD, DB_SERVER, DB_NAME } from "$env/static/private";
import { xml2js } from "xml-js";
import type { ElementCompact } from "xml-js";

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

export async function getSpeakerCount(text?: string, id?: string) {
  const ps = new sql.PreparedStatement(pool);

  let countText = `SELECT COUNT(ID) FROM dbo.tblSpeakers WHERE 1=1`;
  if (text) {
    countText += ` AND Details.value('(/speaker)[1]', 'nvarchar(max)') LIKE '%' + @text + '%'`;
    ps.input("text", sql.VarChar(sql.MAX));
  }
  if (id) {
    countText += ` AND ID like @id`;
    ps.input("id", sql.Int);
  }
  let queryText = countText;

  console.log("Query Text: " + queryText);
  await ps.prepare(queryText);
  let executed: any = await ps.execute({ text: text ?? "", id: id });
  await ps.unprepare();

  // TODO: I'd rather not use so many any's here
  let total = executed.recordsets[0][0][""];
  console.log("speakerCount:");
  console.log(executed.recordset[0][""]);
  return total;
}

export async function getSpeakers(page: number, text?: string, id?: string) {
  let offset = (page - 1) * MAX_PER_PAGE;
  console.log(`page: ${page}, text: ${text}, number: ${id}`);
  const ps = new sql.PreparedStatement(pool);

  let filterText = `SELECT * FROM dbo.tblSpeakers WHERE 1=1`;
  if (text) {
    filterText += ` AND NAME`;
    ps.input("text", sql.VarChar(sql.MAX));
  }
  if (id) {
    filterText += ` AND ID like @id`;
    ps.input("id", sql.Int);
  }
  filterText += ` ORDER BY ID OFFSET @offset ROWS FETCH NEXT @maxPerPage ROWS ONLY;`;
  let queryText = filterText;
  console.log(queryText);

  ps.input("offset", sql.Int);
  ps.input("maxPerPage", sql.Int);

  await ps.prepare(queryText);
  let executed: any = await ps.execute({
    offset: offset,
    maxPerPage: MAX_PER_PAGE,
    text: text ?? "",
    id: id ?? 0,
  });
  console.log("Executed: ");
  console.log(executed);
  await ps.unprepare();

  // TODO: I'd rather not use so many any's here
  let jsons = executed.recordset.map((xml: any) => toJson(xml.Details));
  return jsons;
}

export async function getTrackCount(
  text: string,
  id: string,
  speakerId?: string,
  collectorId?: string,
  reelId?: string,
  placeId?: string,
  nickname?: string
) {
  const ps = new sql.PreparedStatement(pool);

  let countText = `SELECT COUNT(ID) FROM dbo.tblTracks WHERE 1=1`;
  if (text) {
    countText += ` AND Details.value('(/track)[1]', 'nvarchar(max)') LIKE '%' + @text + '%'`;
    ps.input("text", sql.VarChar(sql.MAX));
  }
  if (id) {
    countText += ` AND ID like @id`;
    ps.input("id", sql.Int);
  }
  let queryText = countText;

  console.log("Query Text: " + queryText);
  await ps.prepare(queryText);
  let executed: any = await ps.execute({ text: text ?? "", id: id });
  await ps.unprepare();

  // TODO: I'd rather not use so many any's here
  let total = executed.recordsets[0][0][""];
  console.log("trackCount:");
  console.log(executed.recordset[0][""]);
  return total;
}

export async function getTracks(
  page: number,
  text: string,
  id: string,
  speakerId?: string,
  collectorId?: string,
  reelId?: string,
  placeId?: string,
  nickname?: string
) {
  let offset = (page - 1) * MAX_PER_PAGE;
  console.log(`page: ${page}, text: ${text}, number: ${id}`);
  const ps = new sql.PreparedStatement(pool);

  let filterText = `SELECT * FROM dbo.tblTracks WHERE 1=1`;
  if (text) {
    filterText += ` AND Details.value('(/track)[1]', 'nvarchar(max)') LIKE '%' + @text + '%'`;
    ps.input("text", sql.VarChar(sql.MAX));
  }
  if (id) {
    filterText += ` AND ID like @id`;
    ps.input("id", sql.Int);
  }
  filterText += ` ORDER BY ID OFFSET @offset ROWS FETCH NEXT @maxPerPage ROWS ONLY;`;
  let queryText = filterText;
  console.log(queryText);

  ps.input("offset", sql.Int);
  ps.input("maxPerPage", sql.Int);

  await ps.prepare(queryText);
  let executed: any = await ps.execute({
    offset: offset,
    maxPerPage: MAX_PER_PAGE,
    text: text ?? "",
    id: id ?? 0,
  });
  console.log("Executed: ");
  console.log(executed);
  await ps.unprepare();

  // TODO: I'd rather not use so many any's here
  let jsons = executed.recordset.map((xml: any) => toJson(xml.Details));
  return jsons;
}

export async function getReelCount(
  text?: string,
  id?: string,
  collectorId?: string
) {
  const ps = new sql.PreparedStatement(pool);

  let countText = `SELECT COUNT(ID) FROM dbo.tblSpools WHERE 1=1`;
  if (text) {
    countText += ` AND Details.value('(/spool)[1]', 'nvarchar(max)') LIKE '%' + @text + '%'`;
    ps.input("text", sql.VarChar(sql.MAX));
  }
  if (id) {
    countText += ` AND ID like @id`;
    ps.input("id", sql.Int);
  }

  if (collectorId) {
    countText += `AND Details.value('(/spool/collectors)[1]', 'nvarchar(max)') LIKE `;
  }
  let queryText = countText;

  console.log("Query Text: " + queryText);
  await ps.prepare(queryText);
  let executed: any = await ps.execute({ text: text ?? "", id: id });
  await ps.unprepare();

  // TODO: I'd rather not use so many any's here
  let total = executed.recordsets[0][0][""];
  console.log("spoolCount:");
  console.log(executed.recordset[0][""]);
  return total;
}

export async function getReels(
  page: number,
  id?: string,
  text?: string,
  collectorId?: string
) {
  let offset = (page - 1) * MAX_PER_PAGE;
  console.log(`page: ${page}, text: ${text}, number: ${id}`);
  const ps = new sql.PreparedStatement(pool);

  let filterText = `SELECT * FROM dbo.tblSpools WHERE 1=1`;

  if (text) {
    filterText += ` AND Details.value('(/spool)[1]', 'nvarchar(max)') LIKE '%' + @text + '%'`;
    ps.input("text", sql.VarChar(sql.MAX));
  }

  if (id) {
    filterText += ` AND ID like @id`;
    ps.input("id", sql.Int);
  }

  if (collectorId) {
    filterText += ` AND Details.exist('/spool/collectors/collector[@collectorID=sql:variable("@collectorId")]')=1`;
    ps.input("collectorId", sql.Int);
  }

  filterText += ` ORDER BY ID OFFSET @offset ROWS FETCH NEXT @maxPerPage ROWS ONLY;`;
  let queryText = filterText;
  console.log(queryText);

  ps.input("offset", sql.Int);
  ps.input("maxPerPage", sql.Int);

  await ps.prepare(queryText);
  let executed: any = await ps.execute({
    offset: offset,
    maxPerPage: MAX_PER_PAGE,
    text: text ?? "",
    id: id ?? 0,
    collectorId: collectorId,
  });
  console.log("Executed: ");
  console.log(executed);
  await ps.unprepare();

  // TODO: I'd rather not use so many any's here
  let jsons = executed.recordset.map((xml: any) => toJson(xml.Details));
  return jsons;
}

function toJson(xml: string) {
  return xml2js(xml, { compact: true, nativeType: true }) as ElementCompact;
}

export async function getCollectors(page: number, text: string, id: string) {
  return getPeople(page, text, id, "tblCollectorsNoXml2");
}

export async function getSpeakersNew(page: number, text: string, id: string) {
  const ps = new sql.PreparedStatement(pool);
  ps.input("offset", sql.Int);
  ps.input("maxPerPage", sql.Int);
  ps.input("text", sql.NVarChar(sql.MAX));
  ps.input("id", sql.Int);

  ps.output("hits", sql.Int);

  let queryText = `
  DECLARE @t as TABLE(ID int, FullName nvarchar(max), FirstName nvarchar(max), LastName nvarchar(max), Gender nvarchar(max), Age nvarchar(max), BirthDate nvarchar(max), Occupation nvarchar(max), LanguageAbility nvarchar(max), Remark nvarchar(max));

  INSERT INTO @t (ID, FullName, FirstName, LastName, Gender, Age, BirthDate, Occupation, LanguageAbility, Remark)
  SELECT ID, FullName, FirstName, LastName, Gender, Age, BirthDate, Occupation, LanguageAbility, Remark FROM tblSpeakersNoXml5
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

export async function getPeople(
  page: number,
  text: string,
  id: string,
  database: string
) {
  const ps = new sql.PreparedStatement(pool);
  ps.input("offset", sql.Int);
  ps.input("maxPerPage", sql.Int);
  ps.input("text", sql.NVarChar(sql.MAX));
  ps.input("id", sql.Int);

  ps.output("hits", sql.Int);

  let queryText = `
  DECLARE @t as TABLE(ID int, FirstName nvarchar(MAX), LastName nvarchar(MAX));

  INSERT INTO @t (ID, FirstName, LastName)
  SELECT ID, FirstName, LastName FROM ${database}
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

export async function getTracksNew(page: number, text: string, id: string) {
  const ps = new sql.PreparedStatement(pool);
  ps.input("offset", sql.Int);
  ps.input("maxPerPage", sql.Int);
  ps.input("text", sql.NVarChar(sql.MAX));
  ps.input("id", sql.Int);

  ps.output("hits", sql.Int);

  let queryText = `
  DECLARE @t as TABLE(ID int, Nickname nvarchar(max), CatalogueEntry nvarchar(max), RecordingDate nvarchar(max));

  INSERT INTO @t (ID, Nickname, CatalogueEntry, RecordingDate)
  SELECT ID, Nickname, CatalogueEntry, RecordingDate FROM tblTracksNoXml2
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

export async function getReelsNew(page: number, text: string, id: string) {
  const ps = new sql.PreparedStatement(pool);
  ps.input("offset", sql.Int);
  ps.input("maxPerPage", sql.Int);
  ps.input("text", sql.NVarChar(sql.MAX));
  ps.input("id", sql.Int);

  ps.output("hits", sql.Int);

  let queryText = `
  DECLARE @t as TABLE(ID int, Title nvarchar(max), RefID nvarchar(max), Date nvarchar(max), Note nvarchar(max));

  INSERT INTO @t (ID, Title, RefID, Date, Note)
  SELECT ID, Title, RefID, Date, Note FROM tblReelsNoXml
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
