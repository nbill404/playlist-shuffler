import HomeView from "./components/HomeView";
import MainLayout from "./components/MainLayout";
import SearchView from "./components/search/SearchView";

export default function Home() {

  return (
    <MainLayout>{HomeView}</MainLayout>
  );
}
