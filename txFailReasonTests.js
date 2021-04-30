const ethers = require('ethers');

function hex_to_ascii(str1) {
  var hex = str1.toString();
  var str = '';
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

// only works with full archive node
async function getTxFailReason() {
  var args = process.argv.slice(2);
  let hash = args[0];
  const providerUrl = process.env.HTTP_RPC;
  console.log('tx hash:', hash);
  console.log('provider:', providerUrl);
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  let tx = await provider.getTransaction(hash);
  if (!tx) {
    console.log('tx not found');
  } else {
    let code = await provider.call(tx, tx.blockNumber);
    let reason = hex_to_ascii(code.substr(138));
    console.log('revert reason:', reason);
  }
}

getTxFailReason();
// HTTP_RPC=http://localhost:8545 node txFailReasonTests.js txHash

