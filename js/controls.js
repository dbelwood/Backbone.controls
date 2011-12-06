(function() {
  var Dialog, RowCollection;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Dialog = (function() {
    __extends(Dialog, Backbone.View);
    function Dialog() {
      Dialog.__super__.constructor.apply(this, arguments);
    }
    Dialog.prototype.tagName = "div";
    Dialog.prototype.initialize = function() {
      this.dialog = $(this.el).dialog({
        autoOpen: false,
        modal: true,
        buttons: [
          {
            text: "OK",
            "class": "ok",
            click: __bind(function() {
              return this.dialog.dialog("close");
            }, this)
          }, {
            text: "Cancel",
            "class": "cancel",
            click: __bind(function() {
              return this.dialog.dialog("close");
            }, this)
          }
        ]
      });
      return {
        open: function() {
          this.render();
          this.dialog.dialog("open");
          this.el = $(this.el).parent();
          return this.delegateEvents();
        }
      };
    };
    return Dialog;
  })();
  RowCollection = (function() {
    __extends(RowCollection, Backbone.View);
    function RowCollection() {
      this.render = __bind(this.render, this);
      RowCollection.__super__.constructor.apply(this, arguments);
    }
    RowCollection.prototype.initialize = function() {
      if (this.options.rowViewClass == null) {
        throw "You must set the rowView option!";
      }
      this._rowViewClass = this.options.rowViewClass;
      this._rowViews = [];
      this.collection.each(this.add);
      this.collection.bind("add", this.add);
      return this.collection.bind("remove", this.remove);
    };
    RowCollection.prototype.add = function(model) {
      var rowView;
      rowView = new this.rowViewClass({
        model: model
      });
      this._rowViews.push(rowView);
      return this.el.append(rowView.render());
    };
    RowCollection.prototype.remove = function(model) {
      var viewToRemove;
      viewToRemove = _(this._rowViews).select(function(rv) {
        return rv.model === model;
      });
      this._rowViews(_(this.rowViews).without(viewToRemove));
      return viewToRemove.el.remove();
    };
    RowCollection.prototype.render = function() {};
    return RowCollection;
  })();
}).call(this);
