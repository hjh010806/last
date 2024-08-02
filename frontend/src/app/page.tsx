'use client'

import { useEffect, useState } from "react";
import { getArticleList } from "@/app/API/UserAPI";

export default function Home() {
  const [articleList, setArticleList] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(false);
  const [temp, setTemp] = useState(0);
  // 필요한 요청 파라미터를 조립하여 api로 부터 데이터 받아와 업데이트하는 함수
  const getWeather = () => {
      const key =
          "paJ%2BM8y80vWX8Gu5RWTDurJ0y5rQCX4tjEwLh0F%2FwfUABNbw%2BV2iJD%2FBahqq08K%2BvzgPyAU0GFZ84LmVfEDPgA%3D%3D";

      const dd = new Date();
      const y = dd.getFullYear();
      const m = ("0" + (dd.getMonth() + 1)).slice(-2);
      const d = ("0" + dd.getDate()).slice(-2);
      const ds = y + m + d;

      const dd2 = new Date();
      const h = ("0" + dd2.getHours()).slice(-2);
      const ts = `${h}00`;

      var url =
          "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey= " +
          key +
          "&pageNo=1&numOfRows=1000&dataType=JSON" +
          "&base_date=" +
          ds +
          "&base_time=" +
          ts +
          "&nx=67&ny=100";

      fetch(url)
          .then((res) => res.json())
          .then((data) => {
              console.log(data.response.body.items.item);
              const itemArr = data.response.body.items.item;
              const result = {};
              itemArr.forEach((item:any) => {
                  if (item.category === "T1H") {
                      setTemp(item.obsrValue);
                  }
              });
          })
          .catch((err) => console.log(err));
  };
  useEffect(() => {
    getArticleList()
      .then((r) => {
        setArticleList(r)
        const interval = setInterval(() => { setIsLoading(true); clearInterval(interval) }, 300);
      })
      .catch(e => console.log(e));
  }, [articleList])

  return (
    <div className="h-auto w-full bg-white text-black flex flex-col items-center p-4">
      <div className="mb-4 text-lg">현재기온 : {temp}</div>
      <div className="mb-6">
        <a href="/article/create">
          <div className="bg-red-400 w-full max-w-xs text-center py-2 px-4 rounded hover:bg-red-500 cursor-pointer">
            게시물 생성
          </div>
        </a>
      </div>
      <table className="table-auto w-full max-w-4xl bg-white border border-gray-300 rounded">
        <thead>
          <tr className="h-12 bg-gray-200 border-b-2 border-gray-500">
            <th className="px-4 py-2 text-left">번호</th>
            <th className="px-4 py-2 text-left">제목</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {articleList.map((article) => (
            <tr key={article?.id} className="border-b border-gray-300 hover:bg-gray-100">
              <td className="px-4 py-2">{article.id}</td>
              <td className="px-4 py-2">
                <a href={`/article/${article.id}`} className="text-blue-500 hover:underline">
                  {article.title}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
