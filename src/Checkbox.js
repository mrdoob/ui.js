import UIElement from "./Element.js";

export default class UICheckbox extends UIElement {

	constructor( boolean ) {

		super( document.createElement( 'input' ) );

		this.dom.className = 'Checkbox';
		this.dom.type = 'checkbox';

		this.setValue( boolean );

	}

	getValue() {

		return this.dom.checked;

	}

	setValue( value ) {

		if ( value !== undefined ) {

			this.dom.checked = value;

		}

		return this;

	}

}


