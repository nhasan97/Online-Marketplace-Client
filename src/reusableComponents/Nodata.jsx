const Nodata = ({ text }) => {
  return (
    <div className="max-w-screen-xl mx-auto px-20">
      <div className="w-full h-screen flex flex-col justify-center items-center p-10 mt-16">
        <h1 className="text-6xl font-semibold">{text}</h1>
      </div>
    </div>
  );
};

export default Nodata;
