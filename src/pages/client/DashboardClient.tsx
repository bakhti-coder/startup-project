import { useEffect } from "react";

import CardDataStats from "../../components/card/CardDataStats";
import ChartOne from "../../components/charts/ChartsOne";
import useEducation from "../../state/education";
import useSkills from "../../state/skills";

const DashboardClient = () => {
  const { total: skillsTotal, getData: getSkills } = useSkills();
  const { total: educationTotal, getData: getEducations } = useEducation();

  useEffect(() => {
    getEducations();
    getSkills();
  }, [getEducations, getSkills]);

  const ChartStatistks = [
    {
      title: "Educations",
      total: educationTotal,
      rate: "2.34%",
      img: "/images/education.png",
    },
    {
      title: "Skills",
      total: skillsTotal,
      rate: "1.34%",
      img: "/images/skills.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-2">
      {ChartStatistks.map((el) => (
        <CardDataStats title={el.title} total={el.total} rate={el.rate} levelUp>
          <img width={100} height={100} src={el.img} alt={el.title} />
        </CardDataStats>
      ))}
      <ChartOne />
    </div>
  );
};

export default DashboardClient;
