import js.lib.Error;
import js.lib.Promise;
import haxe.remoting.AsyncConnection;
import haxe.remoting.HttpAsyncConnection;

using Lambda;

@:expose
class RpcClient {
	var _apiUrl:String;

	public function new(apiUrl:String) {
		_apiUrl = apiUrl;
	}

	public function call(path:String, params:Array<Dynamic>) {
		return new Promise((resolve, reject) -> {
			var conn:AsyncConnection = HttpAsyncConnection.urlConnect(_apiUrl);
			conn.setErrorHandler(err -> {
				var re = ~/\b\s*:/g;
				var message:String = err;
				message = re.replace(message, ':');
				reject(new Error(message));
			});
			path.split('.').foreach(it -> {
				conn = conn.resolve(it);
				return true;
			});
			conn.call(params, resolve);
		});
	}
}
