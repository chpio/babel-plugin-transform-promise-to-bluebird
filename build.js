const babel = require('@babel/core');
const fs = require('fs');

{
	const {code, map} = babel.transformFileSync('./main.js', {
		presets: [
			['@babel/preset-env', {
				targets: {
					node: '4.0',
				},
				modules: 'cjs',
			}],
		],
		sourceMaps: true,
	});
	fs.writeFileSync('./main.cjs.js', `${code}\n//# sourceMappingURL=main.cjs.js.map`);
	fs.writeFileSync('./main.cjs.js.map', JSON.stringify(map));
}

{
	const {code, map} = babel.transformFileSync('./main.js', {
		presets: [
			['@babel/preset-env', {
				targets: {
					node: '4.0',
				},
				modules: false,
			}],
		],
		sourceMaps: true,
	});
	fs.writeFileSync('./main.mjs.js', `${code}\n//# sourceMappingURL=main.mjs.js.map`);
	fs.writeFileSync('./main.mjs.js.map', JSON.stringify(map));
}
