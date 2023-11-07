import pic1 from "../../assets/Picture2.png";
import pic2 from "../../assets/Picture3.png";

const Banner = () => {
  return (
    <div className="h-screen bg-[url(../public/Picture1.png)] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center gap-6">
      <img src={pic1} alt="" className="w-1/4 absolute bottom-0 left-0" />
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
      <h1 className="text-[40px] font-bold leading-[60px]">Related services</h1>
      <img src={pic2} alt="" className="w-1/4 absolute top-10 right-10" />
    </div>
  );
};

export default Banner;
