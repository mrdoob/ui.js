import UIDiv from "./Div.js";
import UITab from "./Tab.js";

export default class UITabbedPanel extends UIDiv {

	constructor() {

		super();

		this.dom.className = 'TabbedPanel';

		this.tabs = [];
		this.panels = [];

		this.tabsDiv = new UIDiv();
		this.tabsDiv.setClass( 'Tabs' );

		this.panelsDiv = new UIDiv();
		this.panelsDiv.setClass( 'Panels' );

		this.add( this.tabsDiv );
		this.add( this.panelsDiv );

		this.selected = '';

	}

	select( id ) {

		let tab;
		let panel;
		const scope = this;

		// Deselect current selection
		if ( this.selected && this.selected.length ) {

			tab = this.tabs.find( function ( item ) {

				return item.dom.id === scope.selected;

			} );
			panel = this.panels.find( function ( item ) {

				return item.dom.id === scope.selected;

			} );

			if ( tab ) {

				tab.removeClass( 'selected' );

			}

			if ( panel ) {

				panel.setDisplay( 'none' );

			}

		}

		tab = this.tabs.find( function ( item ) {

			return item.dom.id === id;

		} );
		panel = this.panels.find( function ( item ) {

			return item.dom.id === id;

		} );

		if ( tab ) {

			tab.addClass( 'selected' );

		}

		if ( panel ) {

			panel.setDisplay( '' );

		}

		this.selected = id;

		return this;

	}

	addTab( id, label, items ) {

		const tab = new UITab( label, this );
		tab.setId( id );
		this.tabs.push( tab );
		this.tabsDiv.add( tab );

		const panel = new UIDiv();
		panel.setId( id );
		panel.add( items );
		panel.setDisplay( 'none' );
		this.panels.push( panel );
		this.panelsDiv.add( panel );

		this.select( id );

	}

}

