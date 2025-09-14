
import { useState } from 'react';
import './App.css';

function calculateAge(day: number, month: number, year: number) {
  const today = new Date();
  let years = today.getFullYear() - year;
  let months = today.getMonth() + 1 - month;
  let days = today.getDate() - day;

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months, days };
}


export default function App() {
  const [inputs, setInputs] = useState({ day: '', month: '', year: '' });
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permite apenas números positivos
    const value = e.target.value.replace(/[^\d]/g, '');
    setInputs({ ...inputs, [e.target.name]: value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { day, month, year } = inputs;
    const nDay = Number(day);
    const nMonth = Number(month);
    const nYear = Number(year);
    const currentYear = 2025;

    if (!day || !month || !year) {
      setError('Preencha todos os campos.');
      setResult(null);
      return;
    }
    if (nDay < 1 || nMonth < 1 || nYear < 1) {
      setError('Nenhum valor pode ser negativo ou zero.');
      setResult(null);
      return;
    }
    if (nDay > 31) {
      setError('O dia não pode ser maior que 31.');
      setResult(null);
      return;
    }
    if (nMonth > 12) {
      setError('O mês não pode ser maior que 12.');
      setResult(null);
      return;
    }
    if (nYear > currentYear) {
      setError('O ano não pode ser maior que o atual.');
      setResult(null);
      return;
    }
    setError('');
    setResult(calculateAge(nDay, nMonth, nYear));
  };

  return (
    <div className="age-calc-bg">
      <form className="age-calc-form" onSubmit={handleSubmit} autoComplete="off">
        {error && <div className="age-calc-error">{error}</div>}
        <div className="age-calc-inputs">
          <div className="age-calc-input-group">
            <label htmlFor="day">DAY</label>
            <input
              id="day"
              name="day"
              type="text"
              maxLength={2}
              placeholder="DD"
              value={inputs.day}
              onChange={handleChange}
              required
            />
          </div>
          <div className="age-calc-input-group">
            <label htmlFor="month">MONTH</label>
            <input
              id="month"
              name="month"
              type="text"
              maxLength={2}
              placeholder="MM"
              value={inputs.month}
              onChange={handleChange}
              required
            />
          </div>
          <div className="age-calc-input-group">
            <label htmlFor="year">YEAR</label>
            <input
              id="year"
              name="year"
              type="text"
              maxLength={4}
              placeholder="YYYY"
              value={inputs.year}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="age-calc-divider">
          <button className="age-calc-btn" type="submit" aria-label="Calcular idade">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="22" cy="22" r="22" fill="#151515"/>
              <path d="M22 14V30" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M29 23L22 30L15 23" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="age-calc-result">
          <span>
            <b className="age-calc-number">{result ? result.years : '--'}</b> <span className="age-calc-label">years</span>
          </span>
          <span>
            <b className="age-calc-number">{result ? result.months : '--'}</b> <span className="age-calc-label">months</span>
          </span>
          <span>
            <b className="age-calc-number">{result ? result.days : '--'}</b> <span className="age-calc-label">days</span>
          </span>
        </div>
      </form>
    </div>
  );
}
