import Banner from "./Banner";
import BrowseByCategorySection from "./BrowseByCategorySection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="max-w-screen-xl mx-auto px-20">
        <BrowseByCategorySection></BrowseByCategorySection>
      </div>
    </div>
  );
};
// flex justify-center items-center w-full min-h-screen mt-16
export default Home;
