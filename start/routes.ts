import Route from '@ioc:Adonis/Core/Route'

Route.post('/usuario/cadastrar', 'UsuariosController.store')
Route.post('/login', 'AuthController.login')

Route.group(() => {
  // Rotas que usuarios com permissão adm e gestor podem acessar
  Route.group(() => {
    Route.resource('/perfis', 'PerfisController').apiOnly()
    Route.resource('/categorias', 'CategoriasController').apiOnly()
    Route.resource('/produtos', 'ProdutosController').apiOnly()
  })
    .middleware('admin')
    .middleware('gestor')

  // Rotas que usuarios com permissão de adm podem acessar
  Route.group(() => {
    Route.resource('/usuarios', 'UsuariosController').apiOnly().except(['store'])
  }).middleware(['admin'])
}).middleware('auth')
