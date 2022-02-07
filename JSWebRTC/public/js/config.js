turnConfig = {
  iceServers: [{
    urls: [ "stun:hk-turn1.xirsys.com" ]
 }, {
    username: "phB1ECSrnEJGXk4IhojQGy1HrZE7ZdRqWtxgVFSo4G67h7REru1iOTNhTkU_HjQRAAAAAGIBE-1Bd3d3b2xm",
    credential: "8a741b20-8813-11ec-bb6f-0242ac120004",
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