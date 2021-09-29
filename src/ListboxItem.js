import UIDiv from "./Div.js";

export default class ListboxItem extends UIDiv {

	constructor( parent ) {

		super();

		this.dom.className = 'ListboxItem';

		this.parent = parent;

		const scope = this;

		function onClick() {

			if ( scope.parent ) {

				scope.parent.setValue( scope.getId( ) );

			}

		}

		this.dom.addEventListener( 'click', onClick, false );

	}

}
