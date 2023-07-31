import * as sql from "mssql"
import { DB_USER, DB_PASSWORD, DB_SERVER, DB_NAME } from "$env/static/private"
import { MAX_PER_PAGE } from "$lib/globals"
import { v4 as uuid } from "uuid"

const timeout = 120_000_000
const settings: sql.config = {
  user: DB_USER,
  password: DB_PASSWORD,
  server: DB_SERVER,
  database: DB_NAME,
  options: {
    encrypt: false,
  },
  requestTimeout: 100000,
  connectionTimeout: 100000,
  pool: {
    max: 1000,
    min: 1,
    idleTimeoutMillis: timeout,
    acquireTimeoutMillis: timeout,
    createTimeoutMillis: timeout,
    destroyTimeoutMillis: timeout,
    reapIntervalMillis: timeout,
    createRetryIntervalMillis: timeout,
  },
}

const USER_TABLE = "tblTestUsers3"

const pool = await sql.connect(settings)

export async function changePassword(
  userId: number,
  currentPassword: string,
  newPassword: string
) {
  const ps = new sql.PreparedStatement(pool)
  ps.input("userId", sql.Int)
  ps.input("currentPassword", sql.VarChar(sql.MAX))
  ps.input("newPassword", sql.VarChar(sql.MAX))
  await ps.prepare(`
    UPDATE ${USER_TABLE}
    SET PasswordHash=HASHBYTES('sha1', @newPassword)
    WHERE @userId=ID AND HASHBYTES('sha1', @currentPassword)=PasswordHash;
  `)
  let request = await ps.execute({ userId, currentPassword, newPassword })
  console.log(
    "\nuserID:",
    userId,
    "\ncurrentPassword:",
    currentPassword,
    "\nnewPassword:",
    newPassword
  )
  if (!request.rowsAffected[0]) {
    console.log("Rows Affected", request.rowsAffected)
    throw new Error("incorrect password")
  } else {
    console.log("Rows Affected", request.rowsAffected)
  }
  await ps.unprepare()
}

export async function renewTrackForUser(trackId: number, userId: number) {
  const ps = new sql.PreparedStatement(pool)
  ps.input("userId", sql.Int)
  ps.input("trackId", sql.Int)
  await ps.prepare(`
    UPDATE tblTrackUser
    SET AccessGranted=SYSDATETIME()
    WHERE UserID=@userId AND TrackID=@trackId;
  `)
  await ps.execute({ userId, trackId })
  await ps.unprepare()
}

export async function removeTrackFromUser(trackId: number, userId: number) {
  const ps = new sql.PreparedStatement(pool)
  ps.input("userId", sql.Int)
  ps.input("trackId", sql.Int)
  await ps.prepare(`
    DELETE FROM tblTrackUser
    WHERE TrackID=@trackId AND UserID=@userId;
  `)
  await ps.execute({ userId, trackId })
  await ps.unprepare()
}

export async function addTracksToUser(trackIds: string[], userId: number) {
  const ps = new sql.PreparedStatement(pool)
  ps.input("userId", sql.Int)
  let props: any = { userId }
  trackIds.forEach((t, index) => {
    ps.input(`track${index}`, sql.Int)
    props[`track${index}`] = t
  })

  ps.input("trackId", sql.Int)
  let queryText = `
    INSERT INTO tblTrackUser (TrackID, UserID, AccessGranted)
    VALUES 
    ${trackIds.map((t, index) => `(@track${index}, @userId, SYSDATETIME())`)};
  `
  console.log(queryText)
  console.log(props)

  await ps.prepare(queryText)
  await ps.execute(props)
  await ps.unprepare()
}

export async function createUser(
  email: string,
  password: string,
  isAdmin: boolean = false
) {
  const ps = new sql.PreparedStatement(pool)
  ps.input("email", sql.NVarChar(sql.MAX))
  ps.input("password", sql.VarChar(sql.MAX))
  ps.input("isAdmin", sql.Bit)
  await ps.prepare(`
    INSERT INTO ${USER_TABLE} (Email, PasswordHash, IsAdmin)
    VALUES (@email, HASHBYTES('sha1', @password), @isAdmin)
  `)
  await ps.execute({ email, password, isAdmin })
  await ps.unprepare()
}

export async function getUser(id: string) {
  const ps = new sql.PreparedStatement(pool)
  ps.input("id", sql.Int)
  await ps.prepare(`
    SELECT ID, Email, IsAdmin FROM ${USER_TABLE}
    WHERE ID=@id;

    SELECT T.*, AccessGranted FROM tblTrackUser as TU
    JOIN tblTracksNoXml2 as T ON T.ID = TU.TrackID
    WHERE TU.UserID=@id
    AND DateDIFF(DAY, AccessGranted, SYSDATETIME()) <= 7;

    SELECT T.*, AccessGranted FROM tblTrackUser as TU
    JOIN tblTracksNoXml2 as T ON T.ID = TU.TrackID
    WHERE TU.UserID=@id
    AND DateDIFF(DAY, AccessGranted, SYSDATETIME()) > 7
    AND DateDIFF(DAY, AccessGranted, SYSDATETIME()) <= 30
    ;

  `)
  let executed: any = await ps.execute({ id: id })
  await ps.unprepare()
  console.log(executed.recordsets)
  return {
    user: executed.recordsets[0][0],
    tracks: executed.recordsets[1],
    expiredTracks: executed.recordsets[2],
  }
}

export async function getUsers() {
  const ps = new sql.PreparedStatement(pool)
  await ps.prepare(`
    SELECT Users.ID, Email, IsAdmin, TrackCount FROM tblTestUsers3 as Users
    LEFT JOIN
    (SELECT UserID, COUNT(TrackID) as TrackCount FROM tblTrackUser
    WHERE DateDIFF(DAY, AccessGranted, SYSDATETIME()) <= 7
    GROUP BY UserID
    ) as CurrentTracks ON CurrentTracks.UserID=Users.ID


  `)
  const executed = await ps.execute({})
  await ps.unprepare()
  return executed.recordset
}

// This will be called on initialisation to provide lists
// to use in search menus
export async function getStaticData() {
  const ps = new sql.PreparedStatement(pool)
  await ps.prepare(`
    SELECT ID, FullText as Title
    FROM tblCollectorsNoXml2;
    
    SELECT ID, FullName as Title
    FROM tblSpeakersNoXml5;

    SELECT ID, Title
    FROM tblReelsNoXml;

    SELECT ID, Nickname
    FROM tblTracksNoXml2;
  `)
  let executed = await ps.execute({})
  await ps.unprepare
  return executed.recordsets
}

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
  ps.output("isAdmin", sql.Bit)
  ps.output("id", sql.NVarChar(sql.MAX))
  let queryText = `
  SELECT @id=ID, @email=Email, @isAdmin=IsAdmin FROM ${USER_TABLE}
  WHERE SessionID=@sessionId;
  `
  await ps.prepare(queryText)
  let executed: any = await ps.execute({ sessionId: sessionId })
  await ps.unprepare()
  return {
    email: executed.output.email,
    isAdmin: executed.output.isAdmin,
    userId: executed.output.id,
  }
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
  await ps.prepare(queryText)
  let executed: any = await ps.execute({ email: email, password: password })
  await ps.unprepare()

  return executed.output.accepted
}

export async function createSession(email: string) {
  const ps = new sql.PreparedStatement(pool)
  ps.input("email", sql.NVarChar(sql.MAX))
  ps.input("sessionId", sql.NVarChar(sql.MAX))
  const sessionId = uuid()
  let queryText = `
  UPDATE ${USER_TABLE}
  SET SessionID = @sessionId, SessionStart = SYSDATETIME()
  WHERE Email=@email;
  `
  await ps.prepare(queryText)
  let executed: any = await ps.execute({ email: email, sessionId: sessionId })
  await ps.unprepare()
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
        propName: "tblPlaceNames3.Irish, ','",
        join: "LEFT JOIN tblTrackPlace ON tblTrackPlace.TrackID=#base.ID\nLEFT JOIN tblPlaceNames3 on tblTrackPlace.PlaceID=tblPlaceNames3.PlaceID",
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

/* This function will be called and will include the sound data, 
the other function will not include it - 
they are currently the same because I do not have the sound files */
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
