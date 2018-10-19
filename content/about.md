+++
date = "2017-08-27"
menu = "main"
summary = "Some of my side projects"
hidedate = true
custom_css = ["css/chatbot.css"]
+++

I made a chatbot to answer your questions ! You can enable voice by clicking the unmute button.
A classic about page is also [available here](/about_classic).

<div ng-controller="MainController" ng-app="app" class="chatbot-wrapper">

<div class="intro-wrapper">
Type your questions or use one of the following:
<ul>
<li class="default-question" ng-repeat="question in questions" ng-click="submit(question)">{{question}}</li>
</ul>
</div>
<div class="message-list" id="message-list">
<ul class="messages clearfix">
    <li ng-repeat="message in messages" class="message" ng-class="message.question ? 'question' : 'answer'">{{message.title}}</li>
</ul>
</div>

<div class="input-box">
<form class="form-inline input-form" ng-submit="submit()">
<div class="form-group">
    <input ng-model="search" class="form-control light-input" placeholder="Enter your question here">
</div>
</form>
<button class="speak-button" ng-click="listenToSpeech()"><img class="button-image" ng-src="{{listening ? '../images/mic-red.png' : '../images/mic.png'}}"></img></button>
<button class="mute-button" onclick="toggleMute()"><img class="button-image mute-image" ng-src="{{muted? '../images/volume-x.png' : '../images/volume-2.png'}}"></img></button>
</div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
<script src="../js/app.js"></script>
<link rel="stylesheet" href="../css/chatbot.css" media="print">
