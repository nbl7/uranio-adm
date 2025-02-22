/**
 * Nuxt configuration file for testing Nuxt in urn-adm
 *
 * @packageDocumentation
 */

import fs from 'fs';

import { resolve } from 'path';

import { urn_log } from 'uranio-utils';

export default {
	alias: {
		'uranio/client': resolve(__dirname, './src/client'),
		'uranio-trx/client': resolve(__dirname, './node_modules/uranio-trx/dist/client'),
		'uranio-trx/cln/types': resolve(__dirname, './node_modules/uranio-trx/dist/cln/types'),
		'uranio-api/client': resolve(__dirname, './node_modules/uranio-api/dist/client'),
		'uranio-api/cln/types': resolve(__dirname, './node_modules/uranio-api/dist/cln/types'),
		'uranio-core/client': resolve(__dirname, './node_modules/uranio-core/dist/client'),
		'uranio-core/cln/types': resolve(__dirname, './node_modules/uranio-core/dist/cln/types'),
	},
	build: {
		extend(config) {
			// config.resolve.alias['uranio/client'] = resolve(__dirname, './src/client')
			// config.resolve.alias['uranio-trx/client'] = resolve(__dirname, './node_modules/uranio-trx/src/client')
			// config.resolve.alias['uranio-trx/client/types'] = resolve(__dirname, './node_modules/uranio-trx/src/cln/types')
			// config.resolve.alias['uranio-api/client'] = resolve(__dirname, './node_modules/uranio-api/src/client')
			// config.resolve.alias['uranio-api/client/types'] = resolve(__dirname, './node_modules/uranio-api/src/cln/types')
			// config.resolve.alias['uranio-core/client'] = resolve(__dirname, './node_modules/uranio-core/src/client')
			// config.resolve.alias['uranio-core/client/types'] = resolve(__dirname, './node_modules/uranio-core/src/cln/types')
			// console.log(config.resolve.alias);
		},
		splitChunks: {
			layouts: true,
			pages: true,
		}
	},
	env: {
		// URN_CLIENT_LOG_LEVEL: (process.env.NODE_ENV === 'production') ?
		// 	urn_log.LogLevel.ERROR : urn_log.LogLevel.FUNCTION_DEBUG,
		// URN_CLIENT_DEV_LOG_LEVEL: (process.env.NODE_ENV === 'production') ?
		// 	urn_log.LogLevel.ERROR : urn_log.LogLevel.FUNCTION_DEBUG,
		URN_LOG_LEVEL: (process.env.NODE_ENV === 'production') ?
			urn_log.LogLevel.ERROR : urn_log.LogLevel.FUNCTION_DEBUG,
		URN_DEV_LOG_LEVEL: (process.env.NODE_ENV === 'production') ?
			urn_log.LogLevel.ERROR : urn_log.LogLevel.FUNCTION_DEBUG,
		// NODE_TLS_REJECT_UNAUTHORIZED: 0
		// URN_CLIENT_FETCH: process.env.URN_CLIENT_FETCH || 'axios',
		// URN_CLIENT_PROTOCOL: process.env.URN_CLIENT_PROTOCOL || 'http',
		// URN_CLIENT_DOMAIN: process.env.URN_CLIENT_DOMAIN || 'localhost',
		// URN_CLIENT_PORT: Number(process.env.URN_CLIENT_PORT) || 4444,
		// URN_CLIENT_PREFIX_LOG: process.env.URN_PREFIX_LOG || '/log',
	},
	components: [
		{
			path: '~/components/',
			extensions: ['vue']
		}
	],
	plugins: [
		{
			src: '~/plugins/uranio.ts'
		}
	],
	srcDir: './src/nuxt/',
	target: 'static',
	ssr: false,
	generate: {
		dir: './dist/admin',
		fallback: '404.html',
		subFolders: false,
		exclude: ['/urn-admin'],
	},
	server: {
		host: "0.0.0.0",
		port: 4444,
		https: {
			cert: fs.readFileSync(resolve(__dirname, 'cert/localhost.crt')),
			key: fs.readFileSync(resolve(__dirname, 'cert/localhost.key'))
		}
	},
	modules:[
		'@nuxtjs/proxy'
	],
	buildDir: './.nuxt',
	buildModules: [
		'@nuxt/typescript-build',
		'@nuxtjs/style-resources'
	],
	proxy: {
		'/uranio/api': {
			target: "https://0.0.0.0:7774/uranio/api",
			secure: false,
			pathRewrite: {
				"^/uranio/api": ""
			}
		}
	},
	typescript: {
		typeCheck: true
	},
	router: {
		middleware: ['init'],
		// trailingSlash: false,
		linkActiveClass: 'urn-active-link',
		linkExactActiveClass: 'urn-exact-active-link',
		parseQuery(q) {
			return require('qs').parse(q);
		},
		stringifyQuery(q) {
			const r = require('qs').stringify(q);
			return r ? '?' + r : '';
		},
	},
	loading: {
		color: '#0084ff',
		height: '2px',
		throttle: 200,
		duration: 2000,
		continuous: true
	},
	telemetry: false,
	// watchers: {
	//   webpack: {
	//     ignored: [
	//       `${process.cwd()}/node_modules/**/*`,
	//       `${process.cwd()}/.uranio/server/**/*`,
	//       `${process.cwd()}/.uranio/.tmp/**/*`,
	//       `${process.cwd()}/src/**/*`,
	//       `${process.cwd()}/dist/**/*`,
	//     ]
	//   }
	// },
	hooks: {
		build: {
			before(){
				// console.log('BEFORE BUILD');
			},
			compile(){
				// console.log('BEFORE COMPILE');
			},
			compiled(){
				// console.log('╭────────────────────────────────────────────╮');
				// console.log('│                                            │');
				// console.log('│ Client listening on http://localhost:5454  │');
				// console.log('│                                            │');
				// console.log('╰────────────────────────────────────────────╯');
			}
		}
	}
};
