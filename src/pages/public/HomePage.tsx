import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section>
      <Parallax
        className="h-[92vh]"
        bgImage="/images/backgrounf.jpg"
        bgImageStyle={{ objectFit: "cover" }}
        strength={200}
      >
        <div className="container max-w-1200">
          <div className="my-32  max-w-708">
            <h1 className="mb-6 text-white text-5xl font-extrabold leading-7 tracking-wider uppercase">
              Portfolio site
            </h1>
            <p className="mb-10 text-gray-500 leading-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
              neque tempore iste voluptatem, distinctio sit animi est,
              reprehenderit quaerat repellat iure fuga error repudiandae quia
              ipsum ipsam illum aspernatur praesentium quas soluta aperiam
              quidem minima atque. Iste sed, ullam ab quam, nihil ad sunt
              reiciendis repellat, dolores quod dolorem magni?
            </p>
            <Link to="/messages">
              <button className="py-2 px-5 rounded-md bg-[#c9453b] border-none cursor-pointer text-white text-sm leading-5">
                Contact us
              </button>
            </Link>
          </div>
        </div>
      </Parallax>
    </section>
  );
};

export default HomePage;
