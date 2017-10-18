import {addNamed} from 'babel-helper-module-imports';

export default function promiseToBluebird({types: t}) {
	return {
		visitor: {
			ReferencedIdentifier(path) {
				const {node, parent, scope} = path;

				if (node.name !== 'Promise') return;
				if (t.isMemberExpression(parent)) return;
				if (scope.getBindingIdentifier('Promise')) return;

				path.replaceWith(addNamed(path, 'default', 'bluebird', {nameHint: 'Promise'}));
			},

			MemberExpression(path) {
				const {node} = path;
				const obj = node.object;

				if (obj.name !== 'Promise') return;
				if (!path.isReferenced()) return;
				if (path.scope.getBindingIdentifier('Promise')) return;

				if (node.computed) {
					path.replaceWith(
						t.memberExpression(
							addNamed(path, 'default', 'bluebird', {nameHint: 'Promise'}),
							node.property,
							true
						)
					);
				} else {
					path.replaceWith(
						addNamed(
							path,
							node.property.name,
							'bluebird',
							{nameHint: 'Promise'}
						)
					);
				}
			},
		},
	};
}
