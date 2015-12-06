Ext.define('Acct.view.UserPanel',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.userpanel',

	requires: [
		'Acct.view.UserSearchForm',
		'Acct.view.NavigationPanel',
		'Acct.store.UserEditTreeStore'
	],

	title: 'Players Quick Search',

	layout: {
        type: 'vbox',
        align: 'stretch'
    },
	
    initComponent: function(){
    	var me = this;

    	me.items = [{
    		xtype: 'usersearchform',
			margin: '5 0 0 0'
    	}, {
    		xtype: 'navigationpanel',
    		flex: 5
    	}];

        me.callParent(arguments);
    }
});
