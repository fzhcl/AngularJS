/**
 * @private
 * Used by TimeZoneInfo.js
 */
Ext.define('Acct.view.TimeDisplay', {
	extend: 'Ext.Component',
	alias: 'widget.timedisplay',

	childEls: ['timezoneEl', 'timeEl'],
	renderTpl: [
		'<span id="{id}-timezoneEl" data-ref="timezoneEl" style="width: 30px;font-weight: bold;color:red;">{timezoneId}</span><span id="{id}-timeEl" data-ref="timeEl" style="color:#e8e8e8">00:00:00</span>'
	],
	width: 58,
	style: 'cursor: pointer;',
	config: {
		serverNow: null,
		timezoneId: null,
		timezoneInfo: null,
		menu: null
	},
	updateTimezoneId: function(id) {
		var me = this;
		if (me.rendered) {
			me.timezoneEl.setHtml(id.toUpperCase() + ':');
		}
		return true;
	},
	setTime: function(count) {
		if (!this.rendered) {
			return;
		}

		var me = this, offset, tz;
		Ext.Array.each(me.getTimezoneInfo(), function(t) {
			if (t.id == me.getTimezoneId()) {
				offset = t.offset;
				tz = t.timezone;
				return false;
			}
		});
		
		var time = me.getServerNow() + offset + count * 1000 * 60;
		var date = new Date();
		date.setTime(time);
		
		var datetime = date.toUTCString();
		me.timeEl.setHtml(datetime.split(' ')[4].substr(0, 5));

		var title = tz + '\n' + datetime.substr(0, datetime.length - 13);
		if (title != me.timeEl.dom.title) {
			me.timeEl.dom.title = title;
		}
	},
	initComponent: function() {
		var me = this;
		
		me.renderData = {
			timezoneId: me.getTimezoneId().toUpperCase() + ':' 
		};

		me.callParent();
		
		me.on('afterrender', function() {
			me.el.on('click', function() {
				var el = me.el,
					x = el.getX(),
					y = el.getY() + el.getHeight();

				me.menu.triggerEl = me;
				me.menu.timezoneId = me.getTimezoneId();
				me.menu.showAt(x, y);
			});
		});
	}
});