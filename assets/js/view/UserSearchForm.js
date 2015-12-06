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
	}],

	listeners: {
		afterrender: function(form) {
			Ext.Array.each(form.query('textfield'), function(fld) {
    			fld.on('keydown', function(f, e, eOpts) {
    				if (e.getKey() == Ext.EventObject.ENTER) {
    					form.searchUser();
    				}
    			});
			});
			
			Ext.Array.each(form.query('button'), function(btn) {
    			btn.handler = form.searchUser;
    			btn.scope = form;
			});
		}
	},
	
    searchUser: function() {
		function deepCopy(copyFrom,newID){

			var result = copyFrom.copy(newID),
					len = copyFrom.childNodes ? copyFrom.childNodes.length : 0,
					i;
			if(result.data && result.data.children) {
				result.data.children = [];
			}

			for (i = 0; i < len; i++) {
				result.appendChild(deepCopy(copyFrom.childNodes[i],newID+copyFrom.childNodes[i].get('id')));
			}
			return result;
		}

		var form = this.getForm();
		var navPnl = this.up('userpanel').down('navigationpanel');

		var myMask = new Ext.LoadMask({
			target: navPnl,
			msg: 'Searching...'
		});

		myMask.show();
		var store = Ext.create('Acct.store.UserEditTreeStore');
		store.on('load', function() {
			form.submit({
				clientValidation: true,
				url: '/jadmin/users/getUser',
				success: function(f, action) {
					var rootNode = navPnl.getRootNode();
					var rootTemplateNode = store.getRoot();

					var users = action.result.users;

					var insertIdx = 0;
					for (var idx in users) {
						var uId = 'usr'+users[idx].userIntId;
						if(null == rootNode.findChild('id',uId)){
							var userNode = deepCopy(rootTemplateNode.getChildAt(0),uId);
							userNode.set('id',uId);
							userNode.set('parentId',rootNode.get('nodeid'));
							userNode.set('checked',true);

							var encUserid = encodeURIComponent(users[idx].userId);
							userNode.data.text = userNode.data.text.replace(/\$\{uid\}/g,users[idx].userId);
							userNode.data.text = userNode.data.text.replace(/\$\{uiid\}/g,users[idx].userIntId);
							userNode.data.url = userNode.data.url.replace(/\$\{uid\}/g,encUserid);
							userNode.data.url = userNode.data.url.replace(/\$\{uiid\}/g,users[idx].userIntId);

							Ext.Array.each(userNode.childNodes, function(node) {
								node.set('userIntId', users[idx].userIntId);
								node.set('userId', users[idx].userId);
							});

							rootNode.insertChild(insertIdx,userNode);
							insertIdx++;
						}
					}
					rootNode.expandChildren();
					myMask.hide();
				},
				failure: function() {
					myMask.hide();
				}
			});
		});
		store.load();
    }
});
