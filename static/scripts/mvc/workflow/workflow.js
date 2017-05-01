define(["mvc/form/form-view","mvc/ui/ui-misc","mvc/ui/ui-select"],function(){var a=Backbone.View.extend({initialize:function(){this.setElement("<div/>"),this.render()},render:function(){var a=this,b=[],c=3;$.getJSON(Galaxy.root+"api/workflows/",function(d){var e=null;a.$el.empty().append(a._templateHeader()),a.build_messages(a),e=a.$el.find(".user-workflows"),e.append(a._templateActionButtons()),b=a.build_workflows(d),b.length>0?(e.append(a._templateWorkflowTable(a,b)),a.adjust_actiondropdown(e),_.each(b,function(b){a.confirm_delete(a,b)}),a.search_workflow(a,a.$el.find(".search-wf"),a.$el.find(".workflow-search tr"),c)):e.append(a._templateNoWorkflow())})},build_workflows:function(a){{var b=[];Galaxy.user.attributes.username}return _.each(a,function(a){var c={};c.id=a.id,c.text=a.name,c.workflow_steps=a.latest_workflow_steps,c.published=a.published?"Yes":"No",c.email=a.user_email?a.user_email:"You",c.slug=a.slug?a.slug:"",c.username=a.user_name?a.user_name:"",b.push(c)}),b},build_messages:function(a){var b=a.$el.find(".response-message"),c=a.get_querystring("status"),d=a.get_querystring("message");d&&null!==d&&""!==d?(b.addClass(c+"message"),b.html("<p>"+d+"</p>")):b.html("")},confirm_delete:function(a,b){var c=a.$el.find(".link-confirm-"+b.id),d=a.$el.find(".link-confirm-shared-"+b.id);c.click(function(){return confirm("Are you sure you want to delete workflow '"+b.text+"'?")}),d.click(function(){return confirm("Are you sure you want to remove the shared workflow '"+b.text+"'?")})},search_workflow:function(a,b,c,d){b.on("keyup",function(){var a=$(this).val();if(a.length>=d){var b=new RegExp(a,"i");c.hide(),c.filter(function(){return b.test($(this).text())}).show()}else c.show()})},get_querystring:function(a){return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]"+encodeURIComponent(a).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1"))},adjust_actiondropdown:function(a){a.on("show.bs.dropdown",function(){a.css("overflow","inherit")}),a.on("hide.bs.dropdown",function(){a.css("overflow","auto")})},_templateNoWorkflow:function(){return'<div class="wf-nodata"> You have no workflows. </div>'},_templateActionButtons:function(){return'<ul class="manage-table-actions"><li><input class="search-wf form-control" type="text" autocomplete="off" placeholder="search for workflow..."></li><li><a class="action-button fa fa-plus wf-action" id="new-workflow" href="/workflow/create"><span>Create new workflow</span></a></li><li><a class="action-button fa fa-upload wf-action" id="import-workflow" href="/workflow/import_workflow"><span>Upload or import workflow</span></a></li></ul>'},_templateWorkflowTable:function(a,b){var c="",d="";return c+='<table class="table colored"><thead><tr class="header"><th class="wf-td">Name</th><th class="wf-td">Owner</th><th class="wf-td"># of Steps</th><th class="wf-td">Published</th></tr></thead>',_.each(b,function(b){d=d+'<tr><td class="wf-td wf-dpd"><div class="dropdown"><button class="menubutton" type="button" data-toggle="dropdown">'+_.escape(b.text)+'<span class="caret"></span></button>'+a._templateActions(b)+"</div></td><td>"+_.escape(b.email)+'</td><td class="wf-td">'+b.workflow_steps+'</td><td class="wf-td">'+b.published+"</td></tr>"}),c+'<tbody class="workflow-search">'+d+"</tbody></table>"},_templateActions:function(a){return""===a.username?'<ul class="dropdown-menu action-dpd"><li><a href="/workflow/editor?id='+a.id+'">Edit</a></li><li><a href="/root?workflow_id='+a.id+'">Run</a></li><li><a href="/workflow/sharing?id='+a.id+'">Share or Download</a></li><li><a href="/workflow/copy?id='+a.id+'">Copy</a></li><li><a href="/workflow/rename?id='+a.id+'">Rename</a></li><li><a href="/workflow/display_by_id?id='+a.id+'">View</a></li><li><a class="link-confirm-'+a.id+'" href="/workflow/delete?id='+a.id+'">Delete</a></li></ul>':'<ul class="dropdown-menu action-dpd"><li><a href="/workflow/display_by_username_and_slug?username='+a.username+"&slug="+a.slug+'">View</a></li><li><a href="/workflow/run?id='+a.id+'">Run</a></li><li><a href="/workflow/copy?id='+a.id+'">Copy</a></li><li><a class="link-confirm-shared-'+a.id+'" href="/workflow/sharing?unshare_me=True&id='+a.id+'">Remove</a></li></ul>'},_templateHeader:function(){return'<div class="page-container"><div class="user-workflows wf"><div class="response-message"></div><h2>Your workflows</h2></div><div class="other-options wf"><h2>Other options</h2><a class="action-button fa fa-cog wf-action" href="/workflow/configure_menu"><span>Configure your workflow menu</span></a></div></div>'}});return{View:a}});
//# sourceMappingURL=../../../maps/mvc/workflow/workflow.js.map