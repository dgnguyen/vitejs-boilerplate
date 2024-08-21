import React from 'react'

import { DateRange, DefinedRange } from 'react-date-range'

import Calendar from './CustomCalendar'

class CustomDateRange extends DateRange {
  render() {
    const calendarProps = {
      focusedRange: this.state.focusedRange,
      preview: this.state.preview,
      onRangeFocusChange: this.handleRangeFocusChange,
      ...this.props,
      onPreviewChange: value => {
        this.updatePreview(value ? this.calcNewSelection(value) : null)
      },
      showDateDisplay: false, // show input for date
      months: 1,
      showSelectionPreview: true,
      displayMode: 'dateRange',
      onChange: this.setSelection,
      updateRange: val => this.setSelection(val, false)
    }
    const { onChange, ranges } = this.props

    return (
      <div className="d-flex">
        <DefinedRange onChange={onChange} ranges={ranges} />
        <Calendar {...calendarProps} shownDate={new Date()} />
        <Calendar
          {...calendarProps}
          date={new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)}
          shownDate={new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)}
        />
      </div>
    )
  }
}

export default CustomDateRange
