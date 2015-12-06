Ext.define('Acct.view.TimeZoneInfo', {
	extend: 'Ext.container.Container',
	alias: 'widget.timezoneinfo',

	requires: ['Ext.menu.Menu', 'Acct.view.TimeDisplay'],

	cls: 'timezone',

	layout: 'hbox',
	
	_count: 0,

	initComponent: function() {
		var me = this;

		me.callParent();

		Ext.Ajax.request({
			url: 'TimeZones/getTimeZoneInfo',
			success: function(resp) {
				var obj = Ext.decode(resp.responseText);
				if (obj.success) {

					me.serverNow = obj.now;
					me.timezoneInfo = obj.data;

					var menuItems = [];
					Ext.Array.each(me.timezoneInfo, function(d) {
						menuItems.push({
							xtype: 'menucheckitem',
							text: d.id.toUpperCase() + '(' + d.timezone + ')',
							timezoneId: d.id,
							group: 'tz',
							handler: function(item) {
								item.parentMenu.triggerEl.setTimezoneId(item.timezoneId);
							}
						});
					});
					menuItems.push('-');
					menuItems.push({
						text: 'Close',
						handler: function(item) {
							item.parentMenu.triggerEl.destroy();
						}
					});
					me.menu = Ext.create('Ext.menu.Menu', {
						items: menuItems,
						listeners: {
							beforeshow: function(menu) {
								menu.items.each(function(i) {
									if (i.setChecked) {
										i.setChecked(i.timezoneId == menu.timezoneId);
									}
								});
							}
						}
					});

					Ext.Array.each(obj.display, function(i) {
						me.add({
							xtype: 'timedisplay',
							margin: '0 15 0 0',
							serverNow: me.serverNow,
							timezoneId: i,
							timezoneInfo: me.timezoneInfo,
							menu: me.menu
						});
					});

				    Ext.TaskManager.start({
				    	run: function() {
		    				me.items.each(function(i) {
		    					i.setTime(me._count);
		    				});
		    				me._count++;
				    	},
				    	scope: me,
				    	interval: 60 * 1000
				    });
				}
			}
		});
	}
});
