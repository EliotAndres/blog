var app = angular.module('app', []);

app
    .controller('MainController', function MainController($scope, $timeout, $http) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        window.audioContext = null;
        $scope.muted = true
        $scope.search = '';
        $scope.messages = [];
        $scope.sessionId = guid()
        $scope.questions = ['Where did you study ?', 'Do you know TensorFlow ?',
            'Where do you see yourself in 5 years ?', 'What are your hobbies ?']

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

        $scope.submit = function (query) {
            sendToChatbot(query || $scope.search)
        }

        window.toggleMute = function (e) {
            console.log('toggle mute')
            if (window.audioContext === null) {
                window.audioContext = new AudioContext();
                $scope.gainNode = window.audioContext.createGain();
                $scope.gainNode.gain.value = 1;
                $scope.gainNode.connect(window.audioContext.destination);
            }

            $timeout(function () {
                if ($scope.muted) {
                    window.audioContext.resume()
                    $scope.gainNode.gain.value = 1;
                } else {
                    $scope.gainNode.gain.value = 0;
                }
                $scope.muted = !$scope.muted
            }, 0)

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
                url: 'https://us-central1-job-interview-b2b48.cloudfunctions.net/helloWorld?text=' + text + '&session=' + $scope.sessionId
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
            if (window.audioContext == null) {
                return
            }

            var buffer = new Uint8Array( bytes.length );
            buffer.set(new Uint8Array(bytes), 0);

            window.audioContext.decodeAudioData(buffer.buffer, play);
        }

        function play(audioBuffer) {
            var source = window.audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect($scope.gainNode);
            source.start(0);
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }




    });
