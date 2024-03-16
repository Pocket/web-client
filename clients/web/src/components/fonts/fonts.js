import { css } from '@emotion/css'

export const GoogleFonts = css`
  :global() {
    @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,400i,600,600i');
    @import url('https://fonts.googleapis.com/css?family=Vollkorn:400,400i,700,700i');
    @import url('https://fonts.googleapis.com/css?family=Zilla+Slab:400,400i,600,600i');
  }
`

export const FONT_TYPES = {
  blanco: {
    family: 'Blanco OSF',
    name: 'Blanco',
    size: '1em'
  },
  graphik: {
    family: 'Graphik Web',
    name: 'Graphik',
    size: '0.9em'
  },
  ideal: {
    premium: true,
    family: 'IdealSans',
    name: 'Ideal Sans',
    size: '0.85em'
  },
  inter: {
    premium: true,
    family: 'Inter',
    name: 'Inter',
    size: '0.9em'
  },
  plex: {
    premium: true,
    family: 'IBM Plex Sans',
    name: 'Plex Sans',
    size: '0.95em'
  },
  sentinel: {
    premium: true,
    family: 'Sentinel',
    name: 'Sentinel',
    size: '0.85em'
  },
  tiempos: {
    premium: true,
    family: 'Tiempos',
    name: 'Tiempos',
    size: '0.9em'
  },
  vollkorn: {
    premium: true,
    family: 'Vollkorn',
    name: 'Vollkorn',
    size: '0.95em'
  },
  whitney: {
    premium: true,
    family: 'Whitney',
    name: 'Whitney',
    size: '0.85em'
  },
  zilla: {
    premium: true,
    family: 'Zilla Slab',
    name: 'Zilla Slab',
    size: '0.95em'
  }
}
