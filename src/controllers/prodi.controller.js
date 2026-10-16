
import mongoose from "mongoose"
import fakultasModel from "../model/fakultas.model.js"
import ProdiModel from "../model/prodi.model.js"
import {
    storeProdiSchema,
    updateProdiSchema,
} from "../schemas/prodi.schema.js"
import {
    apiResponse,
    apiResponseValidation,
} from "../utils/response.js"

class ProdiController {
    static async index(req, res) {
        try {
            const listProdi = await ProdiModel.find().populate("fakultas")

            return apiResponse({
                res,
                status: 200,
                message: "List Prodi",
                data: listProdi,
            })
        } catch (error) {
            return apiResponse({
                res,
                status: 500,
                message: error.message,
            })
        }
    }

    static async show(req, res) {
        try {
            const { id } = req.params

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return apiResponse({
                    res,
                    status: 400,
                    message: "ID Prodi tidak valid",
                })
            }

            const prodi = await ProdiModel.findById(id).populate("fakultas")

            if (!prodi) {
                return apiResponse({
                    res,
                    status: 404,
                    message: "Prodi tidak ditemukan",
                })
            }

            return apiResponse({
                res,
                status: 200,
                message: "Detail Prodi",
                data: prodi,
            })
        } catch (error) {
            return apiResponse({
                res,
                status: 500,
                message: error.message,
            })
        }
    }

    static async store(req, res) {
        try {
            const result = storeProdiSchema.safeParse(req.body)

            if (!result.success) {
                return apiResponseValidation({
                    res,
                    errors: result.error,
                })
            }

            const { kode, nama_prodi, fakultas_id } = result.data

            if (!mongoose.Types.ObjectId.isValid(fakultas_id)) {
                return apiResponse({
                    res,
                    status: 400,
                    message: "ID Fakultas tidak valid",
                })
            }

            if (fakultas_id){
            const isExists = await fakultasModel.exists({
                _id: new mongoose.Types.ObjectId(fakultas_id),
            })

            if (!isExists) {
                return apiResponse({
                    res,
                    status: 404,
                    message: "Fakultas tidak ada",
                    data: null
                })
            }

        }

            const newProdi = await ProdiModel.create({
                kode,
                nama_prodi,
                fakultas: fakultas_id,
            })

            return apiResponse({
                res,
                status: 201,
                message: "Prodi berhasil dibuat",
                data: newProdi,
            })
        } catch (error) {
            return apiResponse({
                res,
                status: 500,
                message: error.message,
            })
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return apiResponse({
                    res,
                    status: 400,
                    message: "ID Prodi tidak valid",
                })
            }

            const result = updateProdiSchema.safeParse(req.body)

            if (!result.success) {
                return apiResponseValidation({
                    res,
                    errors: result.error,
                })
            }

            const { kode, nama_prodi, fakultas_id } = result.data

            if (!mongoose.Types.ObjectId.isValid(fakultas_id)) {
                return apiResponse({
                    res,
                    status: 400,
                    message: "ID Fakultas tidak valid",
                })
            }

            const fakultasExists = await fakultasModel.exists({
                _id: new mongoose.Types.ObjectId(fakultas_id),
            })

            if (!fakultasExists) {
                return apiResponse({
                    res,
                    status: 404,
                    message: "Fakultas tidak ada",
                })
            }

            const updatedProdi = await ProdiModel.findByIdAndUpdate(
                id,
                {
                    kode : kode,
                    nama_prodi : nama_prodi,
                    fakultas: fakultas_id
                },
                {
                    new: true,
                    runValidators: true,
                },
            ).populate("fakultas")

            if (!updatedProdi) {
                return apiResponse({
                    res,
                    status: 404,
                    message: "Prodi tidak ada",
                    data: null
                })
            }

            return apiResponse({
                res,
                status: 200,
                message: "Data berhasil update",
                data: updatedProdi,
            })
        } catch (error) {
            return apiResponse({
                res,
                status: 500,
                message: error.message,
            })
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return apiResponse({
                    res,
                    status: 400,
                    message: "ID Prodi tidak valid",
                })
            }

            const deletedProdi = await ProdiModel.findByIdAndDelete(id)

            if (!deletedProdi) {
                return apiResponse({
                    res,
                    status: 404,
                    message: "Prodi tidak ada",
                    data: null
                })
            }

            return apiResponse({
                res,
                status: 200,
                message: "Prodi berhasil dihapus",
                data: deletedProdi,
            })
        } catch (error) {
            return apiResponse({
                res,
                status: 500,
                message: error.message,
            })
        }
    }
}

export default ProdiController
