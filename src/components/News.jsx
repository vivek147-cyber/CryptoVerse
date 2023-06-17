import {React,useState} from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, Row , Col,Select,Typography,Avatar} from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';


const {Text,Title} = Typography;
const {Option }= Select;
const News = ({simplified}) => {

  const [newsCategory,setnewsCategory] = useState('Cyrptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({newsCategory, count:simplified?6:12});
  const { data} = useGetCryptosQuery(100);
 
  console.log(cryptoNews);
  // console.log(cryptoList?.data?.coins);
  if (!cryptoNews?.value) return 'loading...';
  return (
     <>
    <Row gutter={[24,24]}>
        {!simplified && (
          <Col span={24}>
            <Select
             className='select-news'
             placeholder='select a Crypto'
             optionFilterProp='children'
             onChange={(value)=> setnewsCategory(value)}
             filterOption={(input,option)=> option.children.toLowerCase().indexOf(input.toLocaleLowerCase()) >= 0}>
              <option value="Cyrptocurrency">Cyrptocurrency</option>
              {data?.data?.coins.map((coin)=> <option value={coin.name}>{coin.name}</option>)}
            </Select>
          </Col>
        )}
    </Row>

    <Row gutter={[24,24]}>
    {cryptoNews?.value.map((news,i)=>(
      <Col xs={24} sm={12} lg={6} className='crypto-card' key={i}>
          <Card className='news-card' hoverable >
           <a href={news.url} target="_blank" rel="noreferrer">

            <div>
              <img  style={{ maxWidth:'90%' }} src={news?.image?.thumbnail?.contentUrl} alt="news" />
              <Title level={4}>{news.name}</Title>
            </div>
           </a>
          </Card>
    
      </Col>
    ))}
   </Row>
   </>
  )

}

export default News