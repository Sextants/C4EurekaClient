import C4EurekaClient from './C4EurekaClient';

async function Launch() {
    let Client = new C4EurekaClient();
    let Client2 = new C4EurekaClient();
    Client.init({
        fetchRegistry: true,
        host: "0.0.0.0",
        port: 30009,
        servicePath: "/eureka/apps/",
        heartbeatInterval : 5000,
        registryFetchInterval : 5000,
    },{
        instanceId  : "Node_Service-01",
        app         : "Node_Service",
        hostName    : "host",
        ipAddr      : "ipAddr",
        statusPageUrl : "http://host:port/NodeServiceControler",
        port : {
            "$" : 10010,
            "@enabled" : true
        },
        vipAddress  : "Node_Service",
        dataCenterInfo : {
            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
            name : "MyOwn"
        },
        leaseInfo : {
            renewalIntervalInSecs   : 5,
            durationInSecs          : 15
        },
        countryId : 86,
        metadata : {
            test : { a : '123', b : 123},
            test2 : "123"
        }
    });

    Client2.init({
        fetchRegistry: true,
        host: "0.0.0.0",
        port: 30009,
        servicePath: "/eureka/apps/",
        heartbeatInterval : 5000,
        registryFetchInterval : 5000,
    },{
        instanceId  : "Node_Service-02",
        app         : "Node_Service",
        hostName    : "host",
        ipAddr      : "ipAddr",
        statusPageUrl : "http://host:port/SystemStatsServiceControler",
        port : {
            "$" : 10010,
            "@enabled" : true
        },
        vipAddress  : "Node_Service00",
        dataCenterInfo : {
            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
            name : "MyOwn"
        },
        leaseInfo : {
            renewalIntervalInSecs   : 5,
            durationInSecs          : 15
        },
        countryId : 86,
        metadata : {
            test : { a : '123', b : 123},
            test2 : "123"
        }
    });

    await Client.start();
    await Client2.start();
    let Begin = (new Date()).getTime();
    console.log('1')
    await Client.waitRegistered(["Node_Service"]);
    console.log((new Date()).getTime() - Begin)

    // await new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve();
    //     }, 5000);
    // })
    console.log(Client.getInstancesByAppId("Node_Service"));
    console.log(JSON.stringify(Client.getInstancesByAppId("Node_Service"), null, 4));
    console.log('');
    console.log((Client.getInstancesByAppId("Node_Service")[0]).leaseInfo);
    console.log((Client.getInstancesByVipAddress("Node_Service")[0]).leaseInfo);
    console.log(JSON.stringify(Client.getInstancesByAppId("Node_Service"), null, 4));
    setInterval(() => {
        console.log('Alive');
        console.log((Client.getInstancesByAppId("Node_Service")[0]).leaseInfo);
        console.log(JSON.stringify(Client.getInstancesByAppId("Node_Service"), null, 4))
    }, 10000);
}

Launch();

