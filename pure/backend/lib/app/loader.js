const Koa = require("koa");
const fs = require("fs");
const Router = require("koa-router");
const requireDir = require("require-dir-lite");

const config = require("config-lev")("../..");

let controller = requireDir("../controller");
let service = requireDir("../service");
let routerF = require("../router");
let plugin = requireDir("../plugin");

module.exports = Loader;

function Loader() {
  if (!(this instanceof Loader)) {
    return new Loader();
  }

  this.config = config;
  this.controller = controller;

  let koaRouter = new Router();
  let router = routerF(this);
  let me = this;
  Object.assign(me, plugin);
  Object.keys(router).forEach(key => {
    const [method, path] = key.split(" ");
    koaRouter[method](path, async function(ctx) {
      await router[key](ctx, service, me);
    });
  });

  this.use(koaRouter.routes());
}

//Loader.prototype = Object.create(Koa.prototype)
Loader.prototype = new Koa();
