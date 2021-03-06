(function(idbModules){
	/**
	 * A utility method to callback onsuccess, onerror, etc as soon as the calling function's context is over
	 * @param {Object} fn
	 * @param {Object} context
	 * @param {Object} argArray
	 */
	function callback(fn, context, event, func){
		//window.setTimeout(function(){
		event.target = context;
		(typeof context[fn] === "function") && context[fn].apply(context, [event]);
		(typeof func === "function") && func();
		//}, 1);
	}
	
	/**
	 * Throws a new DOM Exception,
	 * @param {Object} name
	 * @param {Object} message
	 * @param {Object} error
	 */
	function throwDOMException(name, message, error){
		logger.log(name, message, error);
		var e = new DOMException.constructor(0, message);
		e.name = name;
		e.message = message;
		e.stack = arguments.callee.caller;
		throw e;
	}
	
	idbModules["util"] = {
		"throwDOMException": throwDOMException,
		"callback": callback,
		"quote" : function(arg){
			return "'" + arg + "'";
		}
	}
})(idbModules);
