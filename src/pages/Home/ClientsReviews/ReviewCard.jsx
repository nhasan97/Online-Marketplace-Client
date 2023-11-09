import PropTypes from "prop-types";
import "./Review.css";

const ReviewCard = ({ review }) => {
  const { image, name, clientDesignation, say } = review;

  return (
    <div className="card bg-base-100 mx-3 bg-[url('../public/Ellipse2.png')] bg-contain bg-no-repeat bg-top rounded-full shadow-xl">
      <div className="w-full h-32 flex justify-center items-center relative">
        <img
          src={image}
          alt="Movie"
          className="w-24 h-24 rounded-full border-8 border-white absolute translate-y-[40%]"
        />
      </div>

      <div className="card-body justify-center items-center">
        <h2 className="card-title font-bold">{name}</h2>
        <p className="font-semibold">{clientDesignation}</p>
        <p className="text-preview text-center" title={say}>
          {say}
        </p>
        <div className="card-actions justify-end">
          <div className="rating">
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              checked
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewCard;
