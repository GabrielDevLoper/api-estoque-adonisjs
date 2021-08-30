import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Categoria from 'App/Models/Categoria'

export default class CategoriaSeederSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const categorias = await Categoria.all()

    if (categorias.length <= 0) {
      await Categoria.createMany([
        {
          nome: 'Higiene',
        },
        {
          nome: 'Limpeza',
        },
        {
          nome: 'Cereais',
        },
      ])
    }
  }
}
