const {
  Worker,
  isMainThread,
  getEnvironmentData,
  parentPort,
} = require('worker_threads');

// BlockingSleep
blockingSleep = (ms) => {const start = Date.now(); while (Date.now() < (start + ms));};

blockingFibonacciMainThreadCheck =  async (limit = 10, sleepSeconds = 1) => {
  
  if (isMainThread) {
    throw new Error(`Don't call me from the main thread or face the doom`);
  }
  if ([0,1].includes(limit)) {
    return limit;
  }
  
  let first = 0; 
  let second = 1; 
  let nth = 1; 

  for (let i = 2; i <= limit; i++) { 
    nth = first + second; 
    first = second; 
    second = nth;
    blockingSleep(sleepSeconds*1000);   
  } 

  return nth;
}

parentPort.on('message',(message) => {
  if (message==='Are you alive?') 
  {
    console.log('Yes');
  };
});

console.log('Worker is Active');
if (getEnvironmentData('limit')) {
  console.log(`Running with Param (${getEnvironmentData('limit')})`);
  blockingFibonacciMainThreadCheck(getEnvironmentData('limit')).then((value)=> console.log(value))
}
else {
  console.log('Running with Defaults (10)');
  blockingFibonacciMainThreadCheck().then((value)=> console.log(value))
}