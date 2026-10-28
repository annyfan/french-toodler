import React, { useState, useEffect } from 'react';
import { UserProgress } from './types';
import { progressTracker } from './engine/ProgressTracker';
import { ToddlerShell } from './components/toddler/ToddlerShell';
import { ParentPortal } from './components/parent/ParentPortal';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(progressTracker.getProgress());
  const [viewMode, setViewMode] = useState<'toddler' | 'parent'>('toddler');

  useEffect(() => {
    const unsubscribe = progressTracker.subscribe((updated) => {
      setProgress(updated);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full h-full">
      {viewMode === 'toddler' ? (
        <ToddlerShell onOpenParentPortal={() => setViewMode('parent')} />
      ) : (
        <ParentPortal
          progress={progress}
          onClose={() => setViewMode('toddler')}
        />
      )}
    </div>
  );
};

export default App;
