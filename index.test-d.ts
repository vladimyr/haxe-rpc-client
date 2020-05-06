import RpcClient from '.';

const HAXELIB_RPC_URL = 'https://lib.haxe.org/api/3.0/index.n';
const client = new RpcClient(HAXELIB_RPC_URL);

client.call('api.infos', ['openfl']);
client.call('api.infos', ['dummy']);
