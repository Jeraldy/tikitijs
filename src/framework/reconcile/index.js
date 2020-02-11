import morphAttrs from './morphAttrs';
import morphdomFactory from './morphdom';

var reconcile = morphdomFactory(morphAttrs);

export default reconcile;