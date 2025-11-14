require('reflect-metadata');

// Simple decorator implementation for JavaScript
function createDecorator(name) {
  return function decorator(...args) {
    return function (target, propertyKey, descriptor) {
      if (!Reflect.hasMetadata(name, target)) {
        Reflect.defineMetadata(name, [], target);
      }
      const metadata = Reflect.getMetadata(name, target);
      metadata.push({ target, propertyKey, descriptor, args });
      return descriptor;
    };
  };
}

// Class-level decorators
const Module = (config) => (target) => {
  Reflect.defineMetadata('module:config', config, target);
  return target;
};

const Injectable = () => (target) => {
  Reflect.defineMetadata('injectable', true, target);
  return target;
};

const Controller = (path) => (target) => {
  Reflect.defineMetadata('controller:path', path, target);
  return target;
};

// Method-level decorators
const Post = (path) => (target, propertyKey, descriptor) => {
  if (!Reflect.hasMetadata('routes', target)) {
    Reflect.defineMetadata('routes', [], target);
  }
  const routes = Reflect.getMetadata('routes', target);
  routes.push({ method: 'POST', path: path || '', handler: propertyKey });
  return descriptor;
};

const Get = (path) => (target, propertyKey, descriptor) => {
  if (!Reflect.hasMetadata('routes', target)) {
    Reflect.defineMetadata('routes', [], target);
  }
  const routes = Reflect.getMetadata('routes', target);
  routes.push({ method: 'GET', path: path || '', handler: propertyKey });
  return descriptor;
};

const Put = (path) => (target, propertyKey, descriptor) => {
  if (!Reflect.hasMetadata('routes', target)) {
    Reflect.defineMetadata('routes', [], target);
  }
  const routes = Reflect.getMetadata('routes', target);
  routes.push({ method: 'PUT', path: path || '', handler: propertyKey });
  return descriptor;
};

const Delete = (path) => (target, propertyKey, descriptor) => {
  if (!Reflect.hasMetadata('routes', target)) {
    Reflect.defineMetadata('routes', [], target);
  }
  const routes = Reflect.getMetadata('routes', target);
  routes.push({ method: 'DELETE', path: path || '', handler: propertyKey });
  return descriptor;
};

// Parameter decorators
const Body = () => (target, propertyKey, parameterIndex) => {
  if (!Reflect.hasMetadata('body:params', target, propertyKey)) {
    Reflect.defineMetadata('body:params', [], target, propertyKey);
  }
  const params = Reflect.getMetadata('body:params', target, propertyKey);
  params[parameterIndex] = { type: 'body' };
};

const Param = (paramName) => (target, propertyKey, parameterIndex) => {
  if (!Reflect.hasMetadata('param:params', target, propertyKey)) {
    Reflect.defineMetadata('param:params', {}, target, propertyKey);
  }
  const params = Reflect.getMetadata('param:params', target, propertyKey);
  params[parameterIndex] = { type: 'param', name: paramName };
};

// API decorators (Swagger)
const ApiTags = (...tags) => (target) => {
  Reflect.defineMetadata('swagger:tags', tags, target);
  return target;
};

const ApiOperation = (config) => (target, propertyKey, descriptor) => {
  if (!Reflect.hasMetadata('swagger:operations', target)) {
    Reflect.defineMetadata('swagger:operations', {}, target);
  }
  const operations = Reflect.getMetadata('swagger:operations', target);
  operations[propertyKey] = config;
  return descriptor;
};

const ApiResponse = (config) => (target, propertyKey, descriptor) => {
  if (!Reflect.hasMetadata('swagger:responses', target, propertyKey)) {
    Reflect.defineMetadata('swagger:responses', [], target, propertyKey);
  }
  const responses = Reflect.getMetadata('swagger:responses', target, propertyKey);
  responses.push(config);
  return descriptor;
};

const ApiParam = (config) => (target, propertyKey, descriptor) => {
  if (!Reflect.hasMetadata('swagger:params', target, propertyKey)) {
    Reflect.defineMetadata('swagger:params', [], target, propertyKey);
  }
  const params = Reflect.getMetadata('swagger:params', target, propertyKey);
  params.push(config);
  return descriptor;
};

const ApiBody = (config) => (target, propertyKey, descriptor) => {
  Reflect.defineMetadata('swagger:body', config, target, propertyKey);
  return descriptor;
};

module.exports = {
  Module,
  Injectable,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
};
