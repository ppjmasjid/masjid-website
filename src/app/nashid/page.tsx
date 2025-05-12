"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
// ✅ Import playlist from external file
import { playlistData } from "@/data/playlist"; // adjust the path as needed

export default function CustomAudioPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const playingTrackRef = useRef<HTMLLIElement | null>(null);

    // ✅ Use the imported playlist instead of hardcoding it
    const playlist = useMemo(() => playlistData, []);
 


  const categories = useMemo(() => {
    const all = playlist.map(track => track.category.trim());
    return ["All", ...Array.from(new Set(all))];
  }, [playlist]);



  const audioRef = useRef<HTMLAudioElement | null>(null);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const previousTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const filteredPlaylist = useMemo(() => {
    return playlist.filter(track => {
      const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || track.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [playlist, searchTerm, selectedCategory]);



  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // only set src and load on track change
    audio.src = playlist[currentTrackIndex].src;
    audio.load();

    const updateDuration = () => setDuration(audio.duration || 0);
    const updateCurrentTime = () => setCurrentTime(audio.currentTime || 0);
    const handleEnded = () => nextTrack();

    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("ended", handleEnded);

    // autoplay if already playing
    if (isPlaying) {
      audio.play();
    }

    return () => {
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex]); // only depends on track index
  useEffect(() => {
    if (playingTrackRef.current) {
      playingTrackRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedCategory]);
  

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) =>
    `${Math.floor(time / 60).toString().padStart(2, "0")}:${Math.floor(time % 60).toString().padStart(2, "0")}`;
  const handleTrackSelect = (index: number) => {
    const selectedTrack = filteredPlaylist[index];
    const actualIndex = playlist.findIndex(
      (track) => track.src === selectedTrack.src
    );

    if (actualIndex !== -1) {
      setCurrentTrackIndex(actualIndex);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <audio ref={audioRef} />

      {/* Top Info */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src="/album-cover.jpg"
          alt="Album Cover"
          width={80}
          height={80}
          className="rounded-md shadow-lg"
        />
        <div>
          <h1 className="text-2xl font-semibold">{playlist[currentTrackIndex].title}</h1>
        </div>
      </div>

      {/* {searchTerm} */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 w-full md:w-1/2"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 ml-auto"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat === "All" ? "all" : cat}>
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>

      </div>

      {/* Controls + Seek */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
          <div className="flex gap-3">
            <button onClick={previousTrack} className="bg-gray-700 px-4 py-2 rounded">⏮️</button>
            <button onClick={togglePlayPause} className="bg-blue-500 px-6 py-2 rounded">
              {isPlaying ? "⏸️ Pause" : "▶️ Play"}
            </button>
            <button onClick={nextTrack} className="bg-gray-700 px-4 py-2 rounded">⏭️</button>
          </div>

          <input
            type="range"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="flex-1 accent-blue-500"
          />
        </div>

        {/* Volume + Time */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            🔊
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolume}
              className="w-32 accent-blue-500"
            />
          </div>
          <div className="text-sm text-gray-300">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>


      {/* Playlist */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3">🎵 Playlist</h2>
        <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
          {filteredPlaylist.map((track, index) => (

            <li
            ref={playlist[currentTrackIndex].src === track.src ? playingTrackRef : null}
              key={index}
              className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-all ${
                playlist[currentTrackIndex].src === track.src
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
              
            >
              <div onClick={() => handleTrackSelect(index)} className="flex-1">
                {index === currentTrackIndex ? "✅ " : "🎧 "} {track.title}
              </div>
              <a
                href={track.src.trim()}
                download
                className="ml-4 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                onClick={(e) => e.stopPropagation()} // prevent play trigger
              >
                ⬇️ Download
              </a>
            </li>

          ))}
        </ul>
      </div>
    </div>
  );
}
