Ext.define('Acct.view.UserSearchForm',{
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.form.field.Number',
		'Ext.form.FieldContainer'
	],

	alias: 'widget.usersearchform',

	defaultType: 'fieldcontainer',
	defaults: {
        labelWidth: 50,
        labelAlign: 'right',
		layout: 'hbox'
	},

	items: [{
		fieldLabel: 'User',
		items: [{
			flex: 1,
	        xtype: 'textfield',
	        enableKeyEvents: true,
	        name: 'userid'
	    }, {
	    	margin: '0 0 0 3',
	    	glyph: 0xf002,
	    	xtype: 'button'
	    }]
	}, {
        fieldLabel: 'IntId',
		items: [{
			flex: 1,
	        xtype: 'numberfield',
	        enableKeyEvents: true,
	        minValue: 1,
	        name: 'userintid',
	        hideTrigger: true,
	        keyNavEnabled: false,
	        mouseWheelEnabled: false
	    }, {
	    	margin: '0 0 0 3',
	    	glyph: 0xf002,
	    	xtype: 'button'
	    }]
	}, {
		fieldLabel: 'eMail',
		items: [{
			flex: 1,
	        xtype: 'textfield',
	        enableKeyEvents: true,
	        name: 'email'
	    }, {
	    	margin: '0 0 0 3',
	    	glyph: 0xf002,
	    	xtype: 'button'
	    }]
	}]
});
