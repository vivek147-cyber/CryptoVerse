import React from 'react'

import { Typography, Row, Col, Statistic } from 'antd';
import millify from 'millify';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from "../services/cryptoApi";
import {Cryptocurrencies,News} from './index';
const { Title } = Typography;

const Homepage = () => {
  const { data, isfetching } = useGetCryptosQuery(10);
  console.log(data);
  const globalstats = data?.data?.stats;
  console.log(globalstats);

  if (!globalstats || isfetching) return 'loading...';
  return (
    <>
      <Title level={2} className="heading">Global Crypto Statistics</Title>
      <Row>
        <Col span={12}><Statistic title="Total CryptoCurrencies" value={globalstats.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalstats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total MarketCap" value={millify(globalstats.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24hVolume" value={millify(globalstats.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalstats.totalMarkets)} /></Col>
      </Row>

      <div className="home-heading-container">
          <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
          <Title level={2} className='show-title'><Link to='/cryptocurrencies'>show more</Link></Title>   
      </div>
      <Cryptocurrencies simplified={true} />

      <div className="home-heading-container">
          <Title level={2} className='home-title'>Latest Crypto News</Title>
          <Title level={2} className='show-title'><Link to='/news'>show more</Link></Title>   
      </div>
      <News simplified />
    </>
  )
}

export default Homepage