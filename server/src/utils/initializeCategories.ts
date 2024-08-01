import Category from '../model/category.model'

const initialCategories = [
    'מוצרי ניקיון',
    'גבינות',
    'ירקות ופירות',
    'בשר ודגים',
    'מאפים'
]

export const initializeCategories = async () => {
    try {
        for (const categoryName of initialCategories) {
            const categoryExists = await Category.findOne({ name: categoryName })
            if (!categoryExists) {
                await Category.create({ name: categoryName })
            }
        }
        console.log('Categories initialized successfully')
    } catch (error) {
        console.error('Error initializing categories:', error)
    }
}