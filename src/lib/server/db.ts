import * as sql from "mssql"
import { DB_USER, DB_PASSWORD, DB_SERVER, DB_NAME } from "$env/static/private"
import { MAX_PER_PAGE } from "$lib/globals"
import { v4 as uuid } from "uuid"
import { Collector } from "$lib/types"

const settings: sql.config = {
  user: DB_USER,
  password: DB_PASSWORD,
  server: DB_SERVER,
  database: DB_NAME,
  options: {
    encrypt: false,
  },
}

const USER_TABLE = "tblTestUsers2"

const pool = await sql.connect(settings)

export async function logout(sessionId: string) {
  const ps = new sql.PreparedStatement(pool)
  ps.input("sessionId", sql.NVarChar(sql.MAX))
  let queryText = `
  UPDATE ${USER_TABLE}
  SET SessionID=null
  WHERE SessionID=@sessionId`
  await ps.prepare(queryText)
  await ps.execute({ sessionId })
  await ps.unprepare()
}

export async function validateSession(sessionId: string) {
  const ps = new sql.PreparedStatement(pool)
  ps.input("sessionId", sql.NVarChar(sql.MAX))
  ps.output("email", sql.NVarChar(sql.MAX))
  let queryText = `
  SELECT @email=Email FROM ${USER_TABLE}
  WHERE SessionID=@sessionId
  `
  console.log(queryText)
  await ps.prepare(queryText)
  let executed: any = await ps.execute({ sessionId: sessionId })
  await ps.unprepare()
  return executed.output.email
}

export async function validateCredentials(email: string, password: string) {
  const ps = new sql.PreparedStatement(pool)
  ps.input("email", sql.NVarChar(sql.MAX))
  ps.input("password", sql.VarChar(sql.MAX))
  ps.output("accepted", sql.Int)
  let queryText = `
  IF EXISTS(SELECT * FROM ${USER_TABLE} WHERE Email=@email AND PasswordHash=HASHBYTES('sha1', @password))
    SET @accepted=1
  ELSE
    SET @accepted=0
  `
  console.log(queryText)
  await ps.prepare(queryText)
  let executed: any = await ps.execute({ email: email, password: password })
  await ps.unprepare()

  console.log("accepted: " + executed.output.accepted)

  return executed.output.accepted
}

export async function testSession() {
  const id = await createSession("test")
  console.log(`created session for test, id: ${id}`)
}

export async function createSession(email: string) {
  const ps = new sql.PreparedStatement(pool)
  ps.input("email", sql.NVarChar(sql.MAX))
  ps.input("sessionId", sql.NVarChar(sql.MAX))
  const sessionId = uuid()
  console.log(`New session id: ${sessionId}`)
  let queryText = `
  UPDATE ${USER_TABLE}
  SET SessionID = @sessionId
  WHERE Email=@email;
  `
  console.log(queryText)
  console.log("0")
  await ps.prepare(queryText)
  console.log("1")
  let executed: any = await ps.execute({ email: email, sessionId: sessionId })
  console.log("2")
  await ps.unprepare()
  console.log("3")
  return sessionId
}

/* a Filter passed to the get function to narrow down the results shown */
interface Filter {
  join: string // an SQL Join command
  propName: string // the name of the input property to filter based on
  propValue: string // the value of the input property
  propType: any // the SQL type of the property
  condition: string // the condition to filter based on
}

/* an aggregated property for get to calculate */
interface Aggregate {
  name: string // the name of the aggregate
  join: string // an sql join command
  propName: string // the name of the property to be aggregated
  functionName: string // the aggregating function
}

export async function getCollectors(page: number, text: string, id: string) {
  return get(
    page,
    text,
    id,
    "tblCollectorsNoXml2",
    ["FirstName", "LastName"],
    [
      {
        name: "ReelCount",
        propName: "ReelID",
        join: "INNER JOIN tblReelCollector ON CollectorID = #base.ID",
        functionName: "COUNT",
      },
    ],
    []
  )
}

export async function getSpeakers(page: number, text: string, id: string) {
  return get(
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
        join: "LEFT JOIN tblTrackSpeaker ON SpeakerID = #base.ID",
        functionName: "COUNT",
      },
    ],
    []
  )
}

export async function getTracks(
  page: number,
  text: string,
  id: string,
  collectorId: string,
  speakerId: string,
  placeId: string,
  nickname: string,
  reelId: string
) {
  return get(
    page,
    text,
    id,
    "tblTracksNoXml2",
    ["Nickname", "CatalogueEntry", "RecordingDate"],
    [
      {
        name: "CollectorIDs",
        propName: "CollectorID, ','",
        join: `LEFT JOIN tblTrackReel ON tblTrackReel.TrackID = #base.ID\nINNER JOIN tblReelCollector ON tblReelCollector.ReelID = tblTrackReel.ReelID`,
        functionName: "STRING_AGG",
      },
      {
        name: "CollectorNames",
        propName: "tblCollectorsNoXml2.FullText, ','",
        join: "LEFT JOIN tblTrackReel ON tblTrackReel.TrackID = #base.ID\nINNER JOIN tblReelCollector ON tblReelCollector.ReelID = tblTrackReel.ReelID\nLEFT JOIN tblCollectorsNoXml2 ON tblReelCollector.CollectorID=tblCOllectorsNoXml2.ID",
        functionName: "STRING_AGG",
      },
      {
        name: "PlaceIDs",
        propName: "PlaceID, ','",
        join: "LEFT JOIN tblTrackPlace ON tblTrackPlace.TrackID=#base.ID",
        functionName: "STRING_AGG",
      },
      {
        name: "PlaceNames",
        propName: "tblPlaceNames.Text, ','",
        join: "LEFT JOIN tblTrackPlace ON tblTrackPlace.TrackID=#base.ID\nLEFT JOIN tblPlaceNames on tblTrackPlace.PlaceID=tblPlaceNames.PlaceID AND LangID=2",
        functionName: "STRING_AGG",
      },
      {
        name: "ReelID",
        propName: "tblTrackReel.ReelID, ','",
        join: "LEFT JOIN tblTrackReel ON tblTrackReel.TrackID = #base.ID",
        functionName: "STRING_AGG",
      },
      {
        name: "ReelTitle",
        propName: "tblReelsNoXml.Title, ','",
        join: "LEFT JOIN tblTrackReel ON tblTrackReel.TrackID = #base.ID\nLEFT JOIN tblReelsNoXml ON tblTrackReel.ReelID=tblReelsNoXml.ID",
        functionName: "STRING_AGG",
      },
      {
        name: "SpeakerIDs",
        propName: "tblTrackSpeaker.SpeakerID, ','",
        join: "LEFT JOIN tblTrackSpeaker ON tblTrackSpeaker.TrackID=#base.ID",
        functionName: "STRING_AGG",
      },
      {
        name: "SpeakerNames",
        propName: "tblSpeakersNoXml5.FullName, ','",
        join: "LEFT JOIN tblTrackSpeaker ON tblTrackSpeaker.TrackID=#base.ID\nLEFT JOIN tblSpeakersNoXml5 ON tblTrackSpeaker.SpeakerID=tblSpeakersNoXml5.ID",
        functionName: "STRING_AGG",
      },
    ],
    [
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
        join: `INNER JOIN tblTrackReel ON tblTrackReel.TrackID = tblTracksNoXml2.ID\nINNER JOIN tblReelCollector ON tblReelCollector.ReelID = tblTrackReel.ReelID`,
        propName: "collectorID",
        propValue: collectorId,
        propType: sql.Int,
        condition: "AND (@collectorID IS NULL OR CollectorID=@collectorID)",
      },
      {
        join: `INNER JOIN tblTrackReel ON tblTrackReel.TrackID  = tblTracksNoXml2.ID`,
        propName: "reelID",
        propValue: reelId,
        propType: sql.Int,
        condition: "AND (@reelID IS NULL or tblTrackReel.ReelID=@reelID)",
      },
    ]
  )
}

export async function getTracksWithoutSound(
  page: number,
  text: string,
  id: string,
  collectorId: string,
  speakerId: string,
  placeId: string,
  nickname: string,
  reelId: string
) {
  return getTracks(
    page,
    text,
    id,
    collectorId,
    speakerId,
    placeId,
    nickname,
    reelId
  )
}

export async function getReels(
  page: number,
  text: string,
  id: string,
  collectorId: string
) {
  return get(
    page,
    text,
    id,
    "tblReelsNoXml",
    ["Title", "RefID", "Date", "Note"],
    [
      {
        name: "CollectorIDs",
        join: "LEFT JOIN tblReelCollector ON #base.ID=tblReelCollector.ReelID",
        propName: "CollectorID, ','",
        functionName: "STRING_AGG",
      },
      {
        name: "CollectorNames",
        join: "LEFT JOIN tblReelCollector ON #base.ID=tblReelCollector.ReelID\nLEFT JOIN tblCollectorsNoXml2 ON CollectorID= tblCollectorsNoXml2.ID",
        propName: "tblCollectorsNoXml2.FullText, ','",
        functionName: "STRING_AGG",
      },
    ],
    [
      {
        join: "LEFT JOIN tblReelCollector ON tblReelsNoXml.ID=tblReelCollector.ReelID",
        propName: "collectorID",
        propValue: collectorId,
        propType: sql.Int,
        condition:
          "AND (@collectorID is NULL OR tblReelCollector.CollectorID = @collectorID)",
      },
    ]
  )
}

/*
 * gets records from the database, this function is *only* called by the
 * exported functions above, it's never called directly, and any of the string
 * insertions done here are replacing constants for the sake of convenience,
 * never inserting user input.
 * User input is handled using PreparedStatement.input()
 */
async function get(
  page: number,
  text: string,
  id: string,
  table: string,
  fields: string[],
  aggregates: Aggregate[],
  filters: Filter[]
) {
  const ps = new sql.PreparedStatement(pool)
  ps.input("offset", sql.Int)
  ps.input("maxPerPage", sql.Int)
  ps.input("text", sql.NVarChar(sql.MAX))
  ps.input("id", sql.Int)

  filters.forEach((f) => ps.input(f.propName, f.propType))

  ps.output("hits", sql.Int)

  let queryText = `
  ${
    /*Create a base group of filtered results in the temporary table #base */ ""
  }
  SELECT ${table}.ID, ${fields} INTO #base
  FROM ${table} 
  ${filters.map((f) => (f.propValue ? f.join : "")).join("\n")}
  WHERE
  (@text IS NULL OR ${table}.FullText like '%'+@text+'%')
  AND (@id IS NULL OR ${table}.ID like @id)
  ${filters.map((f) => (f.propValue ? f.condition : "")).join("\n")}
  ;

  ${/*Process any data that needs to be aggregated*/ ""}
  ${
    "WITH " +
    aggregates
      .map((a) => {
        return `agg_${a.name} AS (
          SELECT #base.ID, ${a.functionName}(${a.propName}) AS ${a.name}
          FROM #base
          ${a.join}
          GROUP BY #base.ID
          )`
      })
      .join(",\n")
  }
  
  SELECT #base.ID, ${fields}, ${aggregates.map((a) => a.name)} 
  FROM #base
  ${
    // Join the previously aggregated data
    aggregates
      .map((a) => `JOIN agg_${a.name} ON agg_${a.name}.ID = #base.ID`)
      .join("\n")
  }

  ORDER BY #base.ID
  OFFSET @offset ROWS
  FETCH NEXT @maxPerPage ROWS ONLY;
  SELECT @hits=COUNT(*) FROM #base
  `
  console.log(queryText)

  let props: any = {
    offset: (page - 1) * MAX_PER_PAGE,
    maxPerPage: MAX_PER_PAGE,
    text: text || null,
    id: id || null,
  }

  filters.forEach((f) => {
    props[f.propName] = f.propValue || null
  })

  await ps.prepare(queryText)
  let executed: any = await ps.execute(props)
  await ps.unprepare()
  return {
    jsons: executed.recordset,
    hits: executed.output.hits,
  }
}
