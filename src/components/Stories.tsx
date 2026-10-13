import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Stories() {
  const { stories, viewStory, setScreen, currentStoryIndex, setCurrentStoryIndex } = useStore();
  const [viewingStory, setViewingStory] = useState(false);

  const startViewing = (index: number) => {
    setCurrentStoryIndex(index);
    setViewingStory(true);
    viewStory(stories[index].id);
  };

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      const newIndex = currentStoryIndex + 1;
      setCurrentStoryIndex(newIndex);
      viewStory(stories[newIndex].id);
    } else {
      setViewingStory(false);
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      const newIndex = currentStoryIndex - 1;
      setCurrentStoryIndex(newIndex);
      viewStory(stories[newIndex].id);
    }
  };

  const currentStory = stories[currentStoryIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pt-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Historias</h1>
        <button className="flex items-center gap-1.5 text-pink-400 text-sm">
          <Plus className="w-4 h-4" />
          Crear
        </button>
      </div>

      {/* Story viewer */}
      <AnimatePresence>
        {viewingStory && currentStory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            {/* Progress bar */}
            <div className="flex gap-1 p-3">
              {stories.map((_, i) => (
                <div key={i} className="flex-1 h-0.5 rounded-full bg-white/30 overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: i < currentStoryIndex ? '100%' : i === currentStoryIndex ? '100%' : '0%' }}
                    transition={{ duration: i === currentStoryIndex ? 5 : 0 }}
                  />
                </div>
              ))}
            </div>

            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={currentStory.avatar} alt={currentStory.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{currentStory.name}</p>
                  <p className="text-white/50 text-xs">
                    {Math.floor((Date.now() - new Date(currentStory.timestamp).getTime()) / 3600000)}h
                  </p>
                </div>
              </div>
              <button onClick={() => setViewingStory(false)} className="text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center relative">
              {/* Navigation areas */}
              <button onClick={prevStory} className="absolute left-0 top-0 bottom-0 w-1/3 z-10" />
              <button onClick={nextStory} className="absolute right-0 top-0 bottom-0 w-1/3 z-10" />

              {/* Story content */}
              <motion.div
                key={currentStoryIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8"
              >
                {currentStory.type === 'text' ? (
                  <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                    <p className="text-white text-2xl font-medium">{currentStory.content}</p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-72 h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                      <p className="text-white text-6xl">📸</p>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-xl p-3">
                      <p className="text-white text-sm">{currentStory.content}</p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Navigation arrows */}
              {currentStoryIndex > 0 && (
                <button onClick={prevStory} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
              )}
              {currentStoryIndex < stories.length - 1 && (
                <button onClick={nextStory} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stories grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Create story */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-2"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <span className="text-white/70 text-sm font-medium">Tu historia</span>
        </motion.button>

        {/* Stories list */}
        {stories.map((story, index) => (
          <motion.button
            key={story.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => startViewing(index)}
            className="aspect-[3/4] rounded-2xl overflow-hidden relative border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-purple-500/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
              <div className={`w-14 h-14 rounded-full overflow-hidden border-2 ${story.viewed ? 'border-white/30' : 'border-pink-500'} mb-2`}>
                <img src={story.avatar} alt={story.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-white text-xs font-semibold text-center line-clamp-2">{story.name}</p>
              <p className="text-white/50 text-[10px] mt-1">
                {Math.floor((Date.now() - new Date(story.timestamp).getTime()) / 3600000)}h
              </p>
            </div>
            {!story.viewed && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
