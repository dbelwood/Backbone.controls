class Dialog extends Backbone.View
	tagName: "div"
	initialize: ->
		@dialog = $(@el).dialog(
			autoOpen: false,
			modal: true,
			buttons: [
				{
					text: "OK",
					class: "ok",
					click: =>
						@dialog.dialog("close")
				},
				{
					text: "Cancel",
					class: "cancel",
					click: =>
						@dialog.dialog("close")
				}
			]				
		)

		open: ->
			@render()
			@dialog.dialog("open")
			@el = $(@el).parent()
			@delegateEvents()

class RowCollection extends Backbone.View
	initialize: ->
		# Ensure that a rowViewClass option has been set when creating the collection
		throw "You must set the rowView option!" unless @options.rowViewClass?

		@_rowViewClass = @options.rowViewClass
		@_rowViews = []
		@collection.each(@add)
		@collection.bind("add", @add)
		@collection.bind("remove", @remove)

	add: (model)->
		rowView = new @rowViewClass({model: model})
		@_rowViews.push rowView
		@el.append rowView.render()

	remove: (model)->
		viewToRemove = _(@_rowViews).select( (rv) -> 
			return rv.model == model
		)
		@_rowViews _(@rowViews).without(viewToRemove)
		viewToRemove.el.remove()

	render: =>
	