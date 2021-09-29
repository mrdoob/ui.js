import UIElement from "./Element.js";

export default class UIInput extends UIElement {

	constructor( text ) {

		super( document.createElement( 'input' ) );

		this.dom.className = 'Input';
		this.dom.style.padding = '2px';
		this.dom.style.border = '1px solid transparent';

		this.dom.setAttribute( 'autocomplete', 'off' );

		this.dom.addEventListener( 'keydown', function ( event ) {

			event.stopPropagation();

		}, false );

		this.setValue( text );

	}

	getValue() {

		return this.dom.value;

	}

	setValue( value ) {

		this.dom.value = value;

		return this;

	}

}

