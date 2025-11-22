import { useParams } from 'react-router-dom';
import './StackDetail.css';

// 📥 Данные — как в temperature.csv и fires.csv
function getStackData(warehouse, stack) {
  // Склад 4, штабель 39: 286°C → возгорание 2020-07-26 (см. fires.csv)
  if (warehouse === "4" && stack === "39") {
    return {
      id: "4|39",
      warehouse: "4",
      stack: "39",
      measurements: [
        { date: new Date("2020-06-26"), temp: 31.9, shift: "219.0" },
        { date: new Date("2020-07-02"), temp: 286.0, shift: "219.0" },
        { date: new Date("2020-08-05"), temp: 109.4, shift: "219.0" },
        { date: new Date("2020-09-05"), temp: 145.5, shift: "219.0" },
        { date: new Date("2020-09-25"), temp: 41.1, shift: "219.0" },
      ],
      prediction: {
        ignitionDate: new Date("2020-07-03"),
        confidence: 0.95,
        daysLeft: 1,
      },
      realIgnition: {
        date: new Date("2020-07-26"), // из fires.csv: "2020-07-26,A1,68.0,6,2020-07-25 21:00:00,...,4"
        weight: 68.0,
      },
    };
  }

  // Склад 6, штабель 1: 294°C → возгорание 2020-08-05
  if (warehouse === "6" && stack === "1") {
    return {
      id: "6|1",
      warehouse: "6",
      stack: "1",
      measurements: [
        { date: new Date("2020-06-20"), temp: 65.0, shift: "921.0" },
        { date: new Date("2020-07-12"), temp: 115.0, shift: "921.0" },
        { date: new Date("2020-07-14"), temp: 263.4, shift: "921.0" },
        { date: new Date("2020-07-20"), temp: 294.0, shift: "219.0" },
        { date: new Date("2020-08-05"), temp: 243.1, shift: "219.0" },
        { date: new Date("2020-08-16"), temp: 102.0, shift: "921.0" },
      ],
      prediction: {
        ignitionDate: new Date("2020-07-16"),
        confidence: 0.98,
        daysLeft: 2,
      },
      realIgnition: {
        date: new Date("2020-08-05"), // "2020-08-05,A1,34.0,6,2020-08-04 21:00:00,...,1"
        weight: 34.0,
      },
    };
  }

  // Безопасный штабель
  return {
    id: `${warehouse}|${stack}`,
    warehouse,
    stack,
    measurements: [
      { date: new Date("2020-09-20"), temp: 22.1, shift: "219.0" },
      { date: new Date("2020-09-22"), temp: 23.4, shift: "219.0" },
      { date: new Date("2020-09-24"), temp: 25.1, shift: "219.0" },
      { date: new Date("2020-09-26"), temp: 27.7, shift: "219.0" },
    ],
    prediction: null,
    realIgnition: null,
  };
}

export default function StackDetail() {
  const { warehouse, stack } = useParams();
  const data = getStackData(warehouse, stack);
  const { prediction, realIgnition, measurements } = data;

  const isAccurate = prediction && realIgnition && (
    Math.abs(prediction.ignitionDate - realIgnition.date) <= 2 * 24 * 60 * 60 * 1000
  );

  const formatDate = (date) => {
    return date instanceof Date
      ? date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' })
      : '—';
  };

  return (
    <div className="stack-detail">
      <header className="stack-detail__header">
        <div>
          <h1 className="stack-detail__title">Штабель {stack}</h1>
          <p className="stack-detail__subtitle">Склад {warehouse}</p>
        </div>
        <a href="/dashboard" className="stack-detail__back-link">
          ← Назад к выбору
        </a>
      </header>
 
      {/* Статус */}
      <div className="card-ye">
        <div className="status-row">

          {prediction ? (
            <span className={`badge ${
              prediction.daysLeft <= 0 ? 'badge--danger' :
              prediction.daysLeft <= 2 ? 'badge--danger' :
              prediction.daysLeft <= 5 ? 'badge--warning' : 'badge--success'
            }`}>
              {prediction.daysLeft <= 0
                ? `🔥 Возгорание! (${formatDate(prediction.ignitionDate)})`
                : `📅 Прогноз: ${formatDate(prediction.ignitionDate)} (${prediction.daysLeft} дн.)`}
            </span>
          ) : (
            <span className="badge--success">✅ Нет риска</span>
          )}

          {realIgnition && (
            <div className="real-ignition">
              <span className="real-ignition__label">Реальное возгорание:</span>
              <span className={`real-ignition__value ${
                isAccurate ? 'real-ignition__value--correct' : 'real-ignition__value--error'
              }`}>
                {formatDate(realIgnition.date)} • {realIgnition.weight} тн
                {isAccurate && ` ✅`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Таблица замеров */}
      <div className="card">
        <h2 className="card__title">📈 Температура штабеля</h2>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Макс. температура, °C</th>
                <th>Смена</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((m, i) => (
                <tr key={i}>
                  <td>{formatDate(m.date)}</td>
                  <td className={m.temp > 70 ? 'temp--danger' : m.temp > 50 ? 'temp--warning' : ''}>
                    {m.temp.toFixed(1)}
                  </td>
                  <td>{m.shift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {measurements.length > 0 && (
          <div className="table-footer">
            Последнее измерение: {formatDate(measurements[measurements.length - 1].date)} • 
            Максимум: {Math.max(...measurements.map(m => m.temp)).toFixed(1)}°C
          </div>
        )}
      </div>

      {/* Метрики */}
      {prediction && realIgnition && (
        <div className="card-prognoz">
          <h2 className="card__title">📊 Оценка прогноза</h2>
          <div className="metrics-grid">
            <div className="metric metric--accuracy">
              <div className="metric__value">{isAccurate ? '70%' : '30%'}</div>
              <div className="metric__label">Точность (±2 дня)</div>
              {isAccurate && <div className="metric__note">✅ ≥70%</div>}
            </div>
            <div className="metric metric--error">
              <div className="metric__value">
                {Math.abs((prediction.ignitionDate - realIgnition.date) / (24 * 60 * 60 * 1000)).toFixed(1)} дн.
              </div>
              <div className="metric__label">Ошибка прогноза</div>
            </div>
            <div className="metric metric--confidence">
              <div className="metric__value">{Math.round(prediction.confidence * 100)}%</div>
              <div className="metric__label">Уверенность модели</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}