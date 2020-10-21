module.exports = {

    // объект с событиями и их подписчиками
    objEvents: {},

    // проверяем, существует ли событие (если нет, то создаем его)
    chechEvent: function chechEvent(event) {
        if (!this.objEvents.hasOwnProperty(event)) {
            this.objEvents[event] = []; 
        }
    },
    
    // метод on
    // @param {String} event
    // @param {Object} subscriber
    // @param {Function} handler
    on: function (event, subscriber, handler) {
        this.chechEvent(event);
        this.objEvents[event].push({subscriber: subscriber, handler: handler.bind(subscriber)});
        return this;
    },

    //метод off
    // @param {String} event
    // @param {Object} subscriber
    off: function (event, subscriber) {

        if (this.objEvents[event] == undefined) {
            return this;
        } else {
            this.objEvents[event] = this.objEvents[event].filter(deleter);
            return this;
        }

        function deleter(person) {
            if (person.subscriber == subscriber) {
                return false;
            } else {
                return true;
            }
        }
    },

    // метод emit
    // @param {String} event
    emit: function (event) {
        if (this.objEvents[event] != undefined && (this.objEvents[event].length > 0)) {
            this.objEvents[event].forEach(function(person) {person.handler()});
            return this;
        } else {
            return this;
        }
    }
};
