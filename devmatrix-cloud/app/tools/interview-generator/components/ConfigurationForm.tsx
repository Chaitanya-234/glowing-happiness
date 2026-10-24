'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InterviewConfig } from '../actions';
import { RoleSelector } from './RoleSelector';
import { Plus, X } from 'lucide-react';

const schema = z.object({
  role: z.string().min(2, "Role is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  techStack: z.object({
    languages: z.array(z.string()).min(1, "At least one language is required"),
    frontend: z.array(z.string()),
    backend: z.array(z.string()),
    databases: z.array(z.string()),
    cloud: z.array(z.string()),
    tools: z.array(z.string()),
  }),
  questionCount: z.number().min(3).max(20),
  focusAreas: z.string().optional(), // We'll parse comma-separated string
  customInstructions: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface ConfigurationFormProps {
  onGenerate: (config: InterviewConfig) => void;
  isLoading: boolean;
}

export function ConfigurationForm({ onGenerate, isLoading }: ConfigurationFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: '',
      experienceLevel: 'Mid-level (2-5 years)',
      techStack: {
        languages: [],
        frontend: [],
        backend: [],
        databases: [],
        cloud: [],
        tools: [],
      },
      questionCount: 10,
    }
  });

  const [customTag, setCustomTag] = useState('');

  // Helper to manage array fields
  const addTag = (category: keyof FormValues['techStack'], tag: string) => {
    if (!tag) return;
    const current = watch(`techStack.${category}`);
    if (!current.includes(tag)) {
      setValue(`techStack.${category}`, [...current, tag]);
    }
  };

  const removeTag = (category: keyof FormValues['techStack'], tag: string) => {
    const current = watch(`techStack.${category}`);
    setValue(`techStack.${category}`, current.filter(t => t !== tag));
  };

  const onSubmit = (data: FormValues) => {
    onGenerate({
      ...data,
      focusAreas: data.focusAreas ? data.focusAreas.split(',').map(s => s.trim()) : [],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-purple-100 border-b border-purple-500/20 pb-2">Role & Experience</h3>

        <RoleSelector
          value={watch('role')}
          onChange={(val) => setValue('role', val)}
          error={errors.role?.message}
        />

        <div className="space-y-2">
            <label className="block text-sm font-medium text-purple-200">Experience Level</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Junior (0-2y)', 'Mid-level (2-5y)', 'Senior (5-8y)', 'Principal (8+y)'].map((level) => (
                    <label key={level} className={`
                        cursor-pointer border rounded-lg p-3 text-center text-sm transition-all
                        ${watch('experienceLevel') === level
                            ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20'
                            : 'bg-purple-900/20 border-purple-500/20 text-purple-200/70 hover:bg-purple-800/30'}
                    `}>
                        <input
                            type="radio"
                            value={level}
                            {...register('experienceLevel')}
                            className="sr-only"
                        />
                        {level}
                    </label>
                ))}
            </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-purple-100 border-b border-purple-500/20 pb-2">Tech Stack</h3>

        {/* Languages Input */}
        <div className="space-y-2">
            <label className="block text-sm font-medium text-purple-200">Programming Languages <span className="text-purple-400">*</span></label>
            <div className="flex flex-wrap gap-2 mb-2 min-h-[32px]">
                {watch('techStack.languages').map(lang => (
                    <span key={lang} className="bg-purple-500/20 text-purple-200 border border-purple-500/30 px-2 py-1 rounded text-xs flex items-center gap-1">
                        {lang}
                        <button type="button" onClick={() => removeTag('languages', lang)} className="hover:text-white"><X size={12} /></button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Add language (e.g. TypeScript)..."
                    className="flex-1 bg-purple-900/10 border border-purple-500/20 rounded-lg px-3 py-2 text-sm text-purple-100 placeholder-purple-400/30 focus:outline-none focus:border-purple-500/50"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag('languages', e.currentTarget.value);
                            e.currentTarget.value = '';
                        }
                    }}
                />
            </div>
            {errors.techStack?.languages && <p className="text-red-400 text-xs">{errors.techStack.languages.message}</p>}
        </div>

        {/* Simplified other stack inputs for brevity in this example */}
        <div className="grid md:grid-cols-2 gap-4">
            {['Frontend', 'Backend', 'Databases', 'Cloud'].map((cat) => {
                 const categoryKey = cat.toLowerCase() as keyof FormValues['techStack'];
                 return (
                    <div key={cat} className="space-y-2">
                        <label className="block text-sm font-medium text-purple-200">{cat}</label>
                        <div className="flex flex-wrap gap-1 mb-1 min-h-[24px]">
                            {watch(`techStack.${categoryKey}`).map((tag: string) => (
                                <span key={tag} className="bg-purple-900/30 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                                    {tag}
                                    <button type="button" onClick={() => removeTag(categoryKey, tag)}><X size={10} /></button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder={`Add ${cat}...`}
                            className="w-full bg-purple-900/10 border border-purple-500/20 rounded-lg px-3 py-2 text-sm text-purple-100 placeholder-purple-400/30 focus:outline-none focus:border-purple-500/50"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addTag(categoryKey, e.currentTarget.value);
                                    e.currentTarget.value = '';
                                }
                            }}
                        />
                    </div>
                 );
            })}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-purple-100 border-b border-purple-500/20 pb-2">Preferences</h3>

        <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">Number of Questions ({watch('questionCount')})</label>
            <input
                type="range"
                min="3"
                max="20"
                step="1"
                {...register('questionCount', { valueAsNumber: true })}
                className="w-full h-2 bg-purple-900/30 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">Focus Areas (Optional)</label>
            <input
                {...register('focusAreas')}
                placeholder="e.g. Performance, Security, Accessibility (comma separated)"
                className="w-full bg-purple-900/10 border border-purple-500/20 rounded-lg px-3 py-2 text-sm text-purple-100 placeholder-purple-400/30 focus:outline-none focus:border-purple-500/50"
            />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-900/50 hover:from-purple-500 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isLoading ? 'Generating Interview...' : 'Generate Questions'}
      </button>
    </form>
  );
}
