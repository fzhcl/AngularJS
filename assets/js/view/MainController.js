Ext.define('Acct.view.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    init: function() {
        var me = this;

        Ext.setGlyphFontFamily('FontAwesome');

        Ext.Ajax.on('requestcomplete', function() {
            Ext.getBody().unmask();
        });

        Ext.Ajax.on('requestexception(', function(con, resp) {
            Ext.getBody().unmask();
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Error: ' + resp.statusText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        });
    },

    control: {
        'navigationpanel': {
            itemclick: 'treeItemClicked'
        }
    },

    //Create a tab in response to click on a tree leaf (actual page)
    createTab: function(record) {
        var me = this,
            title = record.get('text');

        me.getView().down('tabpanel').add({
            title: title
        }).show();
    },

    //tree item on the navigation panel was clicked
    treeItemClicked: function(view, record, item, index) {
        if (record && !record.isLeaf()) {
            return;
        }

        this.createTab(record);
    }
});
