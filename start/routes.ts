import Route from '@ioc:Adonis/Core/Route'

Route.post('/usuario/cadastrar', 'UsuariosController.store')
Route.post('/login', 'AuthController.login')

Route.group(() => {
  // Rotas que usuarios com permissão adm e gestor podem acessar
  Route.group(() => {
    Route.resource('/perfis', 'PerfisController').apiOnly()
    Route.resource('/categorias', 'CategoriasController').apiOnly()
    Route.resource('/produtos', 'ProdutosController').apiOnly()
    Route.post('/produto/:idProduto/entrada', 'ProdutosEntradaSaidasController.entrada')
    Route.post('/produto/:idProduto/saida', 'ProdutosEntradaSaidasController.saida')
    Route.get('/produtos/entrada/saida', 'ProdutosEntradaSaidasController.index')
  })

  // Rotas que usuarios com permissão de adm podem acessar
  Route.group(() => {
    Route.resource('/usuarios', 'UsuariosController').apiOnly().except(['store'])
  }).middleware(['admin'])
}).middleware('auth')
