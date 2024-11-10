/* eslint-disable react/prop-types */
import { Calender } from "@/assets/icons";
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  return (
    <Link
      to={`/orders/news/${news?.id}`}
      className="border p-4 rounded-lg"
      key={news?.name}
    >
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
      </div>
      <p className="text-sm text-gray-500">
        {news?.description?.length > 150
          ? news?.description.slice(0, 150) + "..."
          : news?.description}
      </p>
    </Link>
  );
};

export default NewsCard;
