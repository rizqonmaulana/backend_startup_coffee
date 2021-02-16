const {
  getProductModel,
  getProductWOPaginationModel,
  getProductCountModel,
  getProductByIdModel,
  postProductModel,
  patchProductModel,
  deleteProductModel,
  getProductBySearchModel,
  getProductCountWithSearchModel,
  sortProductModel,
  getProductBySearchAndSortModel,
  getProductDetailModel,
  getProductPriceModel
} = require('../model/m_product')
const { postSizeModel, patchSizeModel } = require('../model/m_size')
const { postDeliveryModel, patchDeliveryModel } = require('../model/m_delivery')
const helper = require('../helper/response')
const qs = require('querystring')
const redis = require('redis')
const client = redis.createClient()
const fs = require('fs')

module.exports = {
  getProduct: async (request, response) => {
    try {
      let { search, page, limit, sortBy, sortType, id } = request.query

      page = parseInt(page)
      limit = parseInt(limit)

      // get totalData with search / not
      let totalData
      if (search) {
        totalData = await getProductCountWithSearchModel(search)
      } else {
        totalData = await getProductCountModel()
      }

      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const prevLink =
        page > 1
          ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
          : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
          : null

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink: nextLink && process.env.URL + `/product?${nextLink}`,
        prevLink: prevLink && process.env.URL + `/product?${prevLink}`
      }

      // decide result model to use
      let result
      if (search && sortBy && sortType) {
        result = await getProductBySearchAndSortModel(
          search,
          sortBy,
          sortType,
          limit,
          offset
        )
      } else if (search) {
        result = await getProductBySearchModel(search, limit, offset)
      } else if (sortBy && sortType) {
        result = await sortProductModel(sortBy, sortType, limit, offset)
      } else if (limit && page) {
        result = await getProductModel(limit, offset)
      } else if (id) {
        result = await getProductPriceModel(id)
      } else {
        result = await getProductWOPaginationModel()
      }

      // redis
      const newData = {
        result,
        pageInfo
      }
      client.setex(
        `getproduct:${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify(newData)
      )

      return helper.response(
        response,
        200,
        'Success get product',
        result,
        pageInfo
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getProductById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getProductByIdModel(id)
      if (result.length > 0) {
        client.setex(`getproductbyid:${id}`, 3600, JSON.stringify(result))
        return helper.response(
          response,
          200,
          `Success Get Product By Id ${id}`,
          result
        )
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getProductDetail: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getProductDetailModel(id)
      if (result.length > 0) {
        client.setex(`getproductdetail:${id}`, 3600, JSON.stringify(result))
        return helper.response(
          response,
          200,
          `Success Get Product By Id ${id}`,
          result
        )
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postProduct: async (request, response) => {
    try {
      const {
        productName,
        productPrice,
        productDesc,
        productStartHour,
        productEndHour,
        productQty,
        categoryId,
        sizeRegular,
        sizeLarge,
        sizeExtraLarge,
        size250gr,
        size300gr,
        size500gr,
        deliveryHome,
        deliveryDineIn,
        deliveryTakeAway
      } = request.body

      const setDataSize = {
        size_regular: sizeRegular,
        size_large: sizeLarge,
        size_extra_large: sizeExtraLarge,
        size_250gr: size250gr,
        size_300gr: size300gr,
        size_500gr: size500gr
      }

      const setDataDelivery = {
        delivery_home: deliveryHome,
        delivery_dine_in: deliveryDineIn,
        delivery_take_away: deliveryTakeAway
      }

      const sizeResult = await postSizeModel(setDataSize)
      const deliveryResult = await postDeliveryModel(setDataDelivery)
      const setData = {
        product_name: productName,
        product_price: productPrice,
        product_pic: request.file === undefined ? '' : request.file.filename,
        product_desc: productDesc,
        product_start_hour: productStartHour,
        product_end_hour: productEndHour,
        product_qty: productQty,
        category_id: categoryId,
        size_id: sizeResult.size_id,
        delivery_id: deliveryResult.delivery_id,
        product_created_at: new Date()
      }
      console.log(setData)
      const result = await postProductModel(setData)
      return helper.response(response, 200, 'Success Post Product', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params
      const {
        productName,
        productPrice,
        productDesc,
        productStartHour,
        productEndHour,
        productQty,
        categoryId,
        sizeId,
        deliveryId,
        sizeRegular,
        sizeLarge,
        sizeExtraLarge,
        size250gr,
        size300gr,
        size500gr,
        deliveryHome,
        deliveryDineIn,
        deliveryTakeAway
      } = request.body
      // disini kondisi validation
      const setDataSize = {
        size_regular: sizeRegular,
        size_large: sizeLarge,
        size_extra_large: sizeExtraLarge,
        size_250gr: size250gr,
        size_300gr: size300gr,
        size_500gr: size500gr
      }

      const setDataDelivery = {
        delivery_home: deliveryHome,
        delivery_dine_in: deliveryDineIn,
        delivery_take_away: deliveryTakeAway
      }

      let newPic
      const product = await getProductByIdModel(id)

      if (request.file === undefined) {
        newPic = product[0].product_pic
      } else if (request.file && product[0].product_pic) {
        newPic = request.file.filename
        fs.unlink(`./uploads/${product[0].product_pic}`, function (err) {
          if (err) throw err
          console.log('File deleted!')
        })
      } else if (request.file) {
        newPic = request.file.filename
      }

      const setData = {
        product_name: productName,
        product_price: productPrice,
        product_pic: newPic,
        product_desc: productDesc,
        product_start_hour: productStartHour,
        product_end_hour: productEndHour,
        product_qty: productQty,
        category_id: categoryId,
        size_id: sizeId,
        delivery_id: deliveryId,
        product_updated_at: new Date()
      }

      const getSizeId = setData.size_id
      const getDeliveryId = setData.delivery_id

      const checkId = await getProductByIdModel(id)

      if (checkId.length > 0) {
        await patchSizeModel(setDataSize, getSizeId)
        await patchDeliveryModel(setDataDelivery, getDeliveryId)
        const result = await patchProductModel(setData, id)
        return helper.response(response, 200, 'Success Patch Product', result)
      } else {
        console.log('masuk else')
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params

      const checkId = await getProductByIdModel(id)
      if (checkId.length > 0) {
        if (checkId[0].product_pic) {
          fs.unlink(`./uploads/${checkId[0].product_pic}`, function (err) {
            if (err) throw err
            console.log('File deleted!')
          })
        }
        const result = await deleteProductModel(id)
        return helper.response(
          response,
          200,
          `Success Delete Product by id : ${id}`,
          result
        )
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
