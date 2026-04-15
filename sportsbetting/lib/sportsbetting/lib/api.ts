const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

export async function getOddsData() {
  const res = await fetch(`${API_BASE_URL}/api/odds`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch odds data");
  }

  return res.json();
}
