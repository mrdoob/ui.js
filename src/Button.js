import UIElement from "./Element.js";

export default class UIButton extends UIElement {

	constructor( value ) {

		super( document.createElement( 'button' ) );

		this.dom.className = 'Button';
		this.dom.textContent = value;

	}

}

