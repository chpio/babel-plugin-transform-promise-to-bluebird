# babel-plugin-transform-promise-to-bluebird

This plugin transforms `Promise` to `bluebird`.

## Usage

1. Install: `npm install --save-dev babel-plugin-transform-promise-to-bluebird`
2. Add *transform-promise-to-bluebird* to your *.babelrc* file:
```json
{
	"plugins": ["transform-promise-to-bluebird"]
}
```
If you'r using the *transform-runtime* plugin add *transform-promise-to-bluebird* before
*transform-runtime*:
```json
{
	"plugins": [
		"transform-promise-to-bluebird",
		"transform-runtime"
	]
}
```
