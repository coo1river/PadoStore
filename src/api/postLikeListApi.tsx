import axios from "axios";

interface Favorite {
  board_type: string;
  insert_dt: string;
  nickname: string;
  post_id: number;
  title: string;
}

export interface FavoriteList {
  favoriteList: Favorite[];
  totalCount: number;
}

export default async function postLikeListApi(
  limit: number,
  current_page: number
) {
  const url = "/api/my-page/favorite/list";

  try {
    const res = await axios.get(url, {
      params: {
        limit,
        current_page,
      },
      headers: {
        Authorization: sessionStorage.getItem("userToken"),
      },
    });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
