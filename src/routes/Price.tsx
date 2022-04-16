import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

const Overview = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 20px;
  span {
    font-weight: 600;
  }
`;

const Span = styled.span`
`;

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}


interface ChartProps {
  coinId?: string;
}
function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IPriceData>(["price", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 10000,
    }
  );
  const setData = data?.quotes.USD;
  return (
  <div>{isLoading ? (
    "Loading chart..."
  ) : (
    <>
    <Overview>
            <OverviewItem>
              <Span>Live Price : {setData?.price.toFixed(2)}$</Span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
                <span>
                  Today Volum : {setData?.volume_24h_change_24h}%
                </span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
                <span>
                  Change 24 Hour : {setData?.percent_change_24h}%
                </span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
                <span>
                  Change 7 Day : {setData?.percent_change_7d}%
                </span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
                <span >
                  Change 1 Month : {setData?.percent_change_30d}%
                </span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
                <span>
                  Change 1 Year : {setData?.percent_change_1y}%
                </span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <Span>Best Price : {setData?.ath_price.toFixed(2)}$</Span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <Span>
                Best Price Date : {setData?.ath_date.substring(0, 10)}
              </Span>
            </OverviewItem>
          </Overview>
          </>
  )}
  </div> 
  )
} 


export default Price;