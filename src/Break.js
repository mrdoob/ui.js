import UIElement from "./Element.js";

export default class UIBreak extends UIElement {

	constructor() {

		super( document.createElement( 'br' ) );

		this.dom.className = 'Break';

	}

}

