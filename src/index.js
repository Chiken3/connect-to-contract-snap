wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  async function getFees() {
    let response = await fetch('https://www.etherchain.org/api/gasPriceOracle');
    return response.text();
  }
  switch (requestObject.method) {
    case 'hello':
      const fees1 = await getFees();
      const fees = JSON.parse(await getFees());
      const baseFee = parseFloat(fees.currentBaseFee); 
      const safeLow = Math.ceil(baseFee + parseFloat(fees.safeLow)); 
      const standard = Math.ceil(baseFee + parseFloat(fees.standard)); 
      const fastest = Math.ceil(baseFee + parseFloat(fees.fastest));
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Gas Fees`,
            description:
              'Current Gas Fees from etherchain.org:',
            textAreaContent:
              'Low: '+safeLow+"\n"+
              'Average: '+standard+"\n"+
              'High: '+fastest
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
});
