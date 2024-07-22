import axios from "axios";

interface Favorite {
  user_id: string | null;
  board_type: string | null;
  post_status: string | null;
  current_page: number;
  limit: number;
  offset: number;
  sort_by: string | null;
  order: string | null;
  searchItem: string | null;
  favorite_id: number;
  post_id: number;
  favorite_user_id: string;
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
