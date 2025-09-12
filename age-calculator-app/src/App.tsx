
import { useState } from 'react'

type Age = {
  years: number | null
  months: number | null
  days: number | null
}

type Errors = {
  day?: string
  month?: string
  year?: string
  form?: string
}

function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function getDaysInMonth(month: number, year: number) {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]
}

function calculateAge(day: number, month: number, year: number): Age {
  const today = new Date()
  let years = today.getFullYear() - year
  let months = today.getMonth() + 1 - month
  let days = today.getDate() - day

  if (days < 0) {
    months--
    days += getDaysInMonth(month === 1 ? 12 : month - 1, months < 0 ? year - 1 : year)
  }
  if (months < 0) {
    years--
    months += 12
  }
  if (years < 0) {
    return { years: null, months: null, days: null }
  }
  return { years, months, days }
}

export default function App() {
  const [inputs, setInputs] = useState({ day: '', month: '', year: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [age, setAge] = useState<Age>({ years: null, months: null, days: null })
  const [touched, setTouched] = useState({ day: false, month: false, year: false })

  function validate(day: string, month: string, year: string): Errors {
    const errs: Errors = {}
    if (!day) errs.day = 'Campo obrigatório'
    if (!month) errs.month = 'Campo obrigatório'
    if (!year) errs.year = 'Campo obrigatório'
    const d = Number(day)
    const m = Number(month)
    const y = Number(year)
    const now = new Date()
    if (day && (isNaN(d) || d < 1 || d > 31)) errs.day = 'Dia inválido'
    if (month && (isNaN(m) || m < 1 || m > 12)) errs.month = 'Mês inválido'
    if (year && (isNaN(y) || y > now.getFullYear())) errs.year = 'Ano inválido'
    if (day && month && year && !errs.day && !errs.month && !errs.year) {
      if (y === now.getFullYear() && (m > now.getMonth() + 1 || (m === now.getMonth() + 1 && d > now.getDate()))) {
        errs.form = 'A data não pode ser no futuro'
      } else if (d > getDaysInMonth(m, y)) {
        errs.form = 'Data inválida'
      }
    }
    return errs
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value.replace(/\D/, '') }))
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(inputs.day, inputs.month, inputs.year)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      const result = calculateAge(Number(inputs.day), Number(inputs.month), Number(inputs.year))
      setAge(result)
    } else {
      setAge({ years: null, months: null, days: null })
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 font-poppins">
      <section className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex gap-4 md:gap-8">
            <div className="flex flex-col w-1/3">
              <label htmlFor="day" className="uppercase text-xs tracking-widest text-gray-500 font-bold mb-1">Dia</label>
              <input
                id="day"
                name="day"
                type="text"
                maxLength={2}
                placeholder="DD"
                className={`border rounded-lg px-3 py-2 text-lg font-bold focus:outline-none focus:border-purple-500 ${errors.day && touched.day ? 'border-red-400' : 'border-gray-200'}`}
                value={inputs.day}
                onChange={handleChange}
                onBlur={() => setTouched((prev) => ({ ...prev, day: true }))}
              />
              {errors.day && touched.day && <span className="text-red-400 text-xs mt-1">{errors.day}</span>}
            </div>
            <div className="flex flex-col w-1/3">
              <label htmlFor="month" className="uppercase text-xs tracking-widest text-gray-500 font-bold mb-1">Mês</label>
              <input
                id="month"
                name="month"
                type="text"
                maxLength={2}
                placeholder="MM"
                className={`border rounded-lg px-3 py-2 text-lg font-bold focus:outline-none focus:border-purple-500 ${errors.month && touched.month ? 'border-red-400' : 'border-gray-200'}`}
                value={inputs.month}
                onChange={handleChange}
                onBlur={() => setTouched((prev) => ({ ...prev, month: true }))}
              />
              {errors.month && touched.month && <span className="text-red-400 text-xs mt-1">{errors.month}</span>}
            </div>
            <div className="flex flex-col w-1/3">
              <label htmlFor="year" className="uppercase text-xs tracking-widest text-gray-500 font-bold mb-1">Ano</label>
              <input
                id="year"
                name="year"
                type="text"
                maxLength={4}
                placeholder="AAAA"
                className={`border rounded-lg px-3 py-2 text-lg font-bold focus:outline-none focus:border-purple-500 ${errors.year && touched.year ? 'border-red-400' : 'border-gray-200'}`}
                value={inputs.year}
                onChange={handleChange}
                onBlur={() => setTouched((prev) => ({ ...prev, year: true }))}
              />
              {errors.year && touched.year && <span className="text-red-400 text-xs mt-1">{errors.year}</span>}
            </div>
          </div>
          {errors.form && <span className="text-red-400 text-xs -mt-6 mb-2">{errors.form}</span>}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-black transition-colors text-white rounded-full p-4 w-16 h-16 flex items-center justify-center shadow-lg -mt-12 md:-mt-14"
              aria-label="Calcular idade"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 46 44">
                <g fill="none" stroke="#FFF" strokeWidth="2">
                  <path d="M1 22h44M32 11l11 11-11 11"/>
                </g>
              </svg>
            </button>
          </div>
        </form>
        <div className="mt-8 text-5xl md:text-6xl font-extrabold italic text-black flex flex-col gap-2 md:gap-3">
          <span><span className="text-purple-500">{age.years !== null ? age.years : '--'}</span> anos</span>
          <span><span className="text-purple-500">{age.months !== null ? age.months : '--'}</span> meses</span>
          <span><span className="text-purple-500">{age.days !== null ? age.days : '--'}</span> dias</span>
        </div>
      </section>
    </main>
  )
}
