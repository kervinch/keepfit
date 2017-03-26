var watchID = null;
var s = 0;
var timeElapsed = 0; //in sec

    // Wait for PhoneGap to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap is ready
    //
    function onDeviceReady() {
        //startWatch();
    }

    // Start watching the acceleration
    //
    function startWatch() {

        // Update acceleration every 3 seconds
        var options = { frequency: 500 };
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
	
    }

    // Stop watching the acceleration
    //
    function stopWatch() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }

    // onSuccess: Get a snapshot of the current acceleration
    //
    function onSuccess(acceleration) {
		var accVec = Math.sqrt(((acceleration.x)*(acceleration.x))+((acceleration.y)*(acceleration.y))+((acceleration.z)*(acceleration.z)));
		
		//if acceleration vector exceeds the threshold set, steps + 1
		if (accVec > 9.95)
		{
			s = s + 1;
		}
		
		timeElapsed = timeElapsed + 0.5;
		/* -- try to eliminate the decimal place
		if((timeElapsed%10)/10>0)
		{
			timeElapsed = timeElapsed - 0.5;
		}
		*/
		
		/*
		if(timeElapsed>5)
		{
		navigator.accelerometer.clearWatch(watchID);
		}
		*/
		
		
        var element = document.getElementById('demo');
        element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                            'Acceleration Y: ' + acceleration.y + '<br />' +
                            'Acceleration Z: ' + acceleration.z + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />' +
							'Acceleration Vector: ' + accVec + '<br />' +
							'Steps: ' + s + '<br />' +
							'Time Elapsed (in seconds): ' + timeElapsed + '<br />';
							
		
							
    }

    // onError: Failed to get the acceleration
    //
    function onError() {
        alert('onError!');
    }