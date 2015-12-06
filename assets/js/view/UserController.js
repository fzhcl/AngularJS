Ext.define('Acct.view.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usersearch',

    control: {
        'usersearchform button': {
            click: 'searchUser'
        },

        'usersearchform textfield': {
            keydown: function(f, e) {
                if (e.getKey() == Ext.EventObject.ENTER) {
                    this.searchUser();
                }
            }
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

        var view = this.getView(),
            form = view.down('usersearchform').getForm(),
            navPnl = view.down('navigationpanel');

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
