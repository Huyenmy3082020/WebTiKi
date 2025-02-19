const ProductService = require("../service/Productservice");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
      discount,
      selled,
    } = req.body;

    if (
      !name ||
      !image ||
      !type ||
      !price ||
      !countInStock ||
      !rating ||
      !description ||
      !discount ||
      !selled
    ) {
      return res.status(400).json({
        status: "err",
        error: "Tất cả các trường là bắt buộc",
      });
    }

    const result = await ProductService.createProduct(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(200).json({
      status: "err",
      error: error.message,
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;

    const result = await ProductService.getProduct(
      Number(limit),
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "err",
      error: error.message,
    });
  }
};
const getProductTrash = async (req, res) => {
  try {
    const result = await ProductService.getProductTrash(); // Gọi hàm service
    return res.status(200).json(result); // Trả về kết quả JSON cho người dùng
  } catch (error) {
    return res.status(500).json({
      status: "err",
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    if (!productId) {
      return res.status(400).json({
        status: "err",
        error: "ID sản phẩm không được xác định",
      });
    }

    const result = await ProductService.updateProduct(productId, updateData);

    if (result.status === "err") {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "err",
      error: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const result = await ProductService.deleteProduct(productId);

    if (result.status === "err") {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "err",
      error: error.message,
    });
  }
};
const destroyProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const result = await ProductService.destroyProduct(productId);

    if (result.status === "err") {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "err",
      error: error.message,
    });
  }
};
const deleteMany = async (req, res) => {
  try {
    const ids = req.body.id;
    const result = await ProductService.deleteMany(ids);
    if (result.status === "err") {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "err",
      error: error.message,
    });
  }
};
const getProductbyId = async (req, res) => {
  try {
    const result = await ProductService.getProductbyId(req.params.id);

    if (result.status === "err") {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "err",
      error: error.message,
    });
  }
};
const restoreProductController = async (req, res) => {
  const data = req.body; // Lấy data từ body của yêu cầu

  try {
    const result = await ProductService.restoreProduct(data); // Gọi service với id và data

    if (result.status === "ok") {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({
      status: "err",
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductbyId,
  getProductTrash,
  restoreProductController,
  destroyProduct,
  deleteMany,
};
