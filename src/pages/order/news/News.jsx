import { Bin, Calender, Eye, Pencil } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { t } from "i18next";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

const News = () => {
  const newsData = [
    {
      name: "Service Name 1",
      date: "12/Jan/2024",
      views: "39",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzs4DX9SbMr4h0ASCtO1fHXODlCqjLqwzM0w&s",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nemo? Quis corporis voluptate error assumenda porro id dolorum dolores quos tenetur aliquid deleniti alias vitae et pariatur.",
    },
    {
      name: "Service Name 2",
      date: "15/Feb/2024",
      views: "58",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzs4DX9SbMr4h0ASCtO1fHXODlCqjLqwzM0w&s",
      description:
        "Aliquam vitae quam nisi. Fugit minus sint, pariatur voluptatem laborum atque perspiciatis delectus ea voluptas incidunt, quidem rerum modi autem.",
    },
    {
      name: "Service Name 3",
      date: "20/Mar/2024",
      views: "92",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzs4DX9SbMr4h0ASCtO1fHXODlCqjLqwzM0w&s",
      description:
        "Necessitatibus itaque dolore praesentium ex, earum harum! Iste perspiciatis voluptatem aliquid ratione labore dolorum nulla sit odit vel neque.",
    },
    {
      name: "Service Name 4",
      date: "10/Apr/2024",
      views: "120",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzs4DX9SbMr4h0ASCtO1fHXODlCqjLqwzM0w&s",
      description:
        "Dolores asperiores optio, repellendus nobis veritatis distinctio modi! Est vitae saepe quasi adipisci officia aspernatur necessitatibus nemo delectus.",
    },
    {
      name: "Service Name 5",
      date: "03/May/2024",
      views: "65",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzs4DX9SbMr4h0ASCtO1fHXODlCqjLqwzM0w&s",
      description:
        "Quidem quaerat impedit sit eligendi, tempora dolorum nostrum eveniet non molestiae voluptates dolore nesciunt recusandae officia reiciendis!",
    },
    {
      name: "Service Name 6",
      date: "25/Jun/2024",
      views: "74",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzs4DX9SbMr4h0ASCtO1fHXODlCqjLqwzM0w&s",
      description:
        "Quasi accusantium deleniti dolorem quibusdam, sit fuga rem maiores sequi. Aspernatur quaerat explicabo cupiditate velit. Tempore voluptas fugit quia.",
    },
    {
      name: "Service Name 7",
      date: "15/Jul/2024",
      views: "150",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzs4DX9SbMr4h0ASCtO1fHXODlCqjLqwzM0w&s",
      description:
        "Sint obcaecati non quos quae, aspernatur reiciendis, deleniti dolorum iusto consequatur nobis sapiente. Architecto veritatis placeat eos fugiat.",
    },
    {
      name: "Service Name 8",
      date: "08/Aug/2024",
      views: "88",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzs4DX9SbMr4h0ASCtO1fHXODlCqjLqwzM0w&s",
      description:
        "Adipisci culpa quam similique fugiat dolorem suscipit obcaecati, pariatur vero aperiam. Distinctio beatae, maxime illum voluptate voluptatem harum.",
    },
    {
      name: "Service Name 9",
      date: "19/Sep/2024",
      views: "132",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzs4DX9SbMr4h0ASCtO1fHXODlCqjLqwzM0w&s",
      description:
        "Labore ex, illo quaerat nostrum accusamus dicta doloribus nihil veritatis, facilis, obcaecati possimus. Eligendi eveniet praesentium dolores!",
    },
    {
      name: "Service Name 10",
      date: "30/Oct/2024",
      views: "47",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzs4DX9SbMr4h0ASCtO1fHXODlCqjLqwzM0w&s",
      description:
        "Sequi minus voluptates nemo fuga porro accusamus architecto, veritatis unde. Eius, quibusdam deleniti. Debitis fuga hic quaerat non!",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <p className="text-xl font-semibold">News</p>
        <Link to={``}>
          <Button className="flex items-center gap-1">
            <Plus /> Add News
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-between gap-5 mt-4">
        <div className="flex items-center justify-between gap-2">
          <Button>News</Button>
          <Button variant="outline">Monatsplan</Button>
          <Button variant="outline">Teamsitzung</Button>
        </div>
        <div className="relative">
          <Input
            placeholder="Search"
            className="w-full lg:w-72 h-10"
          />
          <Search className="absolute right-2 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {newsData?.map((news) => (
          <div className="border p-4 rounded-lg" key={news?.name}>
            <h3 className="text-xl font-medium mb-3">{news?.name}</h3>
            <img
              src={news?.image}
              className="w-full h-44 object-cover rounded-lg"
              alt=""
            />
            <div className="flex items-center justify-between gap-5 my-4">
              <div className="flex items-center gap-2 text-sm">
                <Calender />
                {news?.date}
              </div>
              <div className="flex items-center gap-2">
                <Eye />
                <p className="text-xs">{news?.views} Views</p>
                <Pencil className="cursor-pointer"/>
                <Bin className="cursor-pointer" />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {news?.description?.length > 150
                ? news?.description.slice(0, 150) + "..."
                : news?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
