import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';

import { NotFoundException } from '@nestjs/common/exceptions';

import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, QueryProductDto } from './dto';

import { JwtGuard } from 'src/guards';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@Query() query: QueryProductDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(@Param('id') id: number, @Query() query: QueryProductDto) {
    const product = await this.productsService.findOne(id, query);
    if (!product) {
      throw new NotFoundException('product not found!');
    }
    return product;
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    const product = await this.productsService.update(id, body);
    if (!product) {
      throw new NotFoundException('product not found!');
    }
    return product;
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: number) {
    const product = await this.productsService.remove(id);
    if (!product) {
      throw new NotFoundException('product not found!');
    }
    return product;
  }
}
