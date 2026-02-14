export interface NavLink {
  name: string
  to: string
}

export const navLinks: NavLink[] = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Music', to: '/music' },
  { name: 'Tour', to: '/tour' },
]
