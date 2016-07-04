export default function promiseToBluebird({types: t}) {
	return {
		visitor: {
			ReferencedIdentifier(path, state) {
				const {node, parent, scope} = path;

				if (node.name !== 'Promise') return;
				if (t.isMemberExpression(parent)) return;
				if (scope.getBindingIdentifier(node.name)) return;

				path.replaceWith(state.addImport('bluebird', 'default', node.name));
			},

			MemberExpression: {
				exit(path, state) {
					const {node} = path;
					const obj = node.object;

					if (obj.name !== 'Promise') return;
					if (!path.isReferenced()) return;
					if (path.scope.getBindingIdentifier(obj.name)) return;

					path.replaceWith(t.memberExpression(
						state.addImport('bluebird', 'default', obj.name),
						node.property,
						node.computed
					));
				},
			},
		},
	};
}
