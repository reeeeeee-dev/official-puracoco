export interface BandsInTownArtist {
  name: string
  url: string
}

export interface BandsInTownVenue {
  name: string
  city: string
  region: string
  country: string
  latitude: string
  longitude: string
  type?: string
  timezone?: string
}

export interface BandsInTownOffer {
  type: string
  url: string
  status: string
}

export interface BandsInTownEvent {
  id: string
  url: string
  datetime: string
  on_sale_datetime?: string
  description?: string
  title?: string
  artist: BandsInTownArtist
  venue: BandsInTownVenue
  offers?: BandsInTownOffer[]
  lineup?: string[]
  ticket_status?: string
  facebook_rsvp_url?: string
}
