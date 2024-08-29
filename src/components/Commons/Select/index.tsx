import styles from './styles.module.scss'

type valueType = string | number

type ISelect<T> = {
  value: T
  options: { value: T; label: string }[]
  onChange: (val: T) => void
  className?: string
  disabled?: boolean
  style?: {}
}

const Select = <T extends valueType>({
  style,
  value,
  options,
  onChange,
  className,
  disabled = false
}: ISelect<T>) => {
  return (
    <select
      style={style}
      value={value}
      onChange={e => onChange(e.target.value as T)}
      className={`${styles.select} ${className}`}
      disabled={disabled}
    >
      {options.map(({ value, label }) => (
        <option value={value} key={label}>
          {label}
        </option>
      ))}
    </select>
  )
}

export default Select
