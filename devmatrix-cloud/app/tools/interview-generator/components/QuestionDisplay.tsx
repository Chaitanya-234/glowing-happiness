import { useState, useMemo } from 'react';
import { Question, QuestionCard } from './QuestionCard';
import { FilterPanel, QuestionFilters } from './FilterPanel';
import { ExportOptions } from './ExportOptions';
import { List, Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface QuestionDisplayProps {
    questions: Question[];
}

export function QuestionDisplay({ questions }: QuestionDisplayProps) {
    const [filters, setFilters] = useState<QuestionFilters>({
        types: [],
        difficulty: [],
    });

    const [viewMode, setViewMode] = useState<'list' | 'interview'>('list');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const filteredQuestions = useMemo(() => {
        return questions.filter(q => {
            if (filters.types.length > 0 && !filters.types.includes(q.type)) return false;

            // Loose matching for difficulty
            const typeMatch = filters.types.length === 0 || filters.types.includes(q.type);
            if (!typeMatch) return false;

            const diffMatch = filters.difficulty.length === 0 || filters.difficulty.some(d => {
                const qDiff = q.difficulty.toLowerCase();
                const filterDiff = d.toLowerCase();
                if (filterDiff === 'lead/principal') return qDiff.includes('lead') || qDiff.includes('principal') || qDiff.includes('staff');
                return qDiff.includes(filterDiff);
            });

            return diffMatch;
        });
    }, [questions, filters]);

    // Reset index when filters change
    useMemo(() => setCurrentQuestionIndex(0), [filters]);

    const handleNext = () => {
        if (currentQuestionIndex < filteredQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold text-purple-100">Generated Questions ({filteredQuestions.length})</h2>
                <div className="flex items-center gap-2">
                    <div className="flex bg-purple-900/20 p-1 rounded-lg border border-purple-500/20">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ${
                                viewMode === 'list'
                                ? 'bg-purple-600 text-white shadow-sm'
                                : 'text-purple-300 hover:text-purple-100 hover:bg-purple-800/30'
                            }`}
                        >
                            <List size={16} /> List
                        </button>
                        <button
                            onClick={() => setViewMode('interview')}
                            className={`p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ${
                                viewMode === 'interview'
                                ? 'bg-purple-600 text-white shadow-sm'
                                : 'text-purple-300 hover:text-purple-100 hover:bg-purple-800/30'
                            }`}
                        >
                            <Play size={16} /> Interview Mode
                        </button>
                    </div>
                    <ExportOptions questions={filteredQuestions} />
                </div>
            </div>

            <FilterPanel filters={filters} onFilterChange={setFilters} />

            {filteredQuestions.length === 0 ? (
                <div className="text-center py-12 bg-purple-900/10 rounded-xl border border-purple-500/20 border-dashed">
                    <p className="text-purple-400">No questions match your filters.</p>
                    <button
                        onClick={() => setFilters({ types: [], difficulty: [] })}
                        className="mt-2 text-purple-300 hover:text-purple-100 hover:underline text-sm"
                    >
                        Clear filters
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {viewMode === 'list' ? (
                        <div className="space-y-6">
                            {filteredQuestions.map((q, i) => (
                                <QuestionCard key={q.id || i} question={q} index={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto">
                            <div className="mb-4 flex justify-between items-center text-sm text-purple-400/60">
                                <span>Question {currentQuestionIndex + 1} of {filteredQuestions.length}</span>
                                <div className="w-1/3 bg-purple-900/30 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-purple-500 h-2 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                        style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <QuestionCard
                                key={filteredQuestions[currentQuestionIndex].id || currentQuestionIndex}
                                question={filteredQuestions[currentQuestionIndex]}
                                index={currentQuestionIndex}
                            />

                            <div className="flex justify-between mt-6">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentQuestionIndex === 0}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium border transition-colors ${
                                        currentQuestionIndex === 0
                                        ? 'bg-purple-900/10 text-purple-500/30 border-purple-500/10 cursor-not-allowed'
                                        : 'bg-purple-900/20 text-purple-200 border-purple-500/30 hover:bg-purple-800/40 hover:border-purple-500/50'
                                    }`}
                                >
                                    <ChevronLeft size={16} /> Previous
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={currentQuestionIndex === filteredQuestions.length - 1}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium border transition-colors ${
                                        currentQuestionIndex === filteredQuestions.length - 1
                                        ? 'bg-purple-900/10 text-purple-500/30 border-purple-500/10 cursor-not-allowed'
                                        : 'bg-purple-600 text-white border-transparent hover:bg-purple-500 shadow-lg shadow-purple-900/20'
                                    }`}
                                >
                                    Next <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
