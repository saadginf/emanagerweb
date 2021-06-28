import React, { useState, useEffect } from "react";
import "react-big-calendar-like-google/lib/css/react-big-calendar.css";
import CalendarTable from "react-big-calendar-like-google";
import moment from "moment";
import "moment/locale/fr";
import "./Calendar.css";
import { useHistory } from "react-router-dom";
import { getEvents } from "../api/event";
CalendarTable.setLocalizer(CalendarTable.momentLocalizer(moment));
const Calendar = () => {
  const history = useHistory();
  const [event, setevent] = useState([]);
  const getAllEvents = async () => {
    let result = await getEvents();
    if (!result.ok) {
      console.log("Erreur Getting Events");
      return;
    }
    setevent(result.data);
  };
  useEffect(() => {
    getAllEvents();
  }, []);
  return (
    <div className="calendarContainer">
      <CalendarTable
        culture="fr"
        events={event}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => history.push("/search/" + event.id)}
        views={["month"]}
        style={{ height: 800 }}
      />
    </div>
  );
};

export default Calendar;
