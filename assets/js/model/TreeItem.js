Ext.define('Acct.model.TreeItem', {
    extend: 'Ext.data.Model',
    fields: [
         {name:'text', type: 'string', mapping: 'title'},
         {name: 'aux',  type: 'string', mapping: 'access'},
         {name: 'leaf', type: 'boolean', defaultValue: false},
         {name: 'url', type: 'string'},
         {name: 'description', type: 'string'},
         {name: 'nodeid', type: 'string'},
         {name: 'alias', type: 'string'},
         
         {name: 'userIntId'},
         {name: 'userId'}
    ]
});
