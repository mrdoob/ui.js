import UIElement from "./Element.js";

export default class UIColor extends UIElement {

	constructor() {

		super( document.createElement( 'input' ) );

		this.dom.className = 'Color';
		this.dom.style.width = '32px';
		this.dom.style.height = '16px';
		this.dom.style.border = '0px';
		this.dom.style.padding = '2px';
		this.dom.style.backgroundColor = 'transparent';

		this.dom.setAttribute( 'autocomplete', 'off' );

		try {

			this.dom.type = 'color';
			this.dom.value = '#ffffff';

		} catch ( exception ) {}

	}

	getValue() {

		return this.dom.value;

	}

	getHexValue() {

		return parseInt( this.dom.value.substr( 1 ), 16 );

	}

	setValue( value ) {

		this.dom.value = value;

		return this;

	}

	setHexValue( hex ) {

		this.dom.value = '#' + ( '000000' + hex.toString( 16 ) ).slice( - 6 );

		return this;

	}

}

