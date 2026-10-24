'use client';

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import {
  LayoutGrid, BookOpen, Target, FileText, Settings,
  Menu, Plus, ArrowLeft, Loader2, Upload
} from 'lucide-react';
import { analyzePaper } from '../actions';

import PaperLibrary from './PaperLibrary';
import PaperDetails from './PaperDetails';
import PaperUploader from './PaperUploader';
import PDFViewer from './PDFViewer';
import ProjectManager from './ProjectManager';
import ResearchGapFinder from './ResearchGapFinder';
import LiteratureReview from './LiteratureReview';
import BibliographyBuilder from './BibliographyBuilder';
import SearchFilters from './SearchFilters';

export default function ResearchManagerClient() {
  const [papers, setPapers] = useState<any[]>([]);
  const [projects, setProjects] = useState<{id: string, name: string, count: number}[]>([
    { id: 'default', name: 'My Research', count: 0 }
  ]);
  const [currentProject, setCurrentProject] = useState('default');
  const [view, setView] = useState<'library' | 'details' | 'upload' | 'pdf' | 'gaps' | 'review' | 'biblio'>('library');
  const [selectedPaper, setSelectedPaper] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [processing, setProcessing] = useState(false);
  // Temporary file storage for current session
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  // Load data
  useEffect(() => {
    const savedPapers = localStorage.getItem('research_papers');
    const savedProjects = localStorage.getItem('research_projects');
    if (savedPapers) {
        try {
            setPapers(JSON.parse(savedPapers));
        } catch (e) { console.error('Failed to load papers', e); }
    }
    if (savedProjects) {
        try {
            setProjects(JSON.parse(savedProjects));
        } catch (e) { console.error('Failed to load projects', e); }
    }
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem('research_papers', JSON.stringify(papers));
    // Update project counts
    const updatedProjects = projects.map(p => ({
        ...p,
        count: papers.filter(paper => paper.projectId === p.id).length
    }));
    // Only update if counts changed to avoid loops - strict equality check needed or just save
    // Simple save for now
    localStorage.setItem('research_projects', JSON.stringify(updatedProjects));
  }, [papers, projects]);

  const handlePaperProcessed = async (text: string, file: File) => {
    setProcessing(true);
    try {
        const result = await analyzePaper(text);
        if (result.success) {
            const newPaper = {
                id: crypto.randomUUID(),
                projectId: currentProject,
                ...result.data,
                dateAdded: new Date().toISOString(),
                favorite: false,
                tags: []
            };
            setPapers(prev => [newPaper, ...prev]);
            toast.success('Paper analyzed and added to library!');
            setView('library');
        } else {
            toast.error(result.error || 'Failed to analyze paper');
        }
    } catch (error) {
        toast.error('An unexpected error occurred');
        console.error(error);
    } finally {
        setProcessing(false);
    }
  };

  const handleDeletePaper = (id: string) => {
      if (confirm('Are you sure you want to delete this paper?')) {
          setPapers(prev => prev.filter(p => p.id !== id));
          if (selectedPaper?.id === id) {
              setSelectedPaper(null);
              setView('library');
          }
          toast.success('Paper deleted');
      }
  };

  const handleToggleFavorite = (id: string) => {
      setPapers(prev => prev.map(p => p.id === id ? { ...p, favorite: !p.favorite } : p));
  };

  const filteredPapers = papers
    .filter(p => p.projectId === currentProject)
    .filter(p => {
        const matchesSearch = p.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.metadata.authors.some((a:any) => a.name.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesFilter = filter === 'all' ? true :
                              filter === 'favorite' ? p.favorite :
                              filter === 'recent' ? true : // Add logic
                              filter === 'cited' ? p.metadata.citationCount > 0 : true;
        return matchesSearch && matchesFilter;
    });

  const renderContent = () => {
      switch (view) {
          case 'upload':
              return (
                  <div className="max-w-2xl mx-auto pt-10">
                      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">Upload New Paper</h2>
                      <PaperUploader onPaperProcessed={handlePaperProcessed} isProcessing={processing} />
                  </div>
              );
          case 'details':
              return selectedPaper ? (
                  <PaperDetails
                    paper={selectedPaper}
                    onBack={() => setView('library')}
                    onDelete={() => handleDeletePaper(selectedPaper.id)}
                  />
              ) : null;
          case 'gaps':
              return <ResearchGapFinder papers={papers.filter(p => p.projectId === currentProject)} />;
          case 'review':
              return <LiteratureReview papers={papers.filter(p => p.projectId === currentProject)} />;
          case 'biblio':
              return <BibliographyBuilder papers={papers.filter(p => p.projectId === currentProject)} />;
          case 'pdf':
              // In a real app, retrieve file blob from IDB. Here we rely on session state or show empty
              return <PDFViewer file={currentFile} onAddAnnotation={() => {}} />;
          case 'library':
          default:
              return (
                  <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                          <SearchFilters
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            activeFilter={filter}
                            onFilterChange={setFilter}
                          />
                          <button
                            onClick={() => setView('upload')}
                            className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors shrink-0"
                          >
                              <Upload className="w-4 h-4" /> Upload Paper
                          </button>
                      </div>
                      <PaperLibrary
                        papers={filteredPapers}
                        onSelectPaper={(p) => { setSelectedPaper(p); setView('details'); }}
                        onDeletePaper={handleDeletePaper}
                        onToggleFavorite={handleToggleFavorite}
                      />
                  </div>
              );
      }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <Toaster position="top-right" />

        {/* Sidebar */}
        <aside
            className={`${
                isSidebarOpen ? 'w-64' : 'w-0'
            } bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col overflow-hidden`}
        >
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold">
                    RM
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100">Research Manager</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <ProjectManager
                    projects={projects}
                    currentProject={currentProject}
                    onSelectProject={setCurrentProject}
                    onCreateProject={(name) => setProjects([...projects, { id: crypto.randomUUID(), name, count: 0 }])}
                    onDeleteProject={(id) => {
                        setProjects(projects.filter(p => p.id !== id));
                        if (currentProject === id) setCurrentProject('default');
                    }}
                />

                <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2">Tools</h3>
                    {[
                        { id: 'library', label: 'Library', icon: LayoutGrid },
                        { id: 'gaps', label: 'Gap Finder', icon: Target },
                        { id: 'review', label: 'Lit Review', icon: BookOpen },
                        { id: 'biblio', label: 'Bibliography', icon: FileText },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id as any)}
                            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                                view === item.id
                                    ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden w-full">
            <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center px-4 justify-between shrink-0">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div className="font-medium text-slate-700 dark:text-slate-200">
                    {view === 'library' ? 'My Library' :
                     view === 'gaps' ? 'Gap Analysis' :
                     view === 'review' ? 'Literature Review' :
                     view === 'biblio' ? 'Bibliography' :
                     view === 'upload' ? 'Upload Paper' :
                     selectedPaper?.metadata.title}
                </div>
                <div className="w-9" /> {/* Spacer */}
            </header>

            <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
                {renderContent()}
            </div>
        </main>
    </div>
  );
}
