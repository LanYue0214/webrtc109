turnConfig = {
iceServers: [{
  urls: [ "stun:hk-turn1.xirsys.com" ]
}, {
  username: "TNNbmxlbW7UGnMtxs_uhnPvn9aGijH9iCHPNPI39BZy9OdfNn5YDdebtJu-49ttvAAAAAGHuK49Bd3d3b2xm",
  credential: "757c2262-7cce-11ec-90b6-0242ac120004",
  urls: [
      "turn:hk-turn1.xirsys.com:80?transport=udp",
      "turn:hk-turn1.xirsys.com:3478?transport=udp",
      "turn:hk-turn1.xirsys.com:80?transport=tcp",
      "turn:hk-turn1.xirsys.com:3478?transport=tcp",
      "turns:hk-turn1.xirsys.com:443?transport=tcp",
      "turns:hk-turn1.xirsys.com:5349?transport=tcp"
  ]
}]
}