import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { VariantFlag } from './variant-flags'
import { setVariantFlags } from './variant-flags.state'
import { localStore } from 'common/utilities/browser-storage/browser-storage'
import { css } from 'linaria'
import InfoLayout from 'layouts/info-page'

const variantStyles = css`
  button {
    margin: 1rem 0 3rem;
  }
  section {
    margin-bottom: 4rem;
  }
`

// button for demo purposes only
const resetLocalStorage = () => {
  localStore.removeItem('foodTest')
  localStore.removeItem('colorTest')
  localStore.removeItem('tentacleTest')
  location.reload() // reload page
  return false
}

const FoodTest = () => (
  <section>
    <h2>Hamburger 🍔 vs Hotdog 🌭</h2>
    <p>This test is a simple 50/50 test.</p>
    <VariantFlag flag="foodTest" variant="hamburger">
      <h3>🍔</h3>
    </VariantFlag>

    <VariantFlag flag="foodTest" variant="hotdog">
      <h3>🌭</h3>
    </VariantFlag>
  </section>
)

const ColorTest = () => (
  <section>
    <h2>Red 🔴 vs Green 🟢 vs Blue 🔵</h2>
    <p>This test has more than two options.</p>
    <VariantFlag flag="colorTest" variant="red">
      <h3>🔴</h3>
    </VariantFlag>

    <VariantFlag flag="colorTest" variant="green">
      <h3>🟢</h3>
    </VariantFlag>

    <VariantFlag flag="colorTest" variant="blue">
      <h3>🔵</h3>
    </VariantFlag>
  </section>
)

const TentacleTest = () => (
  <section>
    <h2>Tentacles 🐙 vs Tentacles 🦑</h2>
    <p>
      This test shows how you can render multiple components in different places
      on the page dependent on enrolled variant.
    </p>
    <VariantFlag flag="tentacleTest" variant="octopus">
      <h3>🐙</h3>
    </VariantFlag>

    <VariantFlag flag="tentacleTest" variant="squid">
      <h3>🦑</h3>
    </VariantFlag>
    <h4>How about a tentacle fact??</h4>
    <VariantFlag flag="tentacleTest" variant="octopus">
      <p>
        Octopi are among the few animals in the world that can change the color
        of their skin due to many thousands of color-changing cells called
        chromatophores just below the surface of the skin.
      </p>
    </VariantFlag>

    <VariantFlag flag="tentacleTest" variant="squid">
      <p>
        The largest giant squid ever recorded by scientists was almost 43 feet
        (13 meters) long, and may have weighed nearly a ton.
      </p>
    </VariantFlag>
  </section>
)

export const VariantTest = () => {
  const dispatch = useDispatch()

  const variants = {
    foodTest: ['hamburger', 'hotdog'],
    colorTest: ['red', 'green', 'blue'],
    tentacleTest: ['octopus', 'squid']
  }

  useEffect(() => {
    dispatch(setVariantFlags(variants))
  }, [dispatch])

  return (
    <div className={variantStyles}>
      <h1>Variant Examples</h1>
      <p>
        You didn't realize it, but you've already been enrolled into your
        variant. You'll see it every time you refresh the page.
      </p>
      <p>
        If you're not happy with your results, clear your local storage or click
        the button below to be re-enrolled.
      </p>
      <button onClick={resetLocalStorage}>Clear Variants</button>

      <FoodTest />
      <ColorTest />
      <TentacleTest />
    </div>
  )
}

export const VariantTestLayout = () => (
  <InfoLayout title="Variant Examples">
    <VariantTest />
  </InfoLayout>
)
