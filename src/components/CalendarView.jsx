import React, { useState } from 'react';

const CalendarView = ({ events = [], onEventClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month and total days
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get today's date for highlighting
    const today = new Date();
    const isToday = (day) => {
        return today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;
    };

    // Check if a day has events
    const getEventsForDay = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(event => {
            // Try to match various date formats
            const eventDate = event.date;
            if (!eventDate) return false;

            // Parse date strings like "Dec 28, 2025" or "2025-12-28"
            const eventDateObj = new Date(eventDate);
            if (!isNaN(eventDateObj)) {
                return eventDateObj.getDate() === day &&
                    eventDateObj.getMonth() === month &&
                    eventDateObj.getFullYear() === year;
            }
            return false;
        });
    };

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    // Generate calendar days
    const calendarDays = [];

    // Empty cells for days before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvents = getEventsForDay(day);
        const hasEvents = dayEvents.length > 0;

        calendarDays.push(
            <div
                key={day}
                className={`calendar-day ${isToday(day) ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
                onClick={() => hasEvents && onEventClick && onEventClick(dayEvents)}
            >
                <span className="day-number">{day}</span>
                {hasEvents && (
                    <div className="event-dots">
                        {dayEvents.slice(0, 3).map((_, i) => (
                            <span key={i} className="event-dot"></span>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="calendar-view">
            <div className="calendar-header">
                <button className="calendar-nav" onClick={prevMonth}>‹</button>
                <h3>{months[month]} {year}</h3>
                <button className="calendar-nav" onClick={nextMonth}>›</button>
            </div>

            <div className="calendar-weekdays">
                {daysOfWeek.map(day => (
                    <div key={day} className="weekday">{day}</div>
                ))}
            </div>

            <div className="calendar-grid">
                {calendarDays}
            </div>

            {/* Upcoming events list */}
            {events.length > 0 && (
                <div className="upcoming-events">
                    <h4>Upcoming Tests</h4>
                    <div className="events-list">
                        {events.slice(0, 3).map((event, index) => (
                            <div key={index} className="event-item">
                                <div className="event-date">
                                    <span className="event-day">{new Date(event.date).getDate()}</span>
                                    <span className="event-month">{months[new Date(event.date).getMonth()]?.substring(0, 3)}</span>
                                </div>
                                <div className="event-info">
                                    <span className="event-title">{event.title}</span>
                                    <span className="event-subject">{event.subject}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarView;
