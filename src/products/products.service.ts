import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>) { }

    async addProduct(request: any) {
        try {
            console.log("request", request)
            const addProduct = new this.productModel(request)
            return await addProduct.save()
        } catch (error) {
            throw error
        }
    }

    async getAllProducts() {
        try {
            const allProducts = await this.productModel.find()
            return allProducts
        } catch (error) {
            throw error
        }
    }
    async getSingleProduct(request: any) {
        try {
            console.log("SIGNLE PRODUCR", request.id)
            let id = request.id
            const singleProduct = await this.productModel.findById({ _id: request.id })
            return singleProduct
        } catch (error) {
            throw error
        }
    }
    async deleteSingleProduct(request: any) {
        try {
            console.log("DELETE PRODUCT", request.id)
            let id = request.id
            const singleProduct = await this.productModel.findByIdAndDelete({ _id: request.id })
            return { message: 'product is deleted' }
        } catch (error) {
            throw error
        }
    }

    async updateProduct(id, name, image, shopNo) {
        try {

            console.log("TRY UPDATE    PRODUCT", id, name, image, shopNo)
            let updatedProduct = await this.productModel.findOne({ _id: id })
            if (!updatedProduct) {
                throw "Invalid ID"
            }
            
            updatedProduct = await this.productModel.findByIdAndUpdate(id,{name,image,shopNo},{
                new:true,
                runValidators:true
            })
            console.log("updated product 01", updatedProduct)
            // updatedProduct= new this.productModel({name,image,shopNo})
            // console.log("updated product 02",updatedProduct)                
            // const [product,index]=this.findProduct(productId)
            // const updatedProduct={...product}
            // if(title){
            //     updatedProduct.title=title;
            // }
            // if(description){
            //     updatedProduct.description=description;
            // }
            // if(price){
            //     updatedProduct.price=price;
            // }
            // const prod = await updatedProduct.save()
            // // this.products[index]=updatedProduct;
            return updatedProduct
        }

        catch (err) {
            throw err
        }
    }
}