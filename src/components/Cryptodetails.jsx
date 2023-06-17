import React,{useState} from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';

import {Col,Row,Typography,Select} from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined} from '@ant-design/icons';
import { useGetCryptoDetailsQuery , useGetCryptoHistoryQuery } from '../services/cryptoApi';

import LineChart from './LineChart';

const {Title,Text}=Typography;


const Cryptodetails = () => {
  const { uuid } = useParams();
  const {timeperiod,settimeperiod}=useState('7d')

  const { data, isfetching} = useGetCryptoDetailsQuery(uuid);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ uuid, timeperiod });

  const cryptodetails = data?.data?.coin;
  console.log(data);
  if (isfetching) return 'Loading..';
  
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptodetails?.price && millify(cryptodetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptodetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptodetails?.["24hVolume"] && millify(cryptodetails?.["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptodetails?.marketCap && millify(cryptodetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptodetails?.allTimeHigh?.price && millify(cryptodetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptodetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptodetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptodetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptodetails?.supply?.total && millify(cryptodetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptodetails?.supply?.circulating && millify(cryptodetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];



  return (
    <Col className="coin-detail-container">
    <Col className="coin-heading-container">
      <Title level={2} className="coin-name">
        {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
      </Title>
      <p>{cryptodetails?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
    </Col>
    <LineChart coinHistory={coinHistory} currentPrice={millify(cryptodetails?.price)} coinName={cryptodetails?.name} /> 
    <Col className="stats-container">
      <Col className="coin-value-statistics">
        <Col className="coin-value-statistics-heading">
          <Title level={3} className="coin-details-heading">{cryptodetails?.name} Value Statistics</Title>
          <p>An overview showing the statistics of {cryptodetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
        </Col>
        {stats?.map(({ icon, title, value }) => (
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text>{icon}</Text>
              <Text>{title}</Text>
            </Col>
            <Text className="stats">{value}</Text>
          </Col>
        ))}
      </Col>
      <Col className="other-stats-info">
        <Col className="coin-value-statistics-heading">
          <Title level={3} className="coin-details-heading">Other Stats Info</Title>
          <p>An overview showing the statistics of {cryptodetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
        </Col>
        {genericStats?.map(({ icon, title, value }) => (
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text>{icon}</Text>
              <Text>{title}</Text>
            </Col>
            <Text className="stats">{value}</Text>
          </Col>
        ))}
      </Col>
    </Col>
    <Col className="coin-desc-link">
      {/* <Row className="coin-desc">
        <Title level={3} className="coin-details-heading">What is {cryptodetails?.name}?</Title>
        {HTMLReactParser(cryptodetails?.description)}
      </Row> */}
      <Col className="coin-links">
        <Title level={3} className="coin-details-heading">{cryptodetails?.name} Links</Title>
        {cryptodetails?.links?.map((link) => (
          <Row className="coin-link" key={link.name}>
            <Title level={5} className="link-name">{link.type}</Title>
            <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
          </Row>
        ))}
      </Col>
    </Col>
  </Col>
  )
}

export default Cryptodetails