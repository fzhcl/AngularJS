Ext.define('Acct.view.BannerHeader', {
	extend: 'Ext.container.Container',
	alias: 'widget.bannerheader',

	requires: ['Ext.form.field.ComboBox', 'Acct.view.TimeZoneInfo'],

	cls: 'jadmin-bannerheader',

	height: 30,

	layout: {
		type: 'hbox',
		align: 'middle'
	},

	initComponent: function() {
		var me = this;

		me.items = [{
			xtype: 'component',
			html: 'Account Management',
			style: {
				color: 'white',
				fontSize: '20px',
				paddingLeft: '5px'
			},
			width: 220
		}, {
    	    xtype: 'combobox',
            store: Ext.create('Ext.data.Store', {
				fields: [
					{name: 'id', mapping: 'nodeid'},
					{name: 'title'},
					{name: 'url'}
				],
				pageSize: 10
			}),
            displayField: 'title',
            typeAhead: false,
            hideLabel: true,
            hideTrigger:true,
            cls: 'search-combo',
            matchFieldWidth: false,
            pageSize: 10,
            listConfig: {
                loadingText: 'Searching...',
                emptyText: 'No matching posts found.',
                width: 400,
                // Custom rendering template for each item
                getInnerTpl: function() {
                    return '<span class="search-item">{title}</span>';
                }
            },
            listeners: {
            	beforeselect: function(combo, record, idx, eOpt) {
            		me.fireEvent('createtab', record.get('url'), record.get('title'));
            		combo.collapse();
            		return false;
            	}
            }
		}, {
			xtype: 'component',
			flex: 1
		}, {
			xtype: 'timezoneinfo'
		}, {
			xtype: 'component',
			style: 'color: #aaa',
			html: 'Logged in as: '
		}, {
			xtype: 'component',
			style: 'color: white; font-weight: bold; font-style:italic',
			html: 'amdin'
		}, {
			xtype: 'component',
			cls: 'logout',
			style: 'cursor: pointer',
			listeners: {
				element: 'el',
				click: function() {
					Ext.Ajax.request( {
						url: '/cgi-bin/admin.exe',
						params: {
							type: 'xhrlogout'
						},
						success : function(response) { 
							if (response.status==200) {
								Acct.utils.Util.goToHomePage();
							}
						}
					});
				}
			}
		}];
		
		me.callParent();
	}
});
