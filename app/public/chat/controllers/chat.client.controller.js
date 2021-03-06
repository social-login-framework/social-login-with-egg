'use strict';

angular.module('chat').controller('ChatController', [ '$scope', 'Socket', function($scope, Socket) {
  $scope.message = [];
  Socket.on('chatMessage', function(message) {
    $scope.message.push(message);
  });

  $scope.sendMessage = function() {
    const message = {
      text: this.messageText,
    };

    Socket.emit('chatMessage', message);

    this.messageText = '';
  };

  $scope.$on('$destroy', function(params) {
    Socket.removeListener('chatMessage');
  });
} ]);
