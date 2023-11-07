import pic1 from "../../assets/Picture2.png";
import pic2 from "../../assets/Picture3.png";

const Banner = () => {
  return (
    <div className="h-screen bg-[url(../public/Picture1.png)] bg-no-repeat bg-center bg-cover flex justify-center items-center">
      <img
        src={pic1}
        alt=""
        className="w-1/4 absolute bottom-20 left-10"
        data-aos="fade-right"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      />
      <div
        className="flex flex-col justify-center items-center gap-6"
        data-aos="zoom-in"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      >
        <h1 className="text-center text-[40px] font-bold leading-[60px]">
          Join your one stop marketplace <br />
          to get/provide creative
        </h1>
        <div className="flex justify-center items-center gap-3 text-xl font-semibold">
          Web Development
          <span className="p-2 rounded-full bg-[#323384]"></span> Digital
          Marketing
          <span className="p-2 rounded-full bg-[#ff5c11dc]"></span>
          Graphic Design
        </div>
        <h1 className="text-[40px] font-bold leading-[60px]">
          Related services
        </h1>
      </div>

      <img
        src={pic2}
        alt=""
        className="w-1/4 absolute top-20 right-24"
        // data-aos="fade-down-left"
        // data-aos-delay="50"
        // data-aos-duration="1000"
        // data-aos-easing="ease-in-out"
        // data-aos-mirror="true"
      />
    </div>
  );
};

export default Banner;
