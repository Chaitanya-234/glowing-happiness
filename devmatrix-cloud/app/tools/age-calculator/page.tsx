// app/tools/age-calculator/page.tsx
'use client';

import Icon from '@/components/Icon';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Age {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthdayIn: number;
}

const INITIAL_AGE: Age = {
  years: 0,
  months: 0,
  days: 0,
  totalDays: 0,
  nextBirthdayIn: 0,
};

function computeAge(dobIso: string): Age {
  const birthDate = new Date(dobIso);
  if (Number.isNaN(birthDate.getTime())) return INITIAL_AGE;

  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor(
    (today.getTime() - birthDate.getTime()) / msPerDay
  );

  // Days until next birthday
  const next = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (next.getTime() < today.getTime()) {
    next.setFullYear(next.getFullYear() + 1);
  }
  const nextBirthdayIn = Math.ceil(
    (next.getTime() - today.getTime()) / msPerDay
  );

  return { years, months, days, totalDays, nextBirthdayIn };
}

export default function AgeCalculatorPage() {
  const [dob, setDob] = useState('2000-01-01');
  const [age, setAge] = useState<Age>(INITIAL_AGE);

  useEffect(() => {
    setAge(computeAge(dob));
  }, [dob]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl">
            Age Calculator
          </h1>
          <p className="mt-3 text-muted">
            Find your exact age in years, months, and days.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass grid gap-8 rounded-3xl p-6 md:grid-cols-2 md:gap-12 md:p-10"
        >
          {/* Input */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="dob"
                className="flex items-center gap-2 text-sm font-medium text-muted"
              >
                <Icon name="cake" className="text-[18px] text-accent" />
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                value={dob}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDob(e.target.value)}
                className="w-full rounded-xl border border-border/20 bg-surface/15 p-3 text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>

            <div className="rounded-xl border border-border/20 bg-surface/10 p-4">
              <p className="text-xs uppercase tracking-wide text-muted">
                Total days alive
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {age.totalDays.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl border border-border/20 bg-surface/10 p-4">
              <p className="text-xs uppercase tracking-wide text-muted">
                Next birthday in
              </p>
              <p className="mt-1 text-2xl font-bold text-accent">
                {age.nextBirthdayIn} {age.nextBirthdayIn === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/20 bg-surface/10 p-6 text-center md:p-8">
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: age.years, label: 'Years' },
                { value: age.months, label: 'Months' },
                { value: age.days, label: 'Days' },
              ].map((cell) => (
                <div
                  key={cell.label}
                  className="rounded-xl border border-border/20 bg-surface/15 px-3 py-4"
                >
                  <div className="text-3xl font-bold text-foreground md:text-4xl">
                    {cell.value}
                  </div>
                  <div className="mt-1 text-xs text-muted">{cell.label}</div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted">
              You are{' '}
              <span className="font-semibold text-foreground">
                {age.years} years, {age.months} months, {age.days} days
              </span>{' '}
              old.
            </p>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-xs text-muted">
          Everything runs in your browser. Your birth date never leaves this
          device.
        </p>
      </div>
    </div>
  );
}