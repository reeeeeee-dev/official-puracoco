export interface BandsInTownArtist {
  name: string
  url: string
}

export interface BandsInTownVenue {
  name: string
  street_address: string
  postal_code: string
  city: string
  region: string
  country: string
  latitude: string
  longitude: string
  type: string
  timezone: string
}

export interface BandsInTownOffer {
  type: string
  url: string
  status: string
}

export interface BandsInTownEvent {
  id: string
  artist_id: string
  url: string
  datetime: string
  on_sale_datetime: string
  description: string
  title: string
  artist: BandsInTownArtist
  lineup: string[]
  venue: BandsInTownVenue
  offers: BandsInTownOffer[]
  sold_out?: boolean
}
