#!/usr/bin/env node

/**
 * Admin binary for uranio-api web service
 *
 * @packageDocumentation
 */

import dotenv from 'dotenv';
const result = dotenv.config();

if(result.error){
	throw result.error;
}

export * from '../srv/register';

import uranio from '../server';
uranio.init();

const service = uranio.api.service.create();
service.listen();

export * from '../srv/delta/index';
