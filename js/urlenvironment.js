var environment = (function(){
	function setEnv(){
		var env = "prod";   //test;// or dev //prod
		return env;
	}
	return{
		getEnv : setEnv
	}
})()