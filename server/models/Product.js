import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be positive']
  },
  originalPrice: {
    type: Number,
    default: null
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['protein', 'supplements', 'accessories', 'equipment']
  },
  brand: {
    type: String,
    default: 'BalPro Life'
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  }],
  inventory: {
    quantity: {
      type: Number,
      required: [true, 'Please add quantity'],
      min: [0, 'Quantity cannot be negative'],
      default: 0
    },
    sku: {
      type: String,
      unique: true,
      sparse: true
    },
    trackInventory: {
      type: Boolean,
      default: true
    }
  },
  nutrition: {
    servingSize: String,
    servingsPerContainer: Number,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    ingredients: [String],
    allergens: [String]
  },
  features: [String],
  benefits: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  weight: Number, // in grams
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  tags: [String],
  reviews: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, 'Comment cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create index for better search performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ price: 1 });
productSchema.index({ averageRating: -1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Calculate average rating when reviews are added/updated
productSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length > 0) {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.averageRating = sum / this.reviews.length;
    this.reviewCount = this.reviews.length;
  } else {
    this.averageRating = 0;
    this.reviewCount = 0;
  }
};

export default mongoose.model('Product', productSchema);