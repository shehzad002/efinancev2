
import React, { useEffect, useState } from 'react';
import {web3} from '../wallet/web3';
import abi from '../abi/index';
import busdAbi from '../abi/busd';

const Cards: React.FC = () => {
    const[balanceOf,setBalanceOf] = useState(0);
    const[accounts, setAccounts] = useState<string[]>();
    const[unPaid,setUnPaid] = useState(0);
	const[user,setUser] = useState(0);
	const[maxValue , setmaxValue] = useState(0);
    const[value,setValue] = useState('');
    const[busd,setBusd] = useState(0);
	const[busdBalance,setbusdBalance] = useState(0);
	const[maxTx,setMaxTx] = useState(0);

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

   

    useEffect(() => {
        const CardValue  = async () => {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0])
          const maxValue = await abi.methods._maxWalletToken().call();
		  const maxTx = await abi.methods._maxTxAmount().call();
            if(accounts.length >0) {
          const balanceOf = await abi.methods.balanceOf(accounts[0]).call();
		  const unPaid = await abi.methods.balanceOf(accounts[0]).call();
		  const user = await abi.methods.isAuthorized(accounts[0]).call();
		  const busdBalance = await busdAbi.methods.balanceOf(accounts[0]).call();
          
		  
		  setbusdBalance(busdBalance)
		  
		  setUser(user)
          setUnPaid(unPaid)
          setAccounts(accounts)
          setBalanceOf(balanceOf)
          
          
        }
          setmaxValue(maxValue)
		  setMaxTx(maxTx)
          

          // const CurrentPrice = web3.utils.fromWei(Price, 'ether');
    
         
        
         
          
        };
        CardValue();
    });
       


       
            const cLaim = async (e:any) => {
                e.preventDefault();
                const accounts = await web3.eth.getAccounts();
                await abi.methods.claimDividend().send({
                    from: accounts[0],
                });
            }

          
       


    return(
         <>
         <div style={{background:"#061d3d"}}>
             <br />
         <div className="container">
           <div className="row">
                  <div className="col-sm-4"> 
                   <div className="card">
                       <div className="badge bg-info"><h4>User Status</h4></div>
                       <h3>{user ? "Whitelisted" : "Banned"}</h3>
                       <p>Your Status</p>
                   </div>
                    </div>
                  <div className="col-sm-4">
                  <div className="card">
                  <div className="badge bg-info">    <h4>Balance</h4></div>
                       <h3>{Number(balanceOf / 1e9).toFixed(2)}</h3>
                       <p>EBIRD</p>
                   </div>
                  </div>
                 
                  <div className="col-sm-4">
                  <div className="card">
                  <div className="badge bg-info">  <h4>UnPaid Dividends</h4></div>
                       <h3>{unPaid}</h3>
                       <p>BUSD</p>
                   </div>
                  </div>

            
			  
			  
			  
                  <div className="col-sm-4">
                  <div className="card">
                  <div className="badge bg-info">  <h4>BUSD Balance</h4></div>
                       <h3>{Number(busdBalance / 1e18).toFixed(2)}</h3>
                       <p>BUSD</p>
                   </div>
                  </div>
				  
				  
				    <div className="col-sm-4">
                  <div className="card">
                  <div className="badge bg-info">  <h4>Max Wallet Balance</h4></div>
                       <h3>{Number(maxValue / 1e9).toFixed(2)}</h3>
                       <p>EBIRD</p>
                   </div>
                  </div>
				  
				  
				   <div className="col-sm-4">
                  <div className="card">
                  <div className="badge bg-info">  <h4>Max Tx Amount</h4></div>
                       <h3>{Number(maxTx / 1e9).toFixed(2)}</h3>
                       <p>EBIRD</p>
                   </div>
                  </div>
			


              </div>

               

            <br />
               



                 <br />
                



                 
                 <br />
                 <div className="jumbotron">
                      <div className="col-sm-12">
                           
                            <div className="card">
                            <div className="badge bg-info">  <h2>REWARDS</h2></div> <br />
                                <h3>CLAIM YOUR BUSD NOW</h3>
                                       <form onSubmit={cLaim}>
                                      <button className="btn btn-primary">CLAIM</button>
                                      </form>

                                 <p>Need at least 10 million EBIRD for automatic claim</p>
                             </div>
                      </div>
                       
                 </div>


                 <br />
                
                 <br /> <br />

                  </div>
                  </div>
         </>
    )
}

export default Cards;