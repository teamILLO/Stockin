import React, { useEffect, useState } from 'react';
import { Grid, Table } from 'semantic-ui-react';
import { api } from '../../api/index';
import './StockInfo.css';


const StockInfo = (props) =>{

    const [color, setColor] = useState({'color': '#777777'})
    const [title, setTitle] = useState('')
    const [info, setInfo] = useState('')
    const [price, setPrice] = useState('')
    const [variation, setVariation] = useState('')
    const [prev, setPrev] = useState('')
    const [open, setOpen] = useState('')
    const [high, setHigh] = useState('')
    const [low, setLow] = useState('')
    const [tradeVolume, setVol]  = useState('')
    const [tradeValue, setVal] = useState('')
    const [amount, setAmount] = useState('')


    useEffect(()=>{
        api.get('stocks/'+String(props.id)+'/').then((response) => {
            setTitle(response.data['title']);
            setInfo(response.data['isKOSPI']+' '+response.data['code']);
            setPrice(Number(response.data['price']).toLocaleString());
            if(Number(response.data['price'])-Number(response.data['yesterdayPrice']) < 0 ){
              setVariation(' ▼'+(Number(response.data['yesterdayPrice'])-Number(response.data['price'])).toLocaleString())
              setColor({'color':'#1c0ca8'});
            }
            else if(Number(response.data['price'])-Number(response.data['yesterdayPrice']) > 0){
              setColor({'color': '#f00101'});
              setVariation(' ▲'+(Number(response.data['price'])-Number(response.data['yesterdayPrice'])).toLocaleString())
            }
            else
                setVariation('0 ▲');

            setPrev(Number(response.data['yesterdayPrice']).toLocaleString());
            setOpen(Number(response.data['startPrice']).toLocaleString());
            setHigh(Number(response.data['highestPrice']).toLocaleString());
            setLow(Number(response.data['lowestPrice']).toLocaleString());
            setVol(Number(response.data['tradeVolume']).toLocaleString());
            setVal(Number(response.data['tradeValue']).toLocaleString());
            setAmount(Number(response.data['amount']).toLocaleString());
        });

    },[props])

    

    return(
    <div className='frame' data-testid='StockInfo'>
        <br/><br/><br/>
        <Grid  >
            <Grid.Column width={1}/>

            <Grid.Column width={6} textAlign='left'>
                <Grid.Row >
                    <span className='stock_title'>{title}</span>
                    <span className='stock_title_code'>{info}</span>
                </Grid.Row>
                <br/>
                <Grid.Row>
                    <span className='stock_price' style={color}>{price}</span>
                    <span className='stock_price_change' style={color}>{variation}</span>
                </Grid.Row>
            </Grid.Column>

            <Grid.Column floated={"right"} width={7}>
                <Grid.Row>
                    <Table basic='very' celled>
                        <Table.Body>
                        <Table.Row>
                            <Table.Cell><span className='stock_info_index'>전일</span><span className='stock_info_su'>{prev}</span></Table.Cell>
                            <Table.Cell><span className='stock_info_index'>시가</span><span className='stock_info_su'>{open}</span></Table.Cell>
                            <Table.Cell><span className='stock_info_index'>고가</span><span className='stock_info_su'>{high}</span></Table.Cell>
                            <Table.Cell><span className='stock_info_index'>저가</span><span className='stock_info_su'>{low}</span></Table.Cell>
                        </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Row>
                <br/>
                <Grid.Row>
                    <Table basic='very' celled>
                        <Table.Body>
                        <Table.Row>
                            <Table.Cell><span className='stock_info_index'>거래량</span><span className='stock_info_su'>{tradeVolume}</span></Table.Cell>
                            <Table.Cell><span className='stock_info_index'>거래대금</span><span className='stock_info_su'>{tradeValue}</span></Table.Cell>
                            <Table.Cell><span className='stock_info_index'>시가총액</span><span className='stock_info_su'>{amount}</span></Table.Cell>
                        </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Row>
            </Grid.Column>
            
        </Grid>
        
        <br/><br/><br/>
    </div>
        
    )


}

export default StockInfo;