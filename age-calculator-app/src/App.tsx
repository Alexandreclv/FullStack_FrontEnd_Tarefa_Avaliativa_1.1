
import { useState } from 'react';
import './tailwind.css';

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
    // Validação de fevereiro considerando ano bissexto
    const isLeapYear = (nYear % 4 === 0 && nYear % 100 !== 0) || (nYear % 400 === 0);
    if (nMonth === 2) {
      if (isLeapYear && nDay > 29) {
        setError('Em fevereiro de ano bissexto, o dia não pode ser maior que 29.');
        setResult(null);
        return;
      }
      if (!isLeapYear && nDay > 28) {
        setError('Em fevereiro, o dia não pode ser maior que 28.');
        setResult(null);
        return;
      }
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
  <div className="w-screen h-screen box-border flex items-center justify-center p-24 bg-[#f0f0f0] bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/archives/assets/images/desktop-design.jpg')"}}>
  <form className="bg-white rounded-[32px_32px_160px_32px] shadow-[0_2px_24px_0_#0001] p-12 pt-12 pb-0 max-w-[900px] min-w-[600px] min-h-[340px] w-full mx-auto relative flex flex-col items-center" onSubmit={handleSubmit} autoComplete="off">
  {error && <div className="font-poppins text-[#ff4d4f] text-[16px] font-semibold mb-[18px] tracking-[0.5px] text-left">{error}</div>}
  <div className="flex gap-8 mb-8 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="day" className="text-xs tracking-[3px] text-[#716f6f] font-bold mb-0.5">DAY</label>
            <input
              id="day"
              name="day"
              type="text"
              maxLength={2}
              placeholder="DD"
              value={inputs.day}
              onChange={handleChange}
              required
              className="font-inherit text-[32px] font-bold border border-[#dcdcdc] rounded-lg px-4 py-2 w-[120px] outline-none text-left text-[#151515] bg-white transition-colors duration-200 focus:border-[#854dff]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="month" className="text-xs tracking-[3px] text-[#716f6f] font-bold mb-0.5">MONTH</label>
            <input
              id="month"
              name="month"
              type="text"
              maxLength={2}
              placeholder="MM"
              value={inputs.month}
              onChange={handleChange}
              required
              className="font-inherit text-[32px] font-bold border border-[#dcdcdc] rounded-lg px-4 py-2 w-[120px] outline-none text-left text-[#151515] bg-white transition-colors duration-200 focus:border-[#854dff]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="year" className="text-xs tracking-[3px] text-[#716f6f] font-bold mb-0.5">YEAR</label>
            <input
              id="year"
              name="year"
              type="text"
              maxLength={4}
              placeholder="YYYY"
              value={inputs.year}
              onChange={handleChange}
              required
              className="font-inherit text-[32px] font-bold border border-[#dcdcdc] rounded-lg px-4 py-2 w-[120px] outline-none text-left text-[#151515] bg-white transition-colors duration-200 focus:border-[#854dff]"
            />
          </div>
        </div>
  <div className="w-full flex items-center m-0 relative h-[60px] mt-4 mb-0">
          <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-none border-none p-0 cursor-pointer z-20 outline-none transition-shadow duration-200 active:shadow-[0_0_0_4px_#854dff33]" type="submit" aria-label="Calcular idade">
            <div className="w-11 h-11 bg-[#646cff] rounded-full flex items-center justify-center">
              <img src={import.meta.env.BASE_URL + 'public/icon-arrow.svg'} alt="Seta para baixo" width={32} height={32} className="block mx-auto" />
            </div>
          </button>
        </div>
  <div className="flex ml-[-480px] flex-col gap-0 mt-[30px] mb-10 text-[56px] italic font-poppins leading-[1.1] items-start">
          <span className="block text-left">
            <b className="text-[#854dff] text-[64px] font-extrabold font-poppins mr-0 tracking-[-2px]">{result ? result.years : '--'}</b> <b className="text-[#151515] text-[56px] font-extrabold font-poppins tracking-[-2px]">years</b>
          </span>
          <span className="block text-left">
            <b className="text-[#854dff] text-[64px] font-extrabold font-poppins mr-0 tracking-[-2px]">{result ? result.months : '--'}</b> <b className="text-[#151515] text-[56px] font-extrabold font-poppins tracking-[-2px]">months</b>
          </span>
          <span className="block text-left">
            <b className="text-[#854dff] text-[64px] font-extrabold font-poppins mr-0 tracking-[-2px]">{result ? result.days : '--'}</b> <b className="text-[#151515] text-[56px] font-extrabold font-poppins tracking-[-2px]">days</b>
          </span>
        </div>
      </form>
    </div>
  );
}
