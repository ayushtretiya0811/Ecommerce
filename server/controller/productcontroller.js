import Cart from "../Models/CartModel.js";
import Product from "../Models/ProductModel.js";

export const addproductcontroller = async (req, res) => {
    try {
      // Validate request body
      const { name, description, sizes } = req.body;
     // Assuming req.files contains the uploaded images

     const images = req.files;
     console.log(req.files)
      if (!name || !description || !sizes.length) {
        return res.status(400).json({ message: 'All fields are required.', success: false });
      }
      if(!images){
        return res.status(400).json({ message: 'image is required.' , success: false});
      }
      // Create a new product instance
      const newProduct = new Product({
        name,
        description,
        images:images.map(image => image.filename),

        sizes
      });
  
      // Save the product to the database
      await newProduct.save();
  
      // Send a success response
      res.status(200).send({
        message: "product added successfully",
        success: true,
        newProduct
    })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error occurred while adding the product.' , success: false});
    }
  };
  export const updateProductController = async (req, res) => {
    try {
      const { id } = req.params;
      // Validate request body
      const { name, description, sizes ,existingImages} = req.body;
      // Assuming req.files contains the uploaded images
      const images = req.files;
      console.log(req.files);
  
      if (!name || !description || !sizes.length) {
        return res.status(400).json({ message: 'All fields are required.', success: false });
      }
  
      // Find the existing product
      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found.', success: false });
      }
      const parsedExistingImages = JSON.parse(existingImages);
      // Update product fields
      existingProduct.name = name;
      existingProduct.description = description;
      existingProduct.sizes = JSON.parse(sizes);
      existingProduct.images = parsedExistingImages;

  
      // Update images if new ones are provided
      if (images && images.length > 0) {
        const newImageFilenames = images.map(image => image.filename);
        existingProduct.images = [...existingProduct.images, ...newImageFilenames];
      }
  
      // `// Save the updated product to the database
      await existingProduct.save();
  
      // Send a success response
      res.status(200).send({
        message: "Product updated successfully",
        success: true,
        updatedProduct: existingProduct
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error occurred while updating the product.', success: false });
    }
  };
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully', success: true  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error occurred while deleting the product.', success: false });
  }
};

  export const getallproductcontroller = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).send({
        message: "products fetched successfully",
        success: true,
        products
    })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error occurred while fetching the products.' , success: false});
    }
  }
   export const singleProductcontroller = async (req, res) => {
    try {
      const {id} = req.params;
      const product = await Product.findById(id);
      res.status(200).send({
        message: "product fetched successfully",
        success: true,
        product
    })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error occurred while fetching the product.' , success: false});
    }
  }
  // export const addtoCartcontroller = async (req, res) => {
  //   try {
  //     if (!req.user) {
  //       return res.status(401).json({ message: 'User is not authenticated.', success: false });
  //     }
  //     const { productId, size , } = req.body;
  //     const product = await Product.findById(productId);
  //     if (!product) {
  //       return res.status(404).json({ message: 'Product not found.', success: false });
  //     }
      
  //     const cart = await Cart.findOneAndUpdate(
  //       { userId: req.user._id, 'products.productId': productId },
  //       { $inc: { 'products.$.quantity': 1 } },
  //       { new: true }
  //     );
  //     if (!cart) {
  //       const newCart = new Cart({
  //         userId: req.user._id,
  //         products: [
  //           {
  //             productId,
  //             size,
  //             quantity: 1,
  //             price: product.price
  //           }
  //         ]
  //       });
  //       await newCart.save();
  //       res.status(200).json({ message: 'Product added to cart successfully.', success: true, cart: newCart });
  //     } else {
  //       res.status(200).json({ message: 'Product quantity updated successfully.', success: true, cart });
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).json({ message: 'Server error occurred while adding the product to cart.' , success: false});
  //   }
  // }
  export const addtoCartcontroller = async (req, res) => {
    try {
      const {  productId, size, quantity=1 } = req.body;
      const userId = req.user._id;
  
      // Find the product by ID
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Find the selected size in the product's sizes array
      const selectedSize = product.sizes.find(s => s.size === size);
  
      if (!selectedSize) {
        return res.status(400).json({ message: 'Selected size not available' });
      }
  
      // Check if the stock quantity is sufficient
      if (selectedSize.stock < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
  
      // Check if the user already has a cart
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        // If no cart exists, create a new one
        cart = new Cart({ userId, products: [] });
      }
  
      // Check if the product with the same size is already in the cart
      const cartProductIndex = cart.products.findIndex(
        p => p.productId.toString() === productId && p.size === size
      );
  
      if (cartProductIndex > -1) {
        // If the product is already in the cart, update the quantity
        cart.products[cartProductIndex].quantity += quantity;
      } else {
        // If the product is not in the cart, add it
        cart.products.push({
          productId,
          size ,
          quantity,
          price: selectedSize.price
        });
      }
  
      // Save the cart
      await cart.save();
  
      // Update the stock quantity in the product document
     
    
  
      res.status(200).json({ message: 'Product added to cart successfully', cart  , success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while adding the product to the cart' });
    }
  };
export   const increaseCartQuantity = async (req, res) => {
    try {
      const { productId, size, quantity = 1 } = req.body;
      const userId = req.user._id;
  
      // Find the product by ID
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Find the size in the product
      const selectedSize = product.sizes.find(s => s.size === size);
      if (!selectedSize) {
        return res.status(400).json({ message: 'Invalid size selected' });
      }
  
      // Find the user's cart
      const cart = await Cart.findOne({ userId }).populate({
        path: 'products.productId',
        model: 'Product',
        select: 'name images description sizes', // Select the fields you want to include
      });;
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Find the cart item for this product and size
      const cartItem = cart.products.find(item => item.productId.equals(productId) && item.size === size);
      if (!cartItem) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      // Calculate the new quantity
      const newQuantity = cartItem.quantity + quantity;
  
      // Check if the new quantity exceeds available stock
      if (newQuantity > selectedSize.stock) {
        return res.status(200).json({ message: 'Insufficient stock available' , OutOfStock :true  , cart, success: true});
      }
  
      // Update the quantity and price
      cartItem.quantity = newQuantity;
      cartItem.price = selectedSize.price * newQuantity;
  
      // Save the cart
      await cart.save();
  
      // Check if the product is now out of stock
      const isOutOfStock = newQuantity >= selectedSize.stock;
      
      res.status(200).json({
        message: isOutOfStock ? 'Product is now out of stock' : 'Quantity updated successfully',
        cart,
        isOutOfStock: isOutOfStock ? true : false,
        success: true
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  export const decreaseCartQuantity = async (req, res) => {
    try {
      const { productId, size, quantity = 1 } = req.body;
      const userId = req.user._id;
  
      // Find the product by ID
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Find the size in the product
      const selectedSize = product.sizes.find(s => s.size === size);
      if (!selectedSize) {
        return res.status(400).json({ message: 'Invalid size selected' });
      }
  
      // Find the user's cart
      const cart = await Cart.findOne({ userId }).populate({
        path: 'products.productId',
        model: 'Product',
        select: 'name images description sizes',
      });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Find the cart item for this product and size
      const cartItem = cart.products.find(item => item.productId.equals(productId) && item.size === size);
      if (!cartItem) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      // Calculate the new quantity
      const newQuantity = cartItem.quantity - quantity;
  
      // Check if the new quantity is less than 1
      if (newQuantity < 1) {
        return res.status(400).json({ message: 'Quantity cannot be less than 1' });
      }
  
      // Update the quantity and price
      cartItem.quantity = newQuantity;
      cartItem.price = selectedSize.price * newQuantity;
  
      // Save the cart
      await cart.save();
  
      res.status(200).json({
        message: 'Quantity updated successfully',
        cart,
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  export  const removeCartItem = async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.user._id;
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { products: { productId } } },
        { new: true }
      ).populate({
        path: 'products.productId',
        model: 'Product',
        select: 'name images description sizes',
      });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      res.status(200).json({ cart , success: true});
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Server error' , success: false});
    }
  }
  export const CartAllItemController = async (req, res) => {
    try {
      const userId = req.user._id;
      const cart = await Cart.findOne({ userId }).populate({
        path: 'products.productId',
        model: 'Product',
        select: 'name images description sizes', // Select the fields you want to include
      });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      res.status(200).json({ cart  , success: true});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching cart items' });
    }
  }