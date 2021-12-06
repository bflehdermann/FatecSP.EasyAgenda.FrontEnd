import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])





const events = [
  {
    'title': 'Meeting',
    'start': new Date(2017, 3, 12, 10, 30, 0, 0),
    'end': new Date(2017, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  }
]

const Calendar = () => (
  <div className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <BigCalendar
            events={events}
            views={allViews}
            defaultDate={new Date()} />
        </div>
      </div>
    </div>
  </div>
);

export default Calendar;