import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import './IgnitionCalendar.css';

export default function IgnitionCalendar({ predictedDate, realDate }) {
  const formatShortDate = (date) => {
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' });
  };

  // Безопасное вычисление разницы (на случай, если realDate или predictedDate — null/undefined)
  const daysDiff = predictedDate && realDate
    ? Math.abs(Math.round((predictedDate - realDate) / (24 * 60 * 60 * 1000)))
    : null;

  return (
    <div className="ignition-calendar">
      <div className="ignition-calendar__header">
        <CalendarDaysIcon className="ignition-calendar__icon" />
        <span className="ignition-calendar__title">Календарь возгораний</span>
      </div>

      <div className="ignition-calendar__grid">
        <div className="ignition-calendar__item">
          <div className="ignition-calendar__label">Прогноз</div>
          <div className="ignition-calendar__value ignition-calendar__value--predicted">
            {predictedDate ? formatShortDate(predictedDate) : '—'}
          </div>
        </div>

        <div className="ignition-calendar__item">
          <div className="ignition-calendar__label">Реальное</div>
          <div className="ignition-calendar__value ignition-calendar__value--real">
            {realDate ? formatShortDate(realDate) : '—'}
          </div>
        </div>
      </div>

      {daysDiff !== null && (
        <div className="ignition-calendar__diff">
          📌 Разница: <strong>{daysDiff} дней</strong>
        </div>
      )}
    </div>
  );
}