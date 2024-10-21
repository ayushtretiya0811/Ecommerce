import Razorpay from "razorpay";
import Order from "../Models/OrderModel.js";
import User from "../Models/UserModel.js";
import crypto from 'crypto';
import Cart from "../Models/CartModel.js";
import Product from "../Models/ProductModel.js";
import PDFDocument from "pdfkit";
console.log(process.env.RAZORPAY_KEY_ID)
console.log(process.env.RAZORPAY_KEY_SECRET)
const  keyId =`rzp_test_KJMcn1CFwILO11`
const secret = `r5v1a7ZGLf9nAiL9hGLlzIdu`
console.log(keyId)
const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: secret,
  });

export const AddAddressController = async (req, res) => {
  try {
    const { addressLine1, addressLine2, city, state, postalCode } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).send({
        message: "user not found",
        success: false,
      });
    }

    const newAddress = {
    addressLine1,
    addressLine2,
      city,
      state,
      postalCode,
    };

    user.addresses.push(newAddress);
    await user.save();

    res.status(200).json({ message: "Address added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCartDetails = async (req, res) => {
    try {
        const userId = req.user._id;


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message  , success: false });
    }
}

export const createOrder = async (req, res) => {
    try {
      const { amount } = req.body;
      const userId = req.user._id;
      if (!amount ||  !userId) {
        return res.status(400).json({ message: "Missing required fields", success: false });
      }
      const options = {
        amount : amount * 100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString('hex'),
      };
  
      const order = await razorpay.orders.create(options);
      if (!order) return res.status(500).send("Some error occurred");
   
  
   
      res.status(200).json({ success: true, order });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: error.message , success: false });
    }
  };
  
  export const verifyPayment = async (req, res) => {
    try {
      const { response , products, totalPrice } = req.body;
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
  
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');
        if (expectedSignature === razorpay_signature) {
            // Payment is successful, save order details to the database
            const newOrder = new Order({
              userId: req.user._id,
              products,
              totalPrice,
              paymentId: razorpay_payment_id,
              orderId: razorpay_order_id,
              signature: razorpay_signature,
              status: 'paid',
            });
            await newOrder.save();
            await postPaymentActions(req.user._id, products);
            res.status(200).json({ success: true, message: "Payment verified successfully" });
          } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
          }
    } catch (error) {
      res.status(500).json({ message: error.message  });
    }
  };


  const postPaymentActions = async (userId, products) => {
    try {
      // Remove products from cart
      await Cart.findOneAndUpdate(
        { userId },
        { $pull: { products: { productId: { $in: products.map(p => p.productId) } } } }
      );
  
      // Update product stock
      for (let product of products) {
        await Product.findOneAndUpdate(
          { _id: product.productId, 'sizes.size': product.size },
          { $inc: { 'sizes.$.stock': -product.quantity } }
        );
      }
    } catch (error) {
      console.error("Error in post-payment actions:", error);
      throw error;
    }
  };


  export const allOrders = async (req, res) => {
    try {
      const userId = req.user._id;
      const orders = await Order.find({ userId }).populate('products.productId').sort({ createdAt: -1 });
 
      res.status(200).json({ success: true, orders });
      
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message , success:false });
    }
  }


  export const generateInvoice = async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId).populate('products.productId userId');
  
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      // Create a PDF document
      const doc = new PDFDocument();
      const filename = `invoice-${order.orderId}.pdf`;
  
      // Pipe the PDF to a writable stream
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      doc.pipe(res);
  
      // Add content to the PDF
      doc.fontSize(20).text('Invoice', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Order ID: ${order.orderId}`);
      doc.text(`Date: ${order.orderDate.toLocaleDateString()}`);
      doc.text(`Customer: ${order.userId.username}`);
      doc.text(`Email: ${order.userId.email}`);
      // doc.text(`Email: ${order.userId.email}`);
      doc.moveDown();
  
      // Add table headers
      doc.text('Product', 50, 160);
    doc.text('Size', 250, 160);
    doc.text('Quantity', 380, 160);  // Moved from 350 to 380
    doc.text('Price', 480, 160); 

    let y = 180;
    order.products.forEach((product, index) => {
      doc.text(product.productId.name, 50, y, { width: 180 });
      doc.text(product.size, 250, y);
      doc.text(product.quantity.toString(), 380, y);
      doc.text(`$${product.price.toFixed(2)}`, 480, y);
      y += 30; // Increased vertical spacing between rows
    });

    doc.moveDown();
    doc.text(`Total: $${order.totalPrice.toFixed(2)}`, { align: 'right' });

    // Finalize the PDF and end the stream
    doc.end();
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message, success: false });
    }
  };