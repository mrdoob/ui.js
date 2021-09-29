export default class UIElement {

	constructor( dom ) {

		this.dom = dom;

	}

	add() {

		for ( let i = 0; i < arguments.length; i ++ ) {

			const argument = arguments[ i ];

			if ( argument instanceof UIElement ) {

				this.dom.appendChild( argument.dom );

			} else {

				console.error( 'UIElement:', argument, 'is not an instance of UIElement.' );

			}

		}

		return this;

	}

	remove() {

		for ( let i = 0; i < arguments.length; i ++ ) {

			const argument = arguments[ i ];

			if ( argument instanceof UIElement ) {

				this.dom.removeChild( argument.dom );

			} else {

				console.error( 'UIElement:', argument, 'is not an instance of UIElement.' );

			}

		}

		return this;

	}

	clear() {

		while ( this.dom.children.length ) {

			this.dom.removeChild( this.dom.lastChild );

		}

	}

	setId( id ) {

		this.dom.id = id;

		return this;

	}

	getId() {

		return this.dom.id;

	}

	setClass( name ) {

		this.dom.className = name;

		return this;

	}

	addClass( name ) {

		this.dom.classList.add( name );

		return this;

	}

	removeClass( name ) {

		this.dom.classList.remove( name );

		return this;

	}

	setStyle( style, array ) {

		for ( let i = 0; i < array.length; i ++ ) {

			this.dom.style[ style ] = array[ i ];

		}

		return this;

	}

	setDisabled( value ) {

		this.dom.disabled = value;

		return this;

	}

	setTextContent( value ) {

		this.dom.textContent = value;

		return this;

	}

	setInnerHTML( value ) {

		this.dom.innerHTML = value;

	}

	getIndexOfChild( element ) {

		return Array.prototype.indexOf.call( this.dom.children, element.dom );

	}

}

// properties

const properties = [ 'position', 'left', 'top', 'right', 'bottom', 'width', 'height', 'border', 'borderLeft',
	'borderTop', 'borderRight', 'borderBottom', 'borderColor', 'display', 'overflow', 'margin', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'padding', 'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom', 'verticalAlign', 'color',
	'background', 'backgroundColor', 'opacity', 'fontSize', 'fontWeight', 'textAlign', 'textDecoration', 'textTransform', 'cursor', 'zIndex' ];

properties.forEach( function ( property ) {

	const method = 'set' + property.substr( 0, 1 ).toUpperCase() + property.substr( 1, property.length );

	UIElement.prototype[ method ] = function () {

		this.setStyle( property, arguments );

		return this;

	};

} );

// events

const events = [ 'KeyUp', 'KeyDown', 'MouseOver', 'MouseOut', 'Click', 'DblClick', 'Change', 'Input' ];

events.forEach( function ( event ) {

	const method = 'on' + event;

	UIElement.prototype[ method ] = function ( callback ) {

		this.dom.addEventListener( event.toLowerCase(), callback.bind( this ), false );

		return this;

	};

} );

