'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/api/register', 'ApiController.register')
Route.post('/api/login', 'ApiController.login').middleware(['auth:jwt'])

Route.get('/', 'HomeController.index')

Route.group(() => {

    Route.post('/api/profile-update', 'ApiController.profileUpdate')

}).middleware(['auth:jwt'])

Route.group(() => {
    Route.get('login', 'SessionController.create')
    Route.post('login', 'SessionController.store')

    Route.get('register', 'AdminController.create')
    Route.post('register', 'AdminController.store')
}).middleware(['guest'])

Route.group(() => {
    Route.get('logout', 'SessionController.delete')
}).middleware(['auth:session'])








