import GroupSection from "@/components/homeSection/groupSection";
import ProductSection, {
  GroupOrderList,
} from "@/components/homeSection/productSection";
import GroupPurchaseTab from "@/components/postList/groupPurchaseTab";
import MarketTab, { MarketItem } from "@/components/postList/marketTab";

interface TabContentProps {
  tabStatus: string;
  marketList?: MarketItem[];
  groupOrderList?: GroupOrderList[];
}

export default function TabContent({
  tabStatus,
  marketList = [],
  groupOrderList = [],
}: TabContentProps) {
  switch (tabStatus) {
    case "Home":
      return (
        <>
          <ProductSection marketList={marketList} />
          <GroupSection groupOrderList={groupOrderList} />
        </>
      );
    case "Market":
      return <MarketTab api={"hometab"} />;
    case "GroupPurchase":
      return <GroupPurchaseTab api={"hometab"} />;
    default:
      return null;
  }
}
