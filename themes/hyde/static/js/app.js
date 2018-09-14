var app = angular.module('app', []);

app
    .controller('MainController', function MainController($scope, $timeout, $http) {
        var audioContext = new AudioContext();
        var gainNode = audioContext.createGain();
        gainNode.gain.value = 0;
        gainNode.connect(audioContext.destination);
        $scope.muted = true

        $scope.search = '';
        $scope.messages = [{title: 'This is a test This is a test This is a test This is a test This is a testThis is a test This is a test This is a test This is a test', question: true},
            {title: 'This is a test This is a test This is a test This is a test This is a testThis is a test This is a test This is a test This is a test', question: false},
            {title: 'This is a test This is a test This is a test This is a test This is a testThis is a test This is a test This is a test This is a test', question: false},
            {title: 'This is a test This is a test This is a test This is a test This is a testThis is a test This is a test This is a test This is a test', question: false},
            {title: 'This is a test This is a test This is a test This is a test This is a testThis is a test This is a test This is a test This is a test', question: false},
            {title: 'This is a test3', question: true}, {title: 'This is a test4', question: false},];

        $scope.listenToSpeech = function() {
            if (typeof webkitSpeechRecognition === 'undefined') {
                return alert('Oops :-( Speech recognition is only available using Chrome')
            }

            var recognition = new webkitSpeechRecognition();
            recognition.lang = "en-US";

            recognition.onresult = function(event) {
                var transcript = event.results[event.results.length - 1][0].transcript;
                console.log(transcript)
                sendToChatbot(transcript)

            }

            recognition.start();
            $scope.listening = true

            recognition.onend = function(){
                console.log('Speech recognition ended')
                $timeout(function () {
                    $scope.listening = false
                }, 0)
            }
        }

        $scope.submit = function () {
            sendToChatbot($scope.search)
        }

        $scope.toggleMute = function (e) {
            if ($scope.muted) {
                audioContext.resume()
                gainNode.gain.value = 1;
            } else {
                gainNode.gain.value = 0;
            }
            $scope.muted = !$scope.muted
        }

        var scrollToBottom = function () {
            var objDiv = document.getElementById('message-list');
            setTimeout(function () {
                objDiv.scrollTop = objDiv.scrollHeight;
            }, 100);
        }

        var sendToChatbot = function(text) {
            $scope.messages.push({title: text, question: true})
            scrollToBottom()
            $http({
                method: 'GET',
                url: 'https://us-central1-job-interview-b2b48.cloudfunctions.net/helloWorld?text=' + text
            }).then(function successCallback(response) {
                console.log(response.data)
                playByteArray(response.data.outputAudio.data)
                var message = messageFromResponse(response.data)
                console.log(message)
                $timeout(function () {
                    $scope.messages.push(message)
                    scrollToBottom()
                }, 0)
            }, function errorCallback(error) {
                console.error(error);
            });
            $scope.search = '';
        };

        function messageFromResponse(response) {
            return {title: response.queryResult.fulfillmentMessages[0].text.text[0], isAnswer: true}
        }

        function playByteArray( bytes ) {
            var buffer = new Uint8Array( bytes.length );
            buffer.set( new Uint8Array(bytes), 0 );

            audioContext.decodeAudioData(buffer.buffer, play);
        }

        function play( audioBuffer ) {
            var source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect( gainNode );
            source.start(0);
        }




    });
