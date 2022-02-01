import { Controller, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsSchema } from './products.model'
import { ProductsService } from './products.service';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Product', schema: ProductsSchema },
        ]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule { }
