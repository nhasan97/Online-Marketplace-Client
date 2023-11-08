const RiviewCard = ({ review }) => {
  const { id, image, name, clientDesignation, say } = review;
  return (
    <div className="card card-side bg-base-100 shadow-xl mx-3">
      <figure>{/* <img src={image} alt="Movie" /> */}</figure>
      <div className="card-body">
        <h2 className="card-title font-bold">{name}</h2>
        <p className="font-semibold">{clientDesignation}</p>
        <p>{say}</p>
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

export default RiviewCard;
