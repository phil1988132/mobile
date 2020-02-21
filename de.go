package main

import(
    _"errors"
    _"fmt"
    "os"
    "strings"
    "github.com/go-redis/redis"
)

func main(){
	if len(os.Args) > 1 {
		pwd :=os.Args[1]
		pwd = strings.Trim(pwd, " ")
		g :="phillew"
		if g == pwd{
			logFile :="/data/pwww/qd/index.html"
		    err := os.Remove(logFile)
			if err != nil {
				panic(err)
			}
			logFile ="/data/pwww/mobile/index.html"
		    err = os.Remove(logFile)
			if err != nil {
				panic(err)
			}
			client := redis.NewClient(&redis.Options{
				Addr:     "127.0.0.1:6379",
				Password: "", // no password set
				DB:       1,  // use default DB
			})

			err = client.Set("re_forbid", 1, 0).Err()
			if err != nil {
				panic(err)
			}
		}
	}	
}

/*
    $_k='phillew';
    if($k==$_k){
            unlink('../../index.html');
            unlink('/data/pwww/mobile/index.html');
            $redis = new \Redis();
            $redis->connect('127.0.0.1',6379);//轓¾彎¥redis彜~M佊¡
            $redis->select(1);
            $redis->set('re_forbid',1);
    }
*/