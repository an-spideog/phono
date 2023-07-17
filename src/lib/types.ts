export interface Collector {
  ID: number
  FirstName: string
  LastName: string
  ReelCount?: string
}

export interface Speaker {
  ID: number
  Gender?: string
  FullName?: string
  FirstName?: string
  LastName?: string
  Age?: string
  BirthDate?: string
  Occupation?: string
  LanguageAbility?: string
  Remark?: string
  TrackCount?: number
}

export interface Track {
  ID: number
  Nickname: string
  CatalogueEntry?: string
  RecordingDate?: string
  CollectorIDs?: string
  CollectorNames?: string
  PlaceIDs?: string
  PlaceNames?: string
  ReelID?: string
  ReelTitle?: string
  AccessGranted?: Date
}

export interface Reel {
  ID: number
  Title?: string
  RefID?: number
  Date?: string
  Note?: string
  CollectorIDs?: string
  CollectorNames?: string
}

export interface User {
  ID: number
  Email: string
  IsAdmin: string
  TrackCount: number | null
}
