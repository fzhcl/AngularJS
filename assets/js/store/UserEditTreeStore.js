Ext.define('Acct.store.UserEditTreeStore', {
	extend: 'Ext.data.TreeStore',
	model: 'Acct.model.TreeItem',

	autoLoad: false,
	idProperty: 'id',
	sortOnLoad: true,
	root: {
		id: 'rootnodeUser'
	},
	proxy: {
		type: 'ajax',
		api: {
			read: '/jadmin/reportnavigation/deep'
		}
	}
});
