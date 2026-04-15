"use client";

import { useEffect, useState } from "react";

export default function FeaturedGames() {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    async function loadGames() {
      try {
        const res = await fetch("/api/odds");
        const data = await res.json();
        setGames(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    }

    loadGames();
  }, []);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Featured Games</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {games.map((game, index) => (
          <div key={game.id || index} className="rounded-xl border p-4">
            <div className="font-semibold">
              {game.away_team} at {game.home_team}
            </div>
            <div className="text-sm text-gray-400">
              {new Date(game.commence_time).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
