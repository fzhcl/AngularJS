Ext.define('Acct.view.NavigationPanel', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.navigationpanel',

	header: false,

	rootVisible : false,
	useArrows : true,

	listeners: {
		itemmouseenter: function(view, record, item, index) {
			if (!record.get('leaf')) {
				view.timer = setTimeout(function() {
					if (!record.isExpanded()) {
						view.expand(record);
					}
				}, 300);
			}
		},
		itemmouseleave: function(view, record, item, index) {
			if (!record.get('leaf')) {
				clearTimeout(view.timer);
			}
		}
	}
});
