import { useEffect } from "react";

import CardDataStats from "../../components/card/CardDataStats";
import ChartOne from "../../components/charts/ChartsOne";
import useEducation from "../../state/education";
import useExperiences from "../../state/experiences";
import usePortfolios from "../../state/portfolios";
import useSkills from "../../state/skills";
import useUser from "../../state/user";

const DashboardPage = () => {
  const { total: userTotal, getData: getUsers } = useUser();
  const { total: educationTotal, getData: getEducations } = useEducation();
  const { total: expriencesTotal, getData: getExperienses } = useExperiences();
  const { total: portfoliosTotal, getData: getPortfolios } = usePortfolios();
  const { total: skillsTotal, getData: getSkills } = useSkills();

  useEffect(() => {
    getUsers();
    getEducations();
    getExperienses();
    getPortfolios();
    getSkills();
  }, [getUsers, getEducations, getExperienses, getPortfolios, getSkills]);

  const ChartStatistks = [
    {
      title: "Users",
      total: userTotal,
      rate: "4.34%",
      img: "/images/user.jpg",
    },
    {
      title: "Educations",
      total: educationTotal,
      rate: "2.34%",
      img: "/images/education.png",
    },
    {
      title: "Portfolios",
      total: portfoliosTotal,
      rate: "2.01%",
      img: "/images/projects.png",
    },
    {
      title: "Experiences",
      total: expriencesTotal,
      rate: "2.4%",
      img: "/images/experience.png",
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

export default DashboardPage;
