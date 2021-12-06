import React, { PureComponent } from 'react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { Field } from 'redux-form';

class DatePickerPastDays extends PureComponent {
  constructor(props) {
    super(props);
    moment.locale('en');
  }

  state = {
    focused: false,
  };

  onFocusChange = value => {
    this.setState({ focused: !this.state.focused });
    const { input } = this.props;
    input.onFocus(value);
  };

  disableWeekends = current => {
    const isValidDate = current.day() !== 0 && current.day() !== 6;
    return !isValidDate
  }

  presets = () => {
    return {
      text: 'Today',
      start: moment(),
      end: moment(),
    }
  }

  render() {
    const {
      input,
      meta: { touched, error, warning },
      placeholder,
      disabled,
      required,
    } = this.props;
    const { focused } = this.state;
    const invalid = error !== undefined && error !== null;



    return (
      <SingleDatePicker
        showClearDate={false}
        showDefaultInputIcon={true}
        displayFormat="DD/MM/YYYY"
        numberOfMonths={1}
        disabled={disabled}
        // placeholder={placeholder}
        date={input.value}
        onDateChange={input.onChange}
        focused={focused}
        onFocusChange={this.onFocusChange}
        id={input.name}
        isDayBlocked={this.disableWeekends}
        isOutsideRange={() => false}
        presets={this.presets}
      />
    );
  }
}

export default DatePickerPastDays;