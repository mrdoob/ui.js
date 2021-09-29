import UIElement from "./Element.js";

export default class UITextArea extends UIElement {

	constructor() {

		super( document.createElement( 'textarea' ) );

		this.dom.className = 'TextArea';
		this.dom.style.padding = '2px';
		this.dom.spellcheck = false;

		this.dom.setAttribute( 'autocomplete', 'off' );

		this.dom.addEventListener( 'keydown', function ( event ) {

			event.stopPropagation();

			if ( event.keyCode === 9 ) {

				event.preventDefault();

				const cursor = this.dom.selectionStart;

				this.dom.value = this.dom.value.substring( 0, cursor ) + '\t' + this.dom.value.substring( cursor );
				this.dom.selectionStart = cursor + 1;
				this.dom.selectionEnd = this.dom.selectionStart;

			}

		}, false );

	}

	getValue() {

		return this.dom.value;

	}

	setValue( value ) {

		this.dom.value = value;

		return this;

	}

}

