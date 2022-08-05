const normalizer =(arr)=>{
    return arr.map((p)=> p.buy_box_winner || p)
}

module.exports= normalizer;