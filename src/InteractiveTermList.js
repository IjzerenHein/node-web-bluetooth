/* global process */
const {EventEmitter} = require('events');
const Canvas = require('term-canvas');
const colors = require('colors');
const canvas = new Canvas(100, 200);
const ctx = canvas.getContext('2d');
const stdin = process.stdin;
require('keypress')(stdin);

function prop(name) {
  return function(obj){
    return obj[name];
  };
}

class InteractiveTermList extends EventEmitter {

	constructor(opts = {}) {
		super();
		this.items = [];
		this.map = {};
		this.marker = opts.marker || '› ';
		this.markerLength = opts.markerLength || this.marker.length;
		this.header = opts.header;
		this.onkeypress = this.onkeypress.bind(this);
	}

	onkeypress(ch, key) {
		if (!key) return;

		this.emit('keypress', key, this.selected);
		switch (key.name) {
		case 'k':
		case 'up':
			this.up();
			break;
		case 'j':
		case 'down':
			this.down();
			break;
		case 'c':
			key.ctrl && this.stop();
			break;
		}
	}

	add(id, label){
		if (!this.selected) this.select(id);
		this.items.push({ id: id, label: label });
		this.draw();
	}

	update(id, label) {
		const i = this.items.map(prop('id')).indexOf(id);
		this.items[i] = { id: id, label: label };
		this.draw();
	}

	remove(id){
		this.emit('remove', id);
		const i = this.items.map(prop('id')).indexOf(id);
		this.items.splice(i, 1);
		if (!this.items.length) this.emit('empty');
		const item = this.items(i) || this.items(i - 1);
		if (item) this.select(item.id);
		else this.draw();
	}

	select(id){
		this.emit('select', id);
		this.selected = id;
		this.draw();
	}

	draw(){
		let y = 0;
		ctx.clear();
		ctx.save();
		if (this.header) {
			ctx.translate(2, 1);
			ctx.fillText(this.header, 0, 0);
		}
		ctx.translate(2, 3);
		this.items.forEach((item) => {
			if (this.selected == item.id) {
				ctx.fillText(colors.cyan.bold(this.marker + item.label), 0, y++);
			} else {
				const pad = Array(this.markerLength + 1).join(' ');
				ctx.fillText(colors.gray(pad + item.label), 0, y++);
			}
		});
		ctx.write('\n\n');
		ctx.restore();
	}

	up() {
		const ids = this.items.map(prop('id'));
		const i = ids.indexOf(this.selected) - 1;
		const item = this.items[i];
		if (!item) return;
		this.select(item.id);
	}

	down() {
		const ids = this.items.map(prop('id'));
		const i = ids.indexOf(this.selected) + 1;
		const item = this.items[i];
		if (!item) return;
		this.select(item.id);
	}

	stop() {
		stdin.setRawMode(false);
		stdin.removeListener('keypress', this.onkeypress);
	}

	start() {
		stdin.on('keypress', this.onkeypress);
		this.draw();
		ctx.hideCursor();
		stdin.setRawMode(true);
		stdin.resume();
	}
}

module.exports = InteractiveTermList;
