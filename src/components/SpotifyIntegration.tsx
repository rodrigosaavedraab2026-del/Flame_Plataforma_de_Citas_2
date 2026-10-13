import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Music, Play, Pause, Search, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function SpotifyIntegration() {
  const { setScreen, addToast, updateProfile } = useStore();
  const [connected, setConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const [playing, setPlaying] = useState(false);

  const topTracks = [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', cover: '🌃' },
    { id: 2, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', cover: '🚀' },
    { id: 3, title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: '3:35', cover: '💧' },
    { id: 4, title: 'Peaches', artist: 'Justin Bieber', album: 'Justice', duration: '3:18', cover: '🍑' },
    { id: 5, title: 'Kiss Me More', artist: 'Doja Cat', album: 'Planet Her', duration: '3:28', cover: '💋' },
    { id: 6, title: 'Montero', artist: 'Lil Nas X', album: 'Montero', duration: '2:17', cover: '🦋' },
    { id: 7, title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', duration: '2:58', cover: '💔' },
    { id: 8, title: 'Stay', artist: 'The Kid LAROI', album: 'F*CK LOVE 3', duration: '2:21', cover: '⏰' },
  ];

  const filteredTracks = searchQuery
    ? topTracks.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : topTracks;

  const connectSpotify = () => {
    setConnected(true);
    addToast({ type: 'success', message: '¡Spotify conectado!' });
  };

  const selectAnthem = (track: any) => {
    setSelectedSong(track);
    addToast({ type: 'success', message: `¡${track.title} establecido como tu himno!` });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex items-center gap-3 z-10">
        <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white">Spotify</h1>
      </div>

      <div className="p-4">
        {!connected ? (
          /* Connect screen */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
              <Music className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">Conecta Spotify</h2>
            <p className="text-white/60 mb-6">
              Muestra tu personalidad musical y encuentra matches con gustos similares
            </p>
            <button
              onClick={connectSpotify}
              className="px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg"
            >
              Conectar Spotify
            </button>
          </motion.div>
        ) : (
          <>
            {/* Connected banner */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/20 rounded-2xl p-4 border border-green-500/30 mb-6"
            >
              <div className="flex items-center gap-3">
                <Music className="w-8 h-8 text-green-400" />
                <div>
                  <h2 className="text-white font-semibold">Spotify conectado</h2>
                  <p className="text-white/60 text-sm">Selecciona tu himno musical</p>
                </div>
              </div>
            </motion.div>

            {/* Current anthem */}
            {selectedSong && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6"
              >
                <p className="text-white/60 text-sm mb-2">Tu himno actual</p>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-3xl">
                    {selectedSong.cover}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold">{selectedSong.title}</h3>
                    <p className="text-white/60 text-sm">{selectedSong.artist}</p>
                  </div>
                  <button
                    onClick={() => setPlaying(!playing)}
                    className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    {playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar canciones..."
                className="w-full bg-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 border border-white/20"
              />
            </div>

            {/* Tracks list */}
            <div className="space-y-2">
              {filteredTracks.map((track, index) => (
                <motion.button
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => selectAnthem(track)}
                  className={`w-full p-3 rounded-xl text-left flex items-center gap-3 ${
                    selectedSong?.id === track.id
                      ? 'bg-green-500/20 border-green-500/50'
                      : 'bg-white/5 border-white/10'
                  } border hover:bg-white/10 transition-colors`}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl flex-shrink-0">
                    {track.cover}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate">{track.title}</h3>
                    <p className="text-white/60 text-sm truncate">{track.artist}</p>
                  </div>
                  <span className="text-white/40 text-sm">{track.duration}</span>
                  {selectedSong?.id === track.id && (
                    <Heart className="w-5 h-5 text-green-400 fill-green-400" />
                  )}
                </motion.button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
