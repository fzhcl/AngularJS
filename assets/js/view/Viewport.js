Ext.define('Acct.view.Viewport', {
    extend: "Ext.container.Viewport",

    requires: [
        'Ext.layout.container.Border',
        'Ext.layout.container.Accordion',
        'Ext.tab.Panel'
    ],

    layout: 'border',

    initComponent: function(){
        var me = this;

        me.items = [{
            region: 'north',
            height: 30,
            html: 'This is a header'
        }, {
            region: 'west',
            title: 'Home',
            split: true,
            collapsible: true,
            width: 300,
            layout:'accordion',
            items: [{
                xtype: 'treepanel',
                title: 'Main',
                rootVisible: false,
                store: {
                    fields: [{
                        name: 'text',
                        mapping: 'name'
                    }],
                    root: {children:[{name:'Reports',mtype:'Territory',children:[{name:'Daily report',leaf:true},{name:'Weekly report',leaf:true},{name:'Yearly report',leaf:true}]},{name:'Activities',mtype:'Territory',children:[{name:'USA',mtype:'Country',children:[{name:'Redwood City',mtype:'City',leaf:true}]}]}]}
                }
            }, {
                xtype: 'panel',
                title: 'User Management',
                html: 'user'
            }]
        }, {
            region: 'center',
            xtype: 'tabpanel',
            html: 'this is a tab'
        }];

        me.callParent(arguments);
    }
});
