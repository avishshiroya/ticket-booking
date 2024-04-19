import { Redis } from "ioredis";
const client = new Redis({
    'port': process.env.REDIS_PORT,
    'host': '127.0.0.1'
})

client.on("error", (err) => {
    console.log(err);
});
// const connect = await client.connect();
client.on("connect", function () {
    console.log("redis connected");
    // console.log(`connected`);
});

export const setRedis = async (key, data) => {
  client.set(key, JSON.stringify(data),'EX',5*60);
};

export const getRedis = async(key) => {
  return new Promise((resolve,reject)=>{
    const cache=  client.get(key,(err,data)=>{
      if(err){
        reject( err)
      }
      else{
        resolve( data)
      }
    });
  }) 
  
// console.log(cache.then((cache)=>console.log(cache)))
}