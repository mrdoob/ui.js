# ui.js

## install

### ES modules import

UI namespace module
```javascript
import * as UI from './build/ui.ns.js';
new UI.UIRow();
```

separated imports (enable tree shaking)
```javascript
import { UIDiv, UIPanel } from './build/ui.js';
new UIDiv();
```

## usage


See https://github.com/mrdoob/three.js/tree/dev/editor