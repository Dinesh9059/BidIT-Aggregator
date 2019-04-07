function executeOrders(){
    console.log("Onclick Exec");
    try{
        let Sellurl = "http://localhost:3001/api/aggregator";
        axios.get(Sellurl).then(res=>{                    
            if(res && !res.errMessage && res.status === 200){
                res = res.data;
                console.log(res);
                generateCards(res.execOrders,"ExecOrders","Executed Orders");
                generateCards(res.unExecOrders,"NonOrders","UnExecuted Orders");
            }else{
                alert("No Execution data present.");
            }            
        }).catch(err=>{
            alert("Failed to create Sell order: ",err);
        })
    }catch(e){
        console.log("Exception in executing orders");
    }
}
function generateCards(res,id,type){
    try{        
        let holder = document.getElementById(id);                    
        if(res){                
            let tot_str = "";
            let div_str = "<h1>"+type+" Orders</h1>";                
            tot_str = div_str;
            for(let i=0;i<res.length;i++){  
                let card = "<div class=\"card\" style=\"width: 24rem;\"><div class=\"card-body\">";                  
                let header =  "<h5 class=\"card-title\">"+res[i].itemName+"</h5>"
                let cardContent = "<p class=\"card-text\">Price: "+res[i].price+"$</p><p class=\"card-text\">Created Time: "+res[i].orderCreatedTime+"</p>"; 
                let bidUsers = "";
                for(let i=0;i<res[i].bidUsers.length;i++){
                    bidUsers +=  res[i].bidUsers[i].email+"( "+res[i].bidUsers[i].bidPrice+" )  ";
                }                
                let execUser = "";               
                for(let i=0;i<res[i].maxPricedBid.length;i++){
                    execUser +=  res[i].maxPricedBid[i].email+"( "+res[i].maxPricedBid[i].bidPrice+" )  ";
                } 
                bidUsers = "<p class=\"card-text\">Bid Users: "+bidUsers+"</p>";
                execUser = "<p class=\"card-text\">Executed User: "+execUser+"</p>";
                card += header+cardContent+bidUsers+execUser+"</div></div>";
                tot_str += card;
            }                         
            holder.innerHTML = tot_str;
        }else{
            let no_lbl = "<h1>"+type+" Orders</h1><label id = \"noData\" class=\"fileContainer\">No Order Data!</label>"                
            holder.innerHTML = no_lbl;
        }        
    }catch(e){
        console.log("Exception in geneteCards: ",e);
    }
}

function logout(){
    document.cookie = "";
    window.location.href = 'index.html';
}