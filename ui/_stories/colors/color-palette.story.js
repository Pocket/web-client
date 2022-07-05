import { _paletteGroups } from '../../styles/variables/colors'
import { colorGroups } from './helpers'
import { GroupHeading } from './helpers'
import { ColorsGrid } from './helpers'

export default {
  title: 'UI/ColorPalette'
}

export const ColorPalette = () => {
  return (
    <div className={colorGroups}>
      {_paletteGroups.map((group) => (
        <>
          <GroupHeading key={group.title} {...group} />
          <div className="colorset">
            {group.colors.map((colorset, index) => (
              <div key={index}>
                <ColorsGrid colors={colorset} />
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  )
}
