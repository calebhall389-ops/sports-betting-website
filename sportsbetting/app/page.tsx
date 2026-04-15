import HeroSection from '@/components/home/HeroSection';
import FeaturedGames from '@/components/home/FeaturedGames';
import BestBets from '@/components/home/BestBets';
import TrendingProps from '@/components/home/TrendingProps';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedGames />
      <BestBets />
      <TrendingProps />
    </main>
  );
}
