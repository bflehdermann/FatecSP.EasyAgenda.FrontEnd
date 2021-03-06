import React, { PureComponent } from 'react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { Field } from 'redux-form';

class DatePicker extends PureComponent {
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
          showDefaultInputIcon={false}
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
        />
    );
  }
}

export const formatDates = value => (value ? moment(value) : null);

export const normalizeDates = value =>
  value ? value.format('YYYY-MM-DD') : null;

export const FieldDatePicker = props => {
  return (
    <Field
      normalize={normalizeDates}
      format={formatDates}
      name={props.name}
      component={DatePicker}
      props={props}
    />
  );
};

export default DatePicker;