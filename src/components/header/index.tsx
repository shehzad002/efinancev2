import React, { useEffect, useState } from 'react';
import {web3, handleConnect} from './../wallet/web3';
import abi2 from '../abi/lp';


const Header: React.FC = () => {
    const [refresh, setRefresh] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [accounts, setAccounts] = useState<string[]>([]);
    const[busd,setBusd] = useState(0);
    const[tokenPrice,setTokenPrice] = useState(0);

    useEffect(() => {
       async function getData() {
         const response = await fetch(
           `https://min-api.cryptocompare.com/data/price?fsym=BUSD&tsyms=USD`
         )
         let busd = await response.json();
     
         console.log(busd.USD)
         setBusd(busd.USD); 
       }
       getData()
     }, [])


    useEffect(()=>{
        const interval = setInterval(()=>{setRefresh(!refresh)}, 1000);
        return ()=>{
          clearInterval(interval)
        }
      }, [])
    
      useEffect(()=>{
        const fetchAccounts = async ()=>{
          try{
    
            const _addresses = await web3.eth.getAccounts();
            setAccounts(_addresses)
          }catch(e){
            setAccounts([])
          }
        }
    
        fetchAccounts();
      },[refresh])
    
     
      useEffect(()=>{
        if(accounts.length > 0){
          setIsConnected(true);
        }else{
          setIsConnected(false)
        }
      }, [accounts])


      useEffect(()=>{
       const Api = async () => {
        const tokenPrice = await abi2.methods.price1CumulativeLast().call();
        console.log(tokenPrice)
        setTokenPrice(tokenPrice);
       
       }

       Api();
      }, [])



    return(
         <>
          <div style={{background:"#061d3d"}}>
         <div className="container">
             <div className="jumbotron">
                  <h1 style={{color:"#fff",fontWeight: "bold"}}>EARNING DASHBOARD</h1>
                  {!isConnected ?
    <button onClick={e=>{e.preventDefault(); handleConnect()}} className="btn btn-info btn-lg" >Connect</button>
    :
    <>
  
    <button onClick={e=>{e.preventDefault()}} className="btn btn-info btn-lg">Connected</button>
  </>
  }
                  
                  </div>
                
 
                  
          
             </div>
             <br />
        <div className="alert alert-primary" style={{background: "#4aaee7"}}>
            <br />
             <div className="row">
                  <div className="col-sm-3"> 
                 <p> <div className="badge bg-info">EBIRD: {Number(tokenPrice / 1e18).toFixed(2)}</div></p>
                    </div>
                  <div className="col-sm-3">
                   <p> <div className="badge bg-info"> MCAP: 0.00$</div></p>
                  </div>
                  <div className="col-sm-3">
                  <p> <div className="badge bg-info"> LP: 0.00$</div></p>
                  </div>
                  <div className="col-sm-3">
                  <p> <div className="badge bg-info">  BUSD: {busd}$</div></p>
                  </div>
                  </div>
             </div>



<br />

         </div>
     
     
         
         </>
    )
}

export default Header;