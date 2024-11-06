import { newsData } from "@/components/news/helpers";
import NewsCard from "@/components/news/NewsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { t } from "i18next";

const News = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <p className="text-xl font-semibold">{t("news")}</p>
      </div>
      <div className="flex items-center justify-between gap-5 mt-4">
        <div className="flex items-center justify-between gap-2">
          <Button>{t("news")}</Button>
        </div>
        <div className="relative">
          <Input placeholder="Search" className="w-full lg:w-72 h-10" />
          <Search className="absolute right-2 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {newsData?.map((news) => (
          <NewsCard key={news?.name} news={news} />
        ))}
      </div>
    </div>
  );
};

export default News;
