import Route from '@ioc:Adonis/Core/Route'

Route.post('/usuario/cadastrar', 'UsuariosController.store')

Route.post('/login', 'AuthController.login')

Route.group(() => {
  Route.resource('/usuarios', 'UsuariosController').apiOnly().except(['store'])
  Route.resource('/perfis', 'PerfisController').apiOnly()
  Route.resource('/categorias', 'CategoriasController').apiOnly()
  Route.resource('/produtos', 'ProdutosController').apiOnly()
}).middleware('auth')
