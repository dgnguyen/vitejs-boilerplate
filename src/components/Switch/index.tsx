import React from 'react'

import './Switch.scss'

const ToggleSwitch: React.FC<{
  isChecked: boolean
  onChange: (isChecked: boolean) => void
}> = ({ isChecked = false, onChange }) => (
  <div className={'switch-toggle'}>
    <label className='switch'>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={e => onChange(e.target.checked)}
      />
      <span className='slider round'></span>
    </label>
  </div>
)

export default ToggleSwitch
