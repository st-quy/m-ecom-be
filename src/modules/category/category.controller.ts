import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities';

@Controller('category')
export class CategoryController {

constructor(private readonly categoryService: CategoryService){}

@Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() category: Category) {
    return this.categoryService.update(id, category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<void> {
    await this.categoryService. remove(id);
  }
}
