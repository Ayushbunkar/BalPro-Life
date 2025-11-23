import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user']
  },
  orderItems: [{
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be positive']
    },
    image: {
      type: String,
      required: true
    }
  }],
  shippingAddress: {
    name: {
      type: String,
      required: [true, 'Please add recipient name']
    },
    phone: {
      type: String,
      required: [true, 'Please add phone number']
    },
    address: {
      street: {
        type: String,
        required: [true, 'Please add street address']
      },
      city: {
        type: String,
        required: [true, 'Please add city']
      },
      state: {
        type: String,
        required: [true, 'Please add state']
      },
      zipCode: {
        type: String,
        required: [true, 'Please add zip code']
      },
      country: {
        type: String,
        required: [true, 'Please add country'],
        default: 'United States'
      }
    }
  },
  paymentMethod: {
    type: String,
    required: [true, 'Please add payment method'],
    enum: ['card', 'paypal', 'bank_transfer']
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: Date,
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: Date,
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  trackingNumber: String,
  notes: String
}, {
  timestamps: true
});

// Calculate total price before saving
orderSchema.pre('save', function(next) {
  this.totalPrice = this.orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) +
                   this.shippingPrice + this.taxPrice;
  next();
});

export default mongoose.model('Order', orderSchema);