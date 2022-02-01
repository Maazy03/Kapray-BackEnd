import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Request } from "express";

@Controller('products')
export class ProductsController {

constructor(private readonly productService:ProductsService){}
    @Post('/Addproduct')
    async addProduct(
       @Req() request: Request 
        // @Body('name')name:String,
        // @Body('image')image:String,
        // @Body('shopNo')shopNo:String
    ){
        try{
            console.log("TRY ADD PRODCT",request)
            const newProduct= this.productService.addProduct(request.body)
            return newProduct
        }
        catch(err)
        {
            console.log("CATCH ADD PRODCT")
            throw err
        }

    }


    @Get('/allProducts')
    async getProducts(
    //    @Req() request: Request 
        // @Body('name')name:String,
        // @Body('image')image:String,
        // @Body('shopNo')shopNo:String
    ){
        try{
            console.log("ALL PRODCTS")
            const allProducts= this.productService.getAllProducts()
            return allProducts
        }
        catch(err)
        {
            console.log("CATCH ADD PRODCT",err)
            throw err
        }

    }

    
    @Get('/Product/:id')
    async getSingleProduct(
       @Req() request: Request 
        // @Body('name')name:String,
        // @Body('image')image:String,
        // @Body('shopNo')shopNo:String
    ){
        try{
            console.log("TRY SINGLE PRODUCT",request.params)
            const singleProduct= this.productService.getSingleProduct(request.params)
            return singleProduct
        }
        catch(err)
        {
            console.log("CATCH SINGLE PRODUCT",err)
            throw err
        }

    }
    @Delete('/Product/:id')
    async deleteProduct(
       @Req() request: Request 
        // @Body('name')name:String,
        // @Body('image')image:String,
        // @Body('shopNo')shopNo:String
    ){
        try{
            console.log("TRY DELETE SINGLE PRODUCT",request.params)
            const singleProduct= this.productService.deleteSingleProduct(request.params)
            return singleProduct
        }
        catch(err)
        {
            console.log("CATCH DELETE SINGLE PRODUCT",err)
            throw err
        }

    }
    @Put('/Product/:id')
        async updateProduct(
        @Param('id') id:string,
        @Body('name') name:string,
        @Body('image') image:string,
        @Body('shopNo') shopNo:string,){
            try
            {
                const updatedProduct=await this.productService.updateProduct(id,name,image,shopNo);
                return {message:"product updated",data:updatedProduct}
            }
            catch(err)
            { 
                console.log("CTACHAc")
                throw {message:err}
            }
            }

}
