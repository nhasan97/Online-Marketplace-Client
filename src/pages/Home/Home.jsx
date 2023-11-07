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
//  w-full min-h-screen mt-16
export default Home;
