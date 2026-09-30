import FakultasModel from '../model/fakultas.model.js'
import { apiResponse } from '../utils/response.js'

class FakultasController {
  static async index(req, res) {
  const listFakultas = await FakultasModel.find()

    return apiResponse({
      res,
      status: 200,
      message: 'List Fakultas',
      data: listFakultas,
    })
  }
  static async show(req, res) {
    const FakultasId = req.params.id

    const fakultas = await FakultasModel.findById(FakultasId)

    return apiResponse({
      res,
      status: 200,
      message: 'Detail Fakultas',
      data: fakultas
       
    })
  }

  static async store(req, res) {
    const {name} = req.body

    const fakultas = await FakultasModel.create({
      name : name
    })

    return apiResponse({
    res,
    status: 200,
    message: 'Fakultas Berhasil Di buat',
    data: fakultas
    })
  }
}

export default FakultasController
