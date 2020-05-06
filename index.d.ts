declare class RpcClient {
  constructor(url: string);
  call<T>(path: string, params: [any]): Promise<T>;
}

export default RpcClient;
