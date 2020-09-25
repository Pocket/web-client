import React from 'react'
import PublisherGrid from './publisher-grid'

import popularScience from 'media/images/publisher-logos/logo-popularScience.png'
import citylab from 'media/images/publisher-logos/logo-cityLab.png'
import nautilus from 'media/images/publisher-logos/logo-nautilus.png'
import outside from 'media/images/publisher-logos/logo-outside.png'
import theAtlantic from 'media/images/publisher-logos/logo-theAtlantic.png'
import mentalFloss from 'media/images/publisher-logos/logo-mentalFloss.png'
import texasMonthly from 'media/images/publisher-logos/logo-texasMonthly.png'
import saveur from 'media/images/publisher-logos/logo-saveur.png'
import narratively from 'media/images/publisher-logos/logo-narratively.png'
import atlasObscura from 'media/images/publisher-logos/logo-atlasObscura.png'
import harvardBusinessReview from 'media/images/publisher-logos/logo-harvardReview.png'
import kiplinger from 'media/images/publisher-logos/logo-kiplinger.png'
import fastCompany from 'media/images/publisher-logos/logo-fastCompany.png'
import inc from 'media/images/publisher-logos/logo-inc.png'
import quartz from 'media/images/publisher-logos/logo-quartz.png'
import theGuardian from 'media/images/publisher-logos/logo-guardian.png'

export default {
  title: 'Components/Pocket Hits Signup/PublisherGrid',
  component: PublisherGrid
}

export const normal = () => (
  <PublisherGrid
    publishers={[
      {
        name: 'Popular Science',
        path: popularScience
      },
      {
        name: 'Citylab',
        path: citylab
      },
      {
        name: 'Nautilus',
        path: nautilus
      },
      {
        name: 'Outside',
        path: outside
      },
      {
        name: 'The Atlantic',
        path: theAtlantic
      },
      {
        name: 'Mental Floss',
        path: mentalFloss
      },
      {
        name: 'Texas Monthly',
        path: texasMonthly
      },
      {
        name: 'Saveur',
        path: saveur
      },
      {
        name: 'Narratively',
        path: narratively
      },
      {
        name: 'Atlas Obscura',
        path: atlasObscura
      },
      {
        name: 'Harvard Business Review',
        path: harvardBusinessReview
      },
      {
        name: 'Kiplinger',
        path: kiplinger
      },
      {
        name: 'Fast Company',
        path: fastCompany
      },
      {
        name: 'Inc.',
        path: inc
      },
      {
        name: 'Quartz',
        path: quartz
      },
      {
        name: 'The Guardian',
        path: theGuardian
      }
    ]}
  />
)
