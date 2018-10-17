"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const C4EurekaClient_1 = __importDefault(require("./C4EurekaClient"));
function Launch() {
    return __awaiter(this, void 0, void 0, function* () {
        let Client = new C4EurekaClient_1.default();
        let Client2 = new C4EurekaClient_1.default();
        Client.init({
            fetchRegistry: true,
            host: "0.0.0.0",
            port: 30009,
            servicePath: "/eureka/apps/",
            heartbeatInterval: 5000,
            registryFetchInterval: 5000,
        }, {
            instanceId: "Node_Service-01",
            app: "Node_Service",
            hostName: "host",
            ipAddr: "ipAddr",
            statusPageUrl: "http://host:port/NodeServiceControler",
            port: {
                "$": 10010,
                "@enabled": true
            },
            vipAddress: "Node_Service",
            dataCenterInfo: {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                name: "MyOwn"
            },
            leaseInfo: {
                renewalIntervalInSecs: 5,
                durationInSecs: 15
            },
            countryId: 86,
            metadata: {
                test: { a: '123', b: 123 },
                test2: "123"
            }
        });
        Client2.init({
            fetchRegistry: true,
            host: "0.0.0.0",
            port: 30009,
            servicePath: "/eureka/apps/",
            heartbeatInterval: 5000,
            registryFetchInterval: 5000,
        }, {
            instanceId: "Node_Service-02",
            app: "Node_Service",
            hostName: "host",
            ipAddr: "ipAddr",
            statusPageUrl: "http://host:port/SystemStatsServiceControler",
            port: {
                "$": 10010,
                "@enabled": true
            },
            vipAddress: "Node_Service00",
            dataCenterInfo: {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                name: "MyOwn"
            },
            leaseInfo: {
                renewalIntervalInSecs: 5,
                durationInSecs: 15
            },
            countryId: 86,
            metadata: {
                test: { a: '123', b: 123 },
                test2: "123"
            }
        });
        yield Client.start();
        yield Client2.start();
        let Begin = (new Date()).getTime();
        console.log('1');
        yield Client.waitRegistered(["Node_Service"]);
        console.log((new Date()).getTime() - Begin);
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
            console.log(JSON.stringify(Client.getInstancesByAppId("Node_Service"), null, 4));
        }, 10000);
    });
}
Launch();
//# sourceMappingURL=main.js.map