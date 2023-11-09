import Title from "../../reusableComponents/Title";
import p1 from "../../assets/high-quality.png";
import p2 from "../../assets/pay.png";
import p3 from "../../assets/trust.png";

const WhyUs = () => {
  const title = "Why Choose Us";
  return (
    <div className="py-10">
      <Title title={title}></Title>
      <div className="grid grid-cols-3 gap-6  py-10">
        <div className="card  bg-[#323484] text-white hover:shadow-xl">
          <figure className="px-10 pt-10">
            <img src={p1} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Trusted quality</h2>
            <p>
              Check any pro’s work samples, client reviews, and identity
              verification.
            </p>
            {/* <div className="card-actions">
              <button className="btn btn-primary">Buy Now</button>
            </div> */}
          </div>
        </div>

        <div className="card  bg-[#323484] text-white hover:shadow-xl">
          <figure className="px-10 pt-10">
            <img src={p2} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Pay only after hiring</h2>
            <p>
              Interview potential fits for your job, negotiate rates, and only
              pay for work you approve.
            </p>
            {/* <div className="card-actions">
              <button className="btn btn-primary">Buy Now</button>
            </div> */}
          </div>
        </div>

        <div className="card  bg-[#323484] text-white hover:shadow-xl">
          <figure className="px-10 pt-10">
            <img src={p3} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Trusted and safe</h2>
            <p>
              Focus on your work knowing we help protect your data and privacy.
              We’re here with 24/7 support if you need it.
            </p>
            {/* <div className="card-actions">
              <button className="btn btn-primary">Buy Now</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
