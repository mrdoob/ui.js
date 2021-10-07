import UIDiv from "./Div.js";
import UIElement from "./Element.js";

export default class UIListbox extends UIDiv {

	constructor() {

		super();

		this.dom.className = 'Listbox';
		this.dom.tabIndex = 0;

		this.items = [];
		this.listitems = [];
		this.selectedIndex = 0;
		this.selectedValue = null;

	}

	setItems( items ) {

		if ( Array.isArray( items ) ) {

			this.items = items;

		}

		this.render();

	}

	render( ) {

		while ( this.listitems.length ) {

			const item = this.listitems[ 0 ];

			item.dom.remove();

			this.listitems.splice( 0, 1 );

		}

		for ( let i = 0; i < this.items.length; i ++ ) {

			const item = this.items[ i ];

			const listitem = new UIListbox.ListboxItem( this );
			listitem.setId( item.id || `Listbox-${i}` );
			listitem.setTextContent( item.name || item.type );
			this.add( listitem );

		}

	}

	add() {

		const items = Array.from( arguments );

		this.listitems = this.listitems.concat( items );

		UIElement.prototype.add.apply( this, items );

	}

	selectIndex( index ) {

		if ( index >= 0 && index < this.items.length ) {

			this.setValue( this.listitems[ index ].getId() );

		}

		this.selectedIndex = index;

	}

	getValue() {

		return this.selectedValue;

	}

	setValue( value ) {

		for ( let i = 0; i < this.listitems.length; i ++ ) {

			const element = this.listitems[ i ];

			if ( element.getId() === value ) {

				element.addClass( 'active' );

			} else {

				element.removeClass( 'active' );

			}

		}

		this.selectedValue = value;

		const changeEvent = document.createEvent( 'HTMLEvents' );
		changeEvent.initEvent( 'change', true, true );
		this.dom.dispatchEvent( changeEvent );

	}

}

