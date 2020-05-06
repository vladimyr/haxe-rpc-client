'use strict';

const RpcClient = require('.');
const test = require('tape');

const HAXELIB_RPC_URL = 'https://lib.haxe.org/api/3.0/index.n';

test('Fetch project info', async t => {
  const client = new RpcClient(HAXELIB_RPC_URL);
  const info = await client.call('api.infos', ['nme']);
  t.plan(2);
  t.equals(info.name, 'nme', 'fetched `nme` info');
  t.assert(info.versions.length > 0, `found ${info.versions.length} releases`);
});

test('Fetch nonexistent project info', async t => {
  const client = new RpcClient(HAXELIB_RPC_URL);
  try {
    await client.call('api.infos', ['dummy']);
    t.fail();
  } catch (err) {
    t.plan(1);
    t.equals(err && err.message, 'No such Project: dummy', `throws: ${err.message}`);
  }
});
