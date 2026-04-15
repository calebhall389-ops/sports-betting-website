"use client";

import { useEffect, useState } from "react";

export default function OddsPage() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOdds() {
      try {
        const res = await fetch("/api/odds");
        if (!res.ok) throw new Error("Failed to fetch odds");
        const data = await res.json();
        setGames(data);
      } catch (err) {
        setError("Could not load odds.");
      } finally {
        setLoading(false);
      }
    }

    loadOdds();
  }, []);

  if (loading) return <div className="p-6">Loading odds...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Live Odds</h1>

      <div className="space-y-4">
        {games.map((game, index) => (
          <div key={game.id || index} className="rounded-xl border p-4">
            <div className="font-semibold">
              {game.away_team} at {game.home_team}
            </div>
            <div className="text-sm text-gray-400">
              {new Date(game.commence_time).toLocaleString()}
            </div>

            <div className="mt-3 space-y-2">
              {game.bookmakers?.map((book: any) => (
                <div key={book.key} className="rounded-lg border p-3">
                  <div className="font-medium">{book.title}</div>

                  {book.markets?.map((market: any) => (
                    <div key={market.key} className="mt-2">
                      <div className="text-sm font-semibold uppercase">
                        {market.key}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {market.outcomes?.map((outcome: any) => (
                          <div
                            key={outcome.name}
                            className="rounded bg-zinc-900 px-3 py-1 text-sm"
                          >
                            {outcome.name}: {outcome.price}
                            {outcome.point !== undefined
                              ? ` (${outcome.point})`
                              : ""}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
