import { MusicIcon } from 'lucide-vue-next'

export interface StreamingService {
  name: string
  url: string
  color: string
  icon?: typeof MusicIcon
}

export const streamingServices: StreamingService[] = [
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/artist/03a3TmpMFgHPURsTZZ0iac',
    color: '#1DB954',
    icon: MusicIcon,
  },
  {
    name: 'Apple Music',
    url: 'https://music.apple.com/us/artist/pura-coco/1488284425',
    color: '#FA243C',
    icon: MusicIcon,
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/playlist?list=OLAK5uy_kl0Z9TKLJRWM_8XasFSyW2mZEK0bCkIuI',
    color: '#FF0000',
    icon: MusicIcon,
  },
  {
    name: 'YouTube Music',
    url: 'https://music.youtube.com/channel/UCB71BObmCSIGRAf81MpvRug',
    color: '#FF0000',
    icon: MusicIcon,
  },
  {
    name: 'Amazon Music',
    url: 'https://music.amazon.com/artists/B081NV3T33/pura-coco',
    color: '#00A8E1',
    icon: MusicIcon,
  },
]
