import UIElement from "./Element.js";

export default class UINumber extends UIElement {

	constructor( number ) {

		super( document.createElement( 'input' ) );

		this.dom.style.cursor = 'ns-resize';
		this.dom.className = 'Number';
		this.dom.value = '0.00';

		this.dom.setAttribute( 'autocomplete', 'off' );

		this.value = 0;

		this.min = - Infinity;
		this.max = Infinity;

		this.precision = 2;
		this.step = 1;
		this.unit = '';
		this.nudge = 0.01;

		this.setValue( number );

		const scope = this;

		const changeEvent = document.createEvent( 'HTMLEvents' );
		changeEvent.initEvent( 'change', true, true );

		let distance = 0;
		let onMouseDownValue = 0;

		const pointer = { x: 0, y: 0 };
		const prevPointer = { x: 0, y: 0 };

		function onMouseDown( event ) {

			event.preventDefault();

			distance = 0;

			onMouseDownValue = scope.value;

			prevPointer.x = event.clientX;
			prevPointer.y = event.clientY;

			document.addEventListener( 'mousemove', onMouseMove, false );
			document.addEventListener( 'mouseup', onMouseUp, false );

		}

		function onMouseMove( event ) {

			const currentValue = scope.value;

			pointer.x = event.clientX;
			pointer.y = event.clientY;

			distance += ( pointer.x - prevPointer.x ) - ( pointer.y - prevPointer.y );

			let value = onMouseDownValue + ( distance / ( event.shiftKey ? 5 : 50 ) ) * scope.step;
			value = Math.min( scope.max, Math.max( scope.min, value ) );

			if ( currentValue !== value ) {

				scope.setValue( value );
				scope.dom.dispatchEvent( changeEvent );

			}

			prevPointer.x = event.clientX;
			prevPointer.y = event.clientY;

		}

		function onMouseUp() {

			document.removeEventListener( 'mousemove', onMouseMove, false );
			document.removeEventListener( 'mouseup', onMouseUp, false );

			if ( Math.abs( distance ) < 2 ) {

				scope.dom.focus();
				scope.dom.select();

			}

		}

		function onTouchStart( event ) {

			if ( event.touches.length === 1 ) {

				distance = 0;

				onMouseDownValue = scope.value;

				prevPointer.x = event.touches[ 0 ].pageX;
				prevPointer.y = event.touches[ 0 ].pageY;

				document.addEventListener( 'touchmove', onTouchMove, false );
				document.addEventListener( 'touchend', onTouchEnd, false );

			}

		}

		function onTouchMove( event ) {

			const currentValue = scope.value;

			pointer.x = event.touches[ 0 ].pageX;
			pointer.y = event.touches[ 0 ].pageY;

			distance += ( pointer.x - prevPointer.x ) - ( pointer.y - prevPointer.y );

			let value = onMouseDownValue + ( distance / ( event.shiftKey ? 5 : 50 ) ) * scope.step;
			value = Math.min( scope.max, Math.max( scope.min, value ) );

			if ( currentValue !== value ) {

				scope.setValue( value );
				scope.dom.dispatchEvent( changeEvent );

			}

			prevPointer.x = event.touches[ 0 ].pageX;
			prevPointer.y = event.touches[ 0 ].pageY;

		}

		function onTouchEnd( event ) {

			if ( event.touches.length === 0 ) {

				document.removeEventListener( 'touchmove', onTouchMove, false );
				document.removeEventListener( 'touchend', onTouchEnd, false );

			}

		}

		function onChange() {

			scope.setValue( scope.dom.value );

		}

		function onFocus() {

			scope.dom.style.backgroundColor = '';
			scope.dom.style.cursor = '';

		}

		function onBlur() {

			scope.dom.style.backgroundColor = 'transparent';
			scope.dom.style.cursor = 'ns-resize';

		}

		function onKeyDown( event ) {

			event.stopPropagation();

			switch ( event.keyCode ) {

				case 13: // enter
					scope.dom.blur();
					break;

				case 38: // up
					event.preventDefault();
					scope.setValue( scope.getValue() + scope.nudge );
					scope.dom.dispatchEvent( changeEvent );
					break;

				case 40: // down
					event.preventDefault();
					scope.setValue( scope.getValue() - scope.nudge );
					scope.dom.dispatchEvent( changeEvent );
					break;

			}

		}

		onBlur();

		this.dom.addEventListener( 'keydown', onKeyDown, false );
		this.dom.addEventListener( 'mousedown', onMouseDown, false );
		this.dom.addEventListener( 'touchstart', onTouchStart, false );
		this.dom.addEventListener( 'change', onChange, false );
		this.dom.addEventListener( 'focus', onFocus, false );
		this.dom.addEventListener( 'blur', onBlur, false );

	}

	getValue() {

		return this.value;

	}

	setValue( value ) {

		if ( value !== undefined ) {

			value = parseFloat( value );

			if ( value < this.min ) value = this.min;
			if ( value > this.max ) value = this.max;

			this.value = value;
			this.dom.value = value.toFixed( this.precision );

			if ( this.unit !== '' ) this.dom.value += ' ' + this.unit;

		}

		return this;

	}

	setPrecision( precision ) {

		this.precision = precision;

		return this;

	}

	setStep( step ) {

		this.step = step;

		return this;

	}

	setNudge( nudge ) {

		this.nudge = nudge;

		return this;

	}

	setRange( min, max ) {

		this.min = min;
		this.max = max;

		return this;

	}

	setUnit( unit ) {

		this.unit = unit;

		return this;

	}

}

