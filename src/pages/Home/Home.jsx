import Banner from "./Banner";
import BrowseByCategorySection from "./BrowseByCategorySection/BrowseByCategorySection";
import { Helmet } from "react-helmet-async";
import ClientReviews from "./ClientsReviews/ClientReviews";
import WhyUs from "./WhyUs";
const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Work Line | Home</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Banner></Banner>
      <div className="max-w-screen-xl mx-auto px-20">
        <BrowseByCategorySection></BrowseByCategorySection>
        <WhyUs></WhyUs>
        <ClientReviews></ClientReviews>
      </div>
    </div>
  );
};
//  w-full min-h-screen mt-16
export default Home;
