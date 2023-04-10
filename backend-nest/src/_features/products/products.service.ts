import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { Product } from './entities/product.entity';
import { CreateProductDto, QueryProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private readonly repo: EntityRepository<Product>) {}

  async create(body: CreateProductDto) {
    const { ...rest } = body;

    const product = this.repo.create(rest);
    await this.repo.persistAndFlush(product);

    return product;
  }

  async findAll(_query?: QueryProductDto) {
    const { populate, fields } = _query || {};

    const products = await this.repo.findAll({
      orderBy: { id: 'DESC' },
      populate: populate as any[],
      fields: fields as any[],
    });
    return products;
  }

  async findOne(id: number, _query?: QueryProductDto) {
    const { populate, fields } = _query || {};

    const product = await this.repo.findOne(
      { id },
      { populate: populate as any[], fields: fields as any[] },
    );
    if (!product) return null;

    return product;
  }

  async update(id: number, body: UpdateProductDto) {
    const { ...attrs } = body;

    const product = await this.repo.findOne({ id });
    if (!product) return null;

    this.repo.assign(product, attrs);
    await this.repo.flush();

    return product;
  }

  async remove(id: number) {
    const product = await this.repo.findOne({ id });
    if (!product) return null;

    await this.repo.removeAndFlush(product);
    return product;
  }
}
