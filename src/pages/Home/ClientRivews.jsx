import { useEffect } from "react";
import { useState } from "react";
import Title from "../../reusableComponents/Title";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import RiviewCard from "./RiviewCard";

const ClientRivews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("clientReviews.json")
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
    <div className="px-10 bg-[#a1dada41] rounded-lg border my-10">
      <Title title={title}></Title>
      <div className="py-12">
        <Slider {...settings}>
          {reviews.map((review) => (
            <RiviewCard key={review.id} review={review}></RiviewCard>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ClientRivews;
