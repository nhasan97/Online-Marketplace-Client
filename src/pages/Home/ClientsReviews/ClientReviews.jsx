import Title from "../../../reusableComponents/Title";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReviewCard from "./ReviewCard";
import useReviews from "../../../hooks/useReviews";
import Loading from "../../../reusableComponents/Loading";
import Nodata from "../../../reusableComponents/Nodata";

const ClientReviews = () => {
  const [loadingReviews, fetchedReviews] = useReviews();

  const title = "Clients Reviews";
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  if (loadingReviews) {
    return <Loading></Loading>;
  }

  if (fetchedReviews.length > 0) {
    return (
      <div className="px-10 bg-[#a1dada41] rounded-lg my-10">
        <Title title={title}></Title>
        <div className="py-12">
          <Slider {...settings}>
            {fetchedReviews.map((review) => (
              <ReviewCard key={review._id} review={review}></ReviewCard>
            ))}
          </Slider>
        </div>
      </div>
    );
  } else {
    return <Nodata text={"No Bid Reviews Found"}></Nodata>;
  }
};

export default ClientReviews;
