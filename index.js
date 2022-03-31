/**
 * @tutorial Workers
 * @description Tutorial and Explanations for using Workers in NodeJS
 * @author: Ezequiel Mariano Gorbatik
 */

 const {
  Worker,
  isMainThread,
  setEnvironmentData,
  getEnvironmentData,
} = require('worker_threads');
/**  Fibonacci to simulate a Heavy Task */

/**  
 * @description Fibonacci without recursion as is 
 */

fibonacci =  (limit = 10) => {
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
  } 

  return nth;
}

/**  
 * @description Fibonacci without recursion as promise
 */

fibonacciAsync =  async (limit = 10) => fibonacci(limit);


/**  
 * @description Fibonacci async with sleep seconds nonBlocking
 */

// Non Blocking Sleep
sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// BlockingSleep
blockingSleep = (ms) => {const start = Date.now(); while (Date.now() < (start + ms));};

unBlockingFibonacci =  async (limit = 10, sleepSeconds = 1) => {
  
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
    await sleep(sleepSeconds*1000);   
  } 

  return nth;
}

/**  
 * @description Fibonacci async with sleep seconds blocking
 */

blockingFibonacci =  async (limit = 10, sleepSeconds = 1) => {
  
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

/**  
 * @description Fibonacci async with sleep seconds blocking
 */

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

exampleAsIs = () => {
  console.log('10th Fibonacci')
  console.log(fibonacci(10));
  console.log('Finish');
}

exampleAsyncPromise = () => {
  console.log('10th Fibonacci')
  console.log(fibonacciAsync(10));
  console.log('Finish');
}

exampleAsyncPromiseThen = () => {
  console.log('10th Fibonacci')
  fibonacciAsync(10).then((value)=> console.log(value));
  console.log('Finish');
}

exampleAsyncPromiseUnblocking = () => {
  console.log('10th Fibonacci')
  unBlockingFibonacci(10,1).then((value)=> console.log(value));
  console.log('Finish');
}

exampleAsyncBlocking = () => {
  console.log('10th Fibonacci')
  blockingFibonacci(10,1).then((value)=> console.log(value));
  console.log('Finish');
}

exampleAsyncBlockingCallMainThread = () => {
  console.log('10th Fibonacci')
  blockingFibonacciMainThreadCheck(10,1)
    .then((value)=> console.log(value))
    .catch((err)=> console.error(err.message));
  console.log('Finish');
}

exampleAsyncBlockingCallThread = () => {
  console.log('10th Fibonacci')
  new Worker('./workerExampleTutorial.js')
  console.log('Finish');
}

exampleAsyncBlockingCallThreadWithEnvironment = () => {
  console.log('10th Fibonacci')
  setEnvironmentData('limit',5)
  new Worker('./workerExampleTutorial.js')
  console.log('Finish');
}

exampleAsyncBlockingCallThreadPostingMessage = () => {
  console.log('10th Fibonacci')
  const worker = new Worker('./workerExampleTutorial.js')
  sleep()
  setTimeout(()=> worker.postMessage('Are you alive?'), 3000);
  console.log('Finish');
}

//exampleAsIs();

//exampleAsyncPromise();

//exampleAsyncPromiseThen();

//exampleAsyncPromiseUnblocking();

//exampleAsyncBlocking();

//exampleAsyncBlockingCallMainThread();

//exampleAsyncBlockingCallThread();

//exampleAsyncBlockingCallThreadWithEnvironment()

exampleAsyncBlockingCallThreadPostingMessage();