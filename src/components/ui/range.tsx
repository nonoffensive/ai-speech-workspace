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

  const ratio = (currentValue - useMin) / (useMax - useMin)

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
        <span style={{position: 'absolute', bottom: 0, left: 0, fontSize: '0.75em', marginBottom: '-10px'}}>{useMin}</span>
        <span style={{position: 'absolute', bottom: 0, right:0, fontSize: '0.75em', marginBottom: '-10px'}}>{useMax}</span>
        <span style={{
          display: 'block',
          position: 'absolute', top: 0, marginTop: '-16px',
          left: (100 * ratio) + '%',
          fontSize: '0.75em'
        }}>
          <span style={{position: 'relative', marginLeft: (-100 * ratio) + '%' }}>
            {currentValue}
          </span>
        </span>
      </div>

    </div>
  )
}