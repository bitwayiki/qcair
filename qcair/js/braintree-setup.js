//Braintree-angular module is prolly the best way to do this
function setupBrainTree(token){
	braintree.setup(token, 'custom', {id: 'checkout'});
	console.log("braintree is setup");
}