import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.ODDS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing ODDS_API_KEY" },
        { status: 500 }
      );
    }

    const sports = ["baseball_mlb", "basketball_nba"];

    const results = await Promise.all(
      sports.map(async (sport) => {
        const res = await fetch(
          `https://api.the-odds-api.com/v4/sports/${sport}/odds/?regions=us&markets=h2h,spreads,totals&oddsFormat=american&apiKey=${apiKey}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch ${sport}`);
        }

        return res.json();
      })
    );

    const flattened = results.flat();

    return NextResponse.json(flattened);
  } catch (error) {
    console.error("Odds API error:", error);
    return NextResponse.json(
      { error: "Failed to load odds" },
      { status: 500 }
    );
  }
}
