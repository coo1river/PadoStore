import { GroupOrderList } from "@/components/homeSection/productSection";
import { MarketItem } from "@/components/postList/marketTab";

export interface HomeList {
  post_id: number;
  user_id: string;
  board_type: string;
  title: string;
  content: string;
  file_group_id: string;
  view_count: number;
  insert_dt: string;
  update_dt: string | null;
  post_status: string;
}

export interface HomeData {
  groupOrderList: GroupOrderList[];
  marketList: MarketItem[];
}

export interface HomeTabProps {
  marketList?: MarketItem[];
  groupOrderList?: GroupOrderList[];
}
