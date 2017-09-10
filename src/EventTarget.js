const {EventEmitter} = require('events');

class EventTarget extends EventEmitter {
	addEventListener(type, listener) {
		return this.addListener(type, listener);
	}

	removeEventListener(type, listener) {
		return this.removeListener(type, listener);
	}
}

module.exports = EventTarget;
