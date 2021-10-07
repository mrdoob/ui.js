import UIElement from "./Element.js";

export default class UISelect extends UIElement {

	constructor() {

		super( document.createElement( 'select' ) );

		this.dom.className = 'Select';
		this.dom.style.padding = '2px';

		this.dom.setAttribute( 'autocomplete', 'off' );

	}

	setMultiple( boolean ) {

		this.dom.multiple = boolean;

		return this;

	}

	setOptions( options ) {

		const selected = this.dom.value;

		while ( this.dom.children.length > 0 ) {

			this.dom.removeChild( this.dom.firstChild );

		}

		for ( const key in options ) {

			const option = document.createElement( 'option' );
			option.value = key;
			option.innerHTML = options[ key ];
			this.dom.appendChild( option );

		}

		this.dom.value = selected;

		return this;

	}

	getValue() {

		return this.dom.value;

	}

	setValue( value ) {

		value = String( value );

		if ( this.dom.value !== value ) {

			this.dom.value = value;

		}

		return this;

	}

}

