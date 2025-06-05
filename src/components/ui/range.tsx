import { useState } from "react"

type RangeOptions = {
  id?: string,
  name: string,
  min?: number,
  max?: number,
  defaultValue?: number,
  onChange?: Function
}

export default function Range (options: RangeOptions) {
  const {name, min, max, defaultValue} = options

  const useMin = min || 0
  const useMax = max || 100
  const useDefault = defaultValue || 0
  const [currentValue, setCurrentValue] = useState(useDefault)

  const id = options.id || `range-for-${name}-${useMin}-${useMax}`

  return (
    <div className="flex gap-4 items-center flex-row">
      <label htmlFor={id}>{name}:</label>
      <div
        className=""
        style={{position: 'relative'}}
      >
        <input type="range"
          id={id}
          min={useMin}
          max={useMax}
          defaultValue={useDefault}
          name={name}
          onChange={(e) => {
            const value = Number(e.currentTarget.value)
            if (options.onChange) {
              options.onChange(value)
            }

            setCurrentValue(value)
          }}
        />
        <span style={{position: 'absolute', bottom: 0, left: 0}}>{useMin}</span>
        <span style={{position: 'absolute', bottom: 0, right:0}}>{useMax}</span>
        <span style={{position: 'absolute', top: 0, left: (90 * (currentValue - useMin) / (useMax - useMin)) + '%'}}>{currentValue}</span>
      </div>

    </div>
  )
}