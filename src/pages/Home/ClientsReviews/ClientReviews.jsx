import { useEffect } from "react";
import { useState } from "react";
import Title from "../../../reusableComponents/Title";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReviewCard from "./ReviewCard";

const ClientReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://b8-a11-online-marketplace-server.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  const title = "Clients Reviews";
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className="px-10 bg-[#a1dada41] rounded-lg my-10">
      <Title title={title}></Title>
      <div className="py-12">
        <Slider {...settings}>
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review}></ReviewCard>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ClientReviews;
